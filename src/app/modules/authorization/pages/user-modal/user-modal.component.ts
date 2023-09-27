import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { createPasswordStrengthValidator } from 'src/app/core/validators/password.validator';
import { usernameExistsValidator } from 'src/app/core/validators/username-exists.validator';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() isVisible = false;
  @Input() modalTitle!: string;
  @Input() user!: User;
  @Input() isEditMode: boolean = false;
  @Output() cancelEvent = new EventEmitter<string>();
  @Output() insertSuccessEvent = new EventEmitter<User>();
  @Output() updateSuccessEvent = new EventEmitter<User>();

  roles: Role[] = [];
  isLoadingRole = false;

  baseForm: FormGroup;
  isLoadingButton = false;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly messageService: NzMessageService) {

    this.baseForm = this.formBuilder.group({
      username: [null, [Validators.required], usernameExistsValidator(userService)],
      password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
      isActive: [null, Validators.required],
      roleId: [null, Validators.required],
    });
  }


  confirmationValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== this.baseForm.controls['password'].value) {
      return { confirm: true }
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] != undefined && changes['isVisible'].currentValue != undefined) {
      if (this.isEditMode) {
        this.loadRolesSelect();
        this.baseForm.controls['password'].reset();
        this.baseForm.controls['password'].disable();
        this.baseForm.controls['username'].disable();
      }
      else {
        this.baseForm.controls['password'].enable();
        this.baseForm.controls['username'].enable();
      }
    }

    if (changes['user'] != undefined && changes['user'].currentValue != undefined) {
      this.baseForm.controls['username'].setValue(changes['user'].currentValue.username);
      this.baseForm.controls['email'].setValue(changes['user'].currentValue.email);
      this.baseForm.controls['address'].setValue(changes['user'].currentValue.address);
      this.baseForm.controls['isActive'].setValue(changes['user'].currentValue.isActive);
      this.baseForm.controls['roleId'].setValue(changes['user'].currentValue.roleId);
    }
  }

  cancelModal(): void {
    this.cancelEvent.emit();
    this.baseForm.reset();
  }

  submitForm() {
    this.isLoadingButton = true;
    const userFormData = this.baseForm.value as User;

    if (this.isEditMode) {
      userFormData.userId = this.user.userId;
      userFormData.username = this.user.username;
      this.updateUser(userFormData);
    }
    else {
      this.addUser(userFormData);
    }

  }

  addUser(user: User) {
    this.userService.add(user)
      .pipe(
        finalize(() => (this.isLoadingButton = false))
      ).subscribe((res) => {
        if (res.isSuccess) {
          this.messageService.create('success', `Create user successfully!`);
          this.insertSuccessEvent.emit(res.data);
          this.baseForm.reset();
        }
      });
  }

  updateUser(user: User) {
    this.userService.update(user)
      .pipe(
        finalize(() => (this.isLoadingButton = false))
      ).subscribe((res) => {
        if (res.isSuccess) {
          this.messageService.create('success', `Update user successfully!`);
          this.updateSuccessEvent.emit(res.data);
          this.baseForm.reset();
        }
      });
  }


  filterByPermission() {

  }

  loadRolesSelect() {
    if (this.roles.length > 0) {
      return;
    }

    this.isLoadingRole = true;
    this.roleService.getAll().pipe(
      finalize(() => this.isLoadingRole = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.roles = res.data;
      }
    })
  }
}

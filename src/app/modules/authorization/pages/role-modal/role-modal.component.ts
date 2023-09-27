import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Role } from '../../models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() modalTitle!: string;
  @Input() role!: Role;
  @Input() isEditMode: boolean = false;
  @Output() cancelEvent = new EventEmitter<string>();
  @Output() insertSuccessEvent = new EventEmitter<Role>();
  @Output() updateSuccessEvent = new EventEmitter<Role>();

  baseForm: FormGroup;
  isLoadingButton = false;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly roleService: RoleService,
    private readonly messageService: NzMessageService) {

    this.baseForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['role'] != undefined && changes['role'].currentValue != undefined) {
      this.baseForm.controls['name'].setValue(changes['role'].currentValue.name);
      this.baseForm.controls['description'].setValue(changes['role'].currentValue.description);
    }
  }

  cancelModal(): void {
    this.cancelEvent.emit();
    this.baseForm.reset();
  }

  submitForm() {
    this.isLoadingButton = true;
    const roleFormData = this.baseForm.value as Role;

    if (this.isEditMode) {
      roleFormData.roleId = this.role.roleId;
      this.updateRole(roleFormData);
    }
    else {
      this.addRole(roleFormData);
    }

  }

  addRole(role: Role) {
    this.roleService.add(role)
      .pipe(
        finalize(() => (this.isLoadingButton = false))
      ).subscribe((res) => {
        if (res.isSuccess) {
          this.messageService.create('success', `Create role successfully!`);
          this.insertSuccessEvent.emit(res.data);
          this.baseForm.reset();
        }
      });
  }

  updateRole(role: Role) {
    this.roleService.update(role)
      .pipe(
        finalize(() => (this.isLoadingButton = false))
      ).subscribe((res) => {
        if (res.isSuccess) {
          this.messageService.create('success', `Update role successfully!`);
          this.updateSuccessEvent.emit(res.data);
          this.baseForm.reset();
        }
      });
  }
}


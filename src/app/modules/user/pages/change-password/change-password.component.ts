import { read } from 'xlsx';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { createPasswordStrengthValidator } from 'src/app/core/validators/password.validator';
import { UserService } from 'src/app/modules/authorization/services/user.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { ChangePasswordRequest } from '../../models/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  isLoadingSubmit = false;
  revealCurrentPassword = false;
  revealNewPassword = false;
  revealConfirmPassword = false;
  userId!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly messageService: NzMessageService,
    private readonly tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.buildForm();
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: [null, Validators.required],
      newPassword: [null, [createPasswordStrengthValidator()]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm() {
    this.isLoadingSubmit = true;
    const request = this.changePasswordForm.value as ChangePasswordRequest;
    request.userId = this.userId;
    this.userService.changePassword(request)
      .pipe(
        finalize(() => this.isLoadingSubmit = false)
      ).subscribe(res => {
        console.log(res);
        if (res.isSuccess) {
          this.messageService.create("success", "change password successfully");
          this.changePasswordForm.reset();
        }
        else {
          this.messageService.create('error', res.errorMessage);
        }
      })
  }


  confirmationValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== this.changePasswordForm.controls['newPassword'].value) {
      return { error: true, confirm: true }
    }
    return null;
  }
}

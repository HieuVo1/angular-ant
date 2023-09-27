import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { finalize, tap } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly permissionService: NgxPermissionsService
  ) {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  ngOnInit(): void {
    this.permissionService.flushPermissions();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.login();
    }
  }

  private login() {
    this.isLoading = true;
    const credentials = this.validateForm.value as LoginRequest;

    this.authService.login(credentials)
      .pipe(
        tap(result => {
          if (result.isSuccess) {
            this.router.navigate(['/admin'])
          }
          else {

            this.validateForm.setErrors({ "error": result.errorMessage });
          }
        }),
        finalize(() => (this.isLoading = false))
      ).subscribe();
  }
}

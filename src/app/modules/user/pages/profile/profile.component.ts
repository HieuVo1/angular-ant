import { read } from 'xlsx';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { TokenService } from 'src/app/core/services/token/token.service';
import { User } from 'src/app/modules/authorization/models/user';
import { UserService } from 'src/app/modules/authorization/services/user.service';
import { AwsS3Service } from 'src/app/core/services/aws-s3/aws-s3.service';
import { Subscription, filter, finalize } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userId!: number;
  roleId!: number;
  userUpdateForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  isLoading = false;
  contentTypeAccept = 'image/jpeg, image/png';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly messageService: NzMessageService,
    private readonly tokenService: TokenService,
    private readonly awsS3Service: AwsS3Service,
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.roleId = this.tokenService.getRoleId();
    this.buildForm();
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService.getById(this.userId).subscribe(res => {
      if (res.isSuccess) {
        this.setFormValue(res.data);
      }
    })
  }

  setFormValue(user: User) {
    this.userUpdateForm.controls['fullName'].setValue(user.fullName);
    this.userUpdateForm.controls['address'].setValue(user.address);
    this.userUpdateForm.controls['phone'].setValue(user.phone);
    this.userUpdateForm.controls['email'].setValue(user.email);

    if (user.imageUrl !== '') {
      const pathName = new URL(user.imageUrl).pathname;
      this.fileList = [
        {
          uid: pathName,
          url: user.imageUrl,
          name: pathName.split('/').pop() ?? '',
        }
      ];
    }

  }


  buildForm() {
    this.userUpdateForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      phone: [null, Validators.required]
    })
  }


  submitForm() {
    const user = this.userUpdateForm.value as User;
    user.roleId = this.roleId;
    user.userId = this.userId;
    user.isActive = true;
    user.imageUrl = this.fileList[0]?.url ?? "";

    this.isLoading = true;
    this.userService.update(user).
      pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(res => {
        if (res.isSuccess) {
          this.messageService.create("success", "update info successfully");
          this.userService.changeImageUrl(res.data.imageUrl);
        }
        else {
          this.messageService.create("error", res.errorMessage);
        }
      });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.isLoading = true;

    this.awsS3Service.getPreSignedUrl(file.name, environment.awsFolder + '/profile-images', file.type ?? this.contentTypeAccept).subscribe(
      res => {
        if (res.isSuccess) {
          this.awsS3Service.uploadFileToS3(res.data.uploadUrl, file as any)
            .pipe(
              finalize(() => this.isLoading = false)
            ).subscribe(() => {

              this.fileList = [{
                uid: new URL(res.data.fileUrl).pathname,
                url: res.data.fileUrl,
                name: file.name,
              }];

              this.messageService.success('upload successfully.');
            });
        }
        else {
          this.isLoading = false
          this.messageService.create('error', res.errorMessage);
        }
      }
    )

    return false;
  };


}

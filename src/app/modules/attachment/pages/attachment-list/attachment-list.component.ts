import { read } from 'xlsx';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attachment } from '../../models/attachment';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AwsS3Service } from 'src/app/core/services/aws-s3/aws-s3.service';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TokenService } from 'src/app/core/services/token/token.service';
import { AttachmentService } from '../../services/attachment.service';
import { Pages } from 'src/permissions/permission-schema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {
  @Input() isVisible = false;
  @Input() documentRefId!: number;
  @Input() documentRefName!: string;
  @Output() cancelEvent = new EventEmitter<string>();
  isLoading = false;
  userId!: number;
  userName!: string;

  constructor(private readonly awsS3Service: AwsS3Service,
    private readonly messageService: NzMessageService,
    private readonly tokenService: TokenService,
    private readonly attachmentService: AttachmentService) {

  }
  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.userName = this.tokenService.getUserName();

    this.loadAttachment();
  }

  listOfData: Attachment[] = [];

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.cancelEvent.emit();
  }

  loadAttachment() {
    this.attachmentService.getAll(this.documentRefName, 1)
      .subscribe(res => {
        if (res.isSuccess) {
          this.listOfData = res.data;
        }
      })
  }

  handleExport() {

  }

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {

    this.isLoading = true;

    this.awsS3Service.getPreSignedUrl(file.name, environment.awsFolder + '/' + this.documentRefName, file.type ?? '').subscribe(
      res => {
        if (res.isSuccess) {
          this.awsS3Service.uploadFileToS3(res.data.uploadUrl, file as any)
            .subscribe(() => {
              const newAttachment: Attachment = {
                attachmentId: 0,
                fileName: file.name,
                fileUrl: res.data.fileUrl,
                fileExtension: file.name.split('.').pop() ?? '',
                fileType: file.type ?? "",
                attachedBy: this.userId,
                attachedByName: this.userName,
                attachedDate: new Date(),
                documentRefId: this.documentRefId,
                documentRefName: this.documentRefName,
                awsFileKey: res.data.awsFileKey
              }

              this.attachmentService.create(newAttachment).pipe(
                finalize(() => this.isLoading = false)
              ).subscribe(res => {
                if (res.isSuccess) {
                  this.listOfData = [
                    ...  this.listOfData,
                    res.data
                  ];
                  this.messageService.success('upload successfully.');
                }
              })
            });
        }
        else {
          this.isLoading = false
          this.messageService.create('error', res.errorMessage);
        }
      }
    )

    return false;
  }

  delete(attachmentId: number) {
    this.isLoading = true;
    this.attachmentService.delete(attachmentId).pipe(
      finalize(() => this.isLoading = false)
    )
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.listOfData = this.listOfData.filter(val => val.attachmentId !== attachmentId);
            this.messageService.success('delete successfully.');
          }
          else {
            this.messageService.create('error', res.errorMessage);
          }
        }
      )
  }
}

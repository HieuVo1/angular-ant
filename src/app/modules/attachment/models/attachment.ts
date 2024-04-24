export interface Attachment {
  attachmentId: number;
  attachedDate: Date;
  attachedBy: number;
  attachedByName: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  awsFileKey: string;
  fileExtension: string;
  documentRefId: number;
  documentRefName: string;
}

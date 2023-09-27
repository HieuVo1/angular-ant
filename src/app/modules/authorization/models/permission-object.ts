import { ObjectType } from "../enums/object-type";

export interface PermissionObject {
  permissionObjectId: number;
  type: ObjectType;
  name: string;
  description: string;
  parentPermissionObjId: number
  expand: boolean;
}

import { ObjectType } from "../enums/object-type";

export interface Permission {
  type: ObjectType;
  name: string;
  description: string;
  roleId: number;
  permissionObjectId: number;
  viewPermission: boolean;
  expand: boolean;
  parentPermissionObjId: number
}


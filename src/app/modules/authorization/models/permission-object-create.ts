import { ObjectType } from "../enums/object-type";

export interface PermissionObjectCreate {
  type: ObjectType;
  name: string;
  description: string;
  childObjects?: PermissionObjectCreate[]
}

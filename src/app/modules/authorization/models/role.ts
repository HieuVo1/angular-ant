import { Permission } from "./permission";

export interface Role {
  roleId: number;
  name: string;
  description: string;
  permissions: Permission[]
}

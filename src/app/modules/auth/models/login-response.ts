import { Permission } from "../../authorization/models/permission";

export interface LoginResponse {
  token: string;
  permissions: Permission[]
}

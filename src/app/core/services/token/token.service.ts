import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { TokenData } from 'src/app/modules/auth/models/token-data';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private readonly storageService: StorageService) { }
  getToken(): string {
    const user = this.storageService.getValue<TokenData>(environment.tokenKey);
    if (user != null) {
      return user.token;
    }
    return '';
  }

  getRoleName(): string {
    const user = this.storageService.getValue<TokenData>(environment.tokenKey);
    if (user != null) {
      return user.roleName;
    }
    return '';
  }

  getRoleId(): number {
    const user = this.storageService.getValue<TokenData>(environment.tokenKey);
    if (user != null) {
      return user.roleId;
    }
    return -1;
  }

  isTokeExpire(): boolean {
    const user = this.storageService.getValue<TokenData>(environment.tokenKey);
    if (user != null && user.exp * 1000 > Date.now()) {
      return true;
    }
    return false;
  }


  getUserName(): string {
    const user = this.storageService.getValue<TokenData>(environment.tokenKey);
    if (user != null) {
      return user.username;
    }
    return '';
  }

  getUserId(): number {
    const user = this.storageService.getValue<TokenData>(environment.tokenKey);
    if (user != null) {
      return user.userId;
    }
    return 0;
  }
}

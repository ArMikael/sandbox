import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userToken: string | null = null;

  setToken(token: string) {
    this._userToken = token;
  }

  getToken() {
    return this._userToken;
  }
}

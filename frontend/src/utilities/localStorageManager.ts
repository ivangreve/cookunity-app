import jwt_decode from 'jwt-decode';

export class LocalStorageManager {

  get localStorage(): Storage {
    return getLocalStorage();
  }

  public getToken(): string | null {
    return this.localStorage.getItem('token');
  }

  public setToken(token: string) {
    this.localStorage.setItem('token', token)
  }

  public deleteToken() {
    this.localStorage.removeItem('token')
  }

  public getRole() {
    const token = this.getToken();
    if (!token) return;
    const tokenInfo = getDecodedAccessToken(token);
    return tokenInfo["role"]
  }

  public getUserName() {
    const token = this.getToken();
    if (!token) return;
    const tokenInfo = getDecodedAccessToken(token);
    return tokenInfo["name"]
  }

  public getUserEmail() {
    const token = this.getToken();
    if (!token) return;
    const tokenInfo = getDecodedAccessToken(token);
    return tokenInfo["email"]
  }


  public isLoggedIn(): boolean {
    const loggedIn = this.localStorage.getItem('token');
    if (loggedIn) return true;
    return false;
  }
}


function getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}

function getLocalStorage(): Storage {
  return localStorage;
}


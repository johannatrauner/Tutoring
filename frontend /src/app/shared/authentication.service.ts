import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface Token {
  exp: number;
  user: {
    first_name: string;
    id: number;
    role: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // URL to the authentication API
  private api = 'http://nachhilfe.s2210456035.student.kwmhgb.at/api/auth';
  constructor(private http: HttpClient) {}

  // Method to login the user
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, { email, password });
  }

  // Method to logout the user
  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('first_name');
  }

  /** Method to check if the user is logged in
   * It checks if the token exists in sessionStorage and if it is valid
   * If the token is expired, it removes it from sessionStorage*/
  public isLoggedIn(): boolean {
    if (sessionStorage.getItem('token')) {
      let token: string = <string>sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('first_name');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  /** Method to check if the user is a tutor
   * It checks if the user is logged in and if the role is 'tutor' */
  public isTutor(): boolean {
    if (this.isLoggedIn()) {
      const role = sessionStorage.getItem('role');
      return role === 'tutor';
    }
    return false;
  }

  //Method to get the current user ID from sessionStorage
  public getCurrentUserId(): number {
    return Number.parseInt(<string>sessionStorage.getItem('userId') || '-1');
  }

  // Method to get the current user object from sessionStorage
  public getCurrentUser() {
    return {
      id: this.getCurrentUserId(),
      first_name: <string>sessionStorage.getItem('first_name'),
      role: <string>sessionStorage.getItem('role'),
    };
  }

  /** Method to set the session storage
   * It stores the access token, user ID, role and first name in sessionStorage */
  setSessionStorage(
    access_token: string,
    user: { id: number; role: string; first_name: string },
  ) {
    const decodedToken = jwtDecode(access_token) as Token;
    sessionStorage.setItem('token', access_token);
    sessionStorage.setItem('userId', String(decodedToken.user.id));
    sessionStorage.setItem('role', user.role);
    sessionStorage.setItem('first_name', user.first_name);
  }
}

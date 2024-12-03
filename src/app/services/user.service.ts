import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from '../modals/token';
import { jwtDecode } from 'jwt-decode';
import { IUser, Roles, Setting } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5057/api/Users"
  registerUser(user: any) {
    return this.http.post<IToken>(`${this.baseUrl}/Sign-Up`, user);
  }

  logIn(user: any) {
    return this.http.post<IToken>(`${this.baseUrl}/Log-In`, user);
  }
  getRoles() {
    return this.http.get(`${this.baseUrl}/Get-Roles`);
  }
  getAllCustomers() {
    return this.http.get<IUser[]>(`${this.baseUrl}?role=2`)
  }
  getAllManagers() {
    return this.http.get<IUser[]>(`${this.baseUrl}?role=1`)
  }
  getUserById(nicNo: string) {
    return this.http.get<IUser>(`${this.baseUrl}/${nicNo}`)
  }
  updateUser(user: any, nicNo: string, setting: Setting) {
    return this.http.put(`${this.baseUrl}/${nicNo}?setting=${setting}`, user)
  }
  verifyUser(nicNo: string) {
    return this.http.get(`${this.baseUrl}/Verify-user${nicNo}`)
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  isLoggedIn() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
      }
      return true;
    }
    return false;
  }
  isAdminLoggedIn() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
        let user = JSON.parse(JSON.stringify(decoded));
        if(user.Role == Roles.Admin || Roles.Manager){
          return true;
        }
      }
      return false;
    }
    return false;
  }
}



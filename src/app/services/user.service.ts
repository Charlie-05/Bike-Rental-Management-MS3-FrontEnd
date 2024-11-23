import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from '../modals/token';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  registerUser(user : any){
    return this.http.post<IToken>("http://localhost:5057/api/Users/Sign-Up" , user);
  }

  logIn(user : any){
    return this.http.post<IToken>("http://localhost:5057/api/Users/Log-In" , user);
  }
  getRoles(){
    return this.http.get("http://localhost:5057/api/Users/Get-Roles");
  }
  getAllCustomers(){
    return this.http.get<IUser[]>("http://localhost:5057/api/Users?role=2")
  }
  getUserById(nicNo : string){
    return this.http.get("http://localhost:5057/api/Users/" + nicNo)
  }

  updateUser(user : any , nicNo : string){
    return this.http.put("http://localhost:5057/api/Users/" + nicNo , user)
  }

  deleteUser(id : string){
    return this.http.delete("http://localhost:5057/api/Users/" + id);
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
}



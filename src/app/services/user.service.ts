import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  registerUser(user : any){
    return this.http.post("http://localhost:5057/api/Users/Sign-Up" , user);
  }
  getRoles(){
    return this.http.get("http://localhost:5057/api/Users/Get-Roles");
  }
}

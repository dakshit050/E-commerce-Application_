import { Customer, response } from './../models/customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  SERVER_URL=environment.SERVER_URL;
  constructor(private http:HttpClient) { }
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})};
  GoogleOuth(){
    return this.http.get(this.SERVER_URL+'user/google',this.noAuthHeader);
  }
  AddNewUser(customer:Customer){
    return this.http.post(this.SERVER_URL+'user/signup',customer,this.noAuthHeader);
  }
  Authenticate(logindata){
 return this.http.post(this.SERVER_URL+'user/login',logindata,this.noAuthHeader);
  }
  UserProfle(){
    return this.http.get(this.SERVER_URL+'user/profile');
  }
SetToken(token:string){
localStorage.setItem('token',token);
}
DeleteToken(){
localStorage.removeItem('token');

}
getToken(){
  return localStorage.getItem('token');
}
getuserpayload(){
  var token=this.getToken();
  if(token){
    var check=JSON.parse(atob(token.split('.')[1]));
    return check;
  }else{
    return null;
  }
}
isLogin(){
  let user= this.getuserpayload();
  if(user){
    return user.exp > Date.now()/1000;
  }else{
    return false;
  }

}
}

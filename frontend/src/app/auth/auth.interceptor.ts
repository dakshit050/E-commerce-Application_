import { CustomerService } from './../services/customer.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private customerservice:CustomerService,
                private routes:Router){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
         if(req.headers.get('noAuth')){
             return next.handle(req.clone());
         }else{
             const clonereq=req.clone({
                 headers:req.headers.set("Authorization","Bearer "+this.customerservice.getToken())
             });
             return next.handle(clonereq).pipe(
                 tap(
                     event =>{},
                     err =>{
                         if(err.error.auth== false){
                             this.routes.navigateByUrl('/user/login');
                         } 
                     }
                 )
             );
         }
    }
}
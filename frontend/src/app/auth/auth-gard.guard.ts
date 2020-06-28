import { CustomerService } from './../services/customer.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {
  constructor(private CustomerService:CustomerService,
            private routes:Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.CustomerService.isLogin()){
        this.routes.navigateByUrl('/user/login');
        this.CustomerService.DeleteToken();
        return false;
      }
    return true;
  }
  
}

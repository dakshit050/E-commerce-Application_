import { CustomerService } from './../../services/customer.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CartData:CartModelServer;
  isLogin=false;
  isAdmin=false;
  constructor(private cartService:CartService,
              public customerService:CustomerService,
              private routes:Router) { }

  ngOnInit(): void {
    this.isLogin=this.customerService.isLogin();
    this.isAdmin=this.customerService.isAdmin();
    this.cartService.cartData$.subscribe(data=>this.CartData=data);
  }
onsubmit(){
   this.CartData={
    Total:0,
    Product:[{
      Data:undefined,
      quantity:0
    }]
  }
  this.isLogin=false;
  this.isAdmin=false;
  this.customerService.DeleteToken();
  this.cartService.cartData$.next(this.CartData);
  this.routes.navigateByUrl('user/login');
}
}

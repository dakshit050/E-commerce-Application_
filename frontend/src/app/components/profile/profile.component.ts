import { CartService } from './../../services/cart.service';
import { CartModelServer } from './../../models/cart.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  CartData:CartModelServer;
userdetails={
  username:undefined,
  email:undefined,
  photoUrl:undefined,
  DOB:undefined
};
  constructor(private customerService:CustomerService,
              private routes:Router,
              private spinner:NgxSpinnerService,
              private cartservice:CartService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.customerService.UserProfle().subscribe(
      res=>{
        this.userdetails=res['user'];
        this.spinner.hide();
      },
      err=>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  onsubmit(){
    this.CartData={
      Total:0,
      Product:[{
        Data:undefined,
        quantity:0
      }]
    }
    this.customerService.DeleteToken();
    this.cartservice.cartData$.next(this.CartData);
    this.routes.navigateByUrl('/user/login');
  }

}

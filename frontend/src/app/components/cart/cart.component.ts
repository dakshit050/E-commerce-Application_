import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from './../../models/cart.model';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
CartData:CartModelServer;
image=environment.Images;
  constructor(public cartService:CartService,
              private customerservice:CustomerService,
              private spinner:NgxSpinnerService,
              private router:Router,
              private productService:ProductService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.cartService.cartData$.subscribe(data=>{
      this.CartData=data
      this.spinner.hide();
    },error=>{
      if(error.status===401){
        this.spinner.hide();
        this.customerservice.DeleteToken();
        this.router.navigate(['user/login']);
      }
    });
    
}
  }

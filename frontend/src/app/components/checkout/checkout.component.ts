import { ProductService } from './../../services/product.service';
import { CustomerService } from './../../services/customer.service';
import { CartService } from './../../services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  CartData:CartModelServer;
  image=environment.Images;
    constructor(public cartService:CartService,
                private customerservice:CustomerService,
                private spinner:NgxSpinnerService,
                private router:Router
                ) { }
  
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
  placeOrder(){
    this.spinner.show();
    this.cartService.checkout();
    this.router.navigate(['thankyou'])
  }
}

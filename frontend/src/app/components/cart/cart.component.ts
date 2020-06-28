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
  constructor(public cartService:CartService,
              private productService:ProductService,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
   this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.cartService.cartData$.subscribe(data=>this.CartData=data);
    
}
  }

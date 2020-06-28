import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  p: number = 1;
  page:number =6;
  products:any[]=[];
  SearchText:string;
  constructor(
    private productService:ProductService,
              private cartService:CartService,
              private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.productService.getAllProducts().subscribe((prods:{count:Number,products:any[]})=>{
      this.products=prods.products;
    })
  }
  AddToCart(id:number){
    this.cartService.GetSingleProduct(id);
  }
}

import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartModelServer } from 'src/app/models/cart.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  ProductData:any;
  CartData:CartModelServer;
  url=environment.Images;
  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              public cartService:CartService) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params.id;
    this.productService.getsingleproduct(id).subscribe(product=>{
      this.ProductData=product[0];
    },error=>{
      throw error;
    });
    
  }

  AddToCart(id:number){
    this.cartService.GetSingleProduct(id);
  }


}

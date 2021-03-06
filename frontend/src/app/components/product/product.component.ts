import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  p: number = 1;
  page:number =12;
  products:any=[];
  image=environment.Images;
  isAdmin=false;
  SearchText:string;
  Filters=['All','Sports','Electronics','Cloths','Books,Media'];
  constructor(
    private productService:ProductService,
              private cartService:CartService,
              private spinner:NgxSpinnerService,
              private customerservice:CustomerService,
              private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.isAdmin=this.customerservice.isAdmin();
    this.productService.getAllProducts().subscribe((prods:{count:Number,products:any[]})=>{
      this.products=prods.products;
      this.spinner.hide();
    })
  }
  AddToCart(id:number){
    this.cartService.GetSingleProduct(id);
  }

  onChange(deviceValue) {
    if(deviceValue==0){
      this.spinner.show();
      this.productService.getAllProducts().subscribe((prods:{count:Number,products:any[]})=>{
        console.log(prods);
        this.products=prods.products;
        this.spinner.hide();
      })
    }else{
      this.spinner.show();
      this.productService.getFilters(deviceValue).subscribe(product=>{
        this.products=product;
        this.spinner.hide();
      })
    }
}
  DELETE(id:number){
    if(window.confirm("Are you sure you want to delete the item?")){
      this.productService.Delete(id).subscribe((success)=>{
        this.productService.getAllProducts().subscribe((prods:{count:Number,products:any[]})=>{
          this.products=prods.products;
        })
        this.toastr.success(`${success['message']}`,"Product Removed",{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      },error=>{
        this.toastr.error(`${error.message}`,"Error",{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      });

    }else{
      return;
    }
  }
}

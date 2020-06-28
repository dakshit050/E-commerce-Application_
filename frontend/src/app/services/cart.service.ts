import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  OrderDetails } from './../models/product.model';
import { CartModelServer } from 'src/app/models/cart.model';
import { ProductService } from './product.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartModelServer:CartModelServer={
    Total:0,
    Product:[{
      Data:undefined,
      quantity:0
    }]
  };
  OrderDetails: OrderDetails = new OrderDetails();
Order:any[]=[];
  SERVER_URL = environment.SERVER_URL;
  cartData$= new BehaviorSubject<CartModelServer>(this.cartModelServer);
  cartTotal$ = new BehaviorSubject<number>(0);
 constructor(private ProductService:ProductService,
            private toast:ToastrService,
            private route:Router){
  this.ProductService.getMyOrders().subscribe(
    data=>{
      this.Order=data['data'];
      if(this.Order!==undefined){
        this.Order.forEach(p=>{
          if(this.cartModelServer.Product[0].Data===undefined){
            this.cartModelServer.Product[0].Data=this.Order[0];
            this.cartModelServer.Product[0].quantity=this.Order[0].quantity;
            this.CalculateTotal();
    
          }else{
            this.cartModelServer.Product.push({
              Data:p,
              quantity:p.quantity
            }
            );
            this.CalculateTotal();
          }
    
        });
        this.cartData$.next(this.cartModelServer);
      }
    }
  );

 }
GetSingleProduct(id:number){
this.ProductService.getSingalProduct(id).subscribe(
  data=>{
    this.Order.splice(0, this.Order.length);
    this.Order=data['data'];
    if(this.cartModelServer.Product[0].Data===undefined){
      this.cartModelServer.Product[0].Data=this.Order[0];
      this.cartModelServer.Product[0].quantity=this.Order[0].quantity;
      this.toast.success(`${this.Order[0].title} added to the cart`,"Product Added",{
        timeOut:2000,
        progressBar:true,
        progressAnimation:"increasing",
        positionClass:'toast-top-right'
      });
      this.CalculateTotal();
      this.cartData$.next(this.cartModelServer);
    }else{
      let index=this.cartModelServer.Product.findIndex(p=>p.Data.id===this.Order[0].id);
      if(index!==-1){
        this.cartModelServer.Product[index].quantity=this.Order[0].quantity;
        this.toast.info(`${this.Order[0].title} quantity Updated in the cart`,"Product Updated",{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
        this.CalculateTotal();
        this.cartData$.next(this.cartModelServer);
      }else{
        this.cartModelServer.Product.push({
          Data:this.Order[0],
          quantity:this.Order[0].quantity
        });
        this.toast.success(`${this.Order[0].title} added to the cart`,"Product Added",{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
        this.CalculateTotal();
        this.cartData$.next(this.cartModelServer);
      }
    }
  },
  err=>{
    console.log(err.error);
  }
);
}
DeleteProduct(i:number){
  if(window.confirm("Are you sure you want to delete the item?")){
    let index=this.cartModelServer.Product[i].Data.id;
    this.ProductService.DeleteProduct(Number(index)).subscribe(
      data=>{
    console.log(data['message']);
      },
      err=>{
    console.log(err.error);
      }
    );
    this.cartModelServer.Product.splice(i,1);
    this.CalculateTotal();
    if(this.cartModelServer.Total===0){
      this.cartModelServer={
        Total:0,
        Product:[{
          Data:undefined,
          quantity:0
        }
        ]
      }
      this.cartData$.next(this.cartModelServer);
    }else{
      this.cartData$.next(this.cartModelServer);
    }    
  }else{
    return;
  }
}
SubTotal(index:number){
let subTotal=0;
let p=this.cartModelServer.Product[index];
subTotal=Number(p.Data.price)*(p.quantity);
return subTotal;
}
UpdateCart(index:number,status:boolean){
if(status){
let id=this.cartModelServer.Product[index].Data.id;
let quantity=this.cartModelServer.Product[index].quantity+1;
this.cartModelServer.Product[index].quantity=quantity;
this.OrderDetails={
  id:id,
  quantity:quantity
}
this.ProductService.UpdateQuantity(this.OrderDetails).subscribe();
this.CalculateTotal();
this.cartData$.next(this.cartModelServer);
}else{
  if(this.cartModelServer.Product[index].quantity==1){
    this.DeleteProduct(index);
  }else{
    let id=this.cartModelServer.Product[index].Data.id;
    let quantity=this.cartModelServer.Product[index].quantity-1;
    this.cartModelServer.Product[index].quantity=quantity;
    this.OrderDetails={
      id:id,
      quantity:quantity
    }
    this.ProductService.UpdateQuantity(this.OrderDetails).subscribe();
    this.CalculateTotal();
    this.cartData$.next(this.cartModelServer);
  }
}
}
CalculateTotal(){
  let Total=0;
  this.cartModelServer.Product.forEach(p=>{
    let price=p.Data.price;
    let quantity=p.Data.quantity;
    Total+=Number(price)*Number(quantity);
  });
  this.cartModelServer.Total=Total;
  this.cartTotal$.next(this.cartModelServer.Total);
}
}
import { CartModelClient } from './../models/cart.model';
import { CustomerService } from './customer.service';
import { ProductModelServer, OrderDetails } from './../models/product.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
SERVER_URL = environment.SERVER_URL;
  constructor(private http:HttpClient,
    private customerService:CustomerService) {}
    noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})};
getAllProducts(numberOfResults:number=10){
   return this.http.get(this.SERVER_URL+'home');
  }
getSingalProduct(id:number){
return this.http.get(this.SERVER_URL+'order/'+id);
}
DeleteProduct(id:number){
  return this.http.get(this.SERVER_URL+'order/remove/'+id);
}
getMyOrders(){
  return this.http.get(this.SERVER_URL+'order');
}
UpdateQuantity(data:OrderDetails){
  return this.http.post(this.SERVER_URL+'order/update',data);
}

AddNewProduct(newProduct:FormData){
  return this.http.post(this.SERVER_URL+'home',newProduct);
}

Delete(id:number){
  return this.http.delete(this.SERVER_URL+'home/'+id);
}
getsingleproduct(id:number){
  return this.http.get(this.SERVER_URL+'home/'+id);
}

getFilters(id:number){
  return this.http.get(this.SERVER_URL+'home/catagory/'+id);
}

placeOrder(){
  return this.http.delete(this.SERVER_URL+'order');
}

}

import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  NewProductForm:FormGroup;
  Catagorys=['Sports','Electronics','Cloths','Books,Media'];
  constructor(private fb:FormBuilder,
              private productService:ProductService,
              private toaster:ToastrService) {
    this.NewProductForm=this.fb.group({
      title:['',Validators.required],
      catagory:['',Validators.required],
      image:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      short_desc:['',Validators.required]
    })
   }

  ngOnInit(): void {
    
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.NewProductForm.get('image').setValue(file);
    }
  }

  submit(){
    const formData = new FormData();
    formData.append('productImages', this.NewProductForm.get('image').value);
    formData.append('title', this.NewProductForm.get('title').value);
    formData.append('cat_id', this.NewProductForm.get('catagory').value);
    formData.append('description', this.NewProductForm.get('description').value);
    formData.append('price', this.NewProductForm.get('price').value);
    formData.append('quantity', this.NewProductForm.get('quantity').value);
    formData.append('short_desc', this.NewProductForm.get('short_desc').value);
    if(this.NewProductForm.valid){
      this.productService.AddNewProduct(formData).subscribe((success)=>{
        this.NewProductForm.reset();
        this.toaster.success(`${success['message']}`,"Product Added",{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      },error=>{
        this.toaster.error(`${error.message}`,"Error",{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      }
      )
    }
  }

}

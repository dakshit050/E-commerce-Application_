import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm:FormGroup;
  customer: Customer = new Customer();
  constructor(
    private formBuilder: FormBuilder,
    private customerService:CustomerService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.registrationForm = this.formBuilder.group({
      username: ['',[Validators.minLength(3),Validators.maxLength(20),Validators.required]],
      email: ['',Validators.required],
      Birthday:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmpassword:['',Validators.required]
  
    });
  }
  onSubmit(){
    this.customer=this.registrationForm.value;
    if( this.customer.password!==undefined && this.customer.confirmpassword!==undefined && this.customer.password===this.customer.confirmpassword){
      this.customerService.AddNewUser(this.customer).subscribe(
        data=>{
          console.log(data);
          this.toastr.success('Account created successfully','welcome',{
            timeOut:2000,
            progressBar:true,
            progressAnimation:'increasing',
            
        });
        },
        err=>{
          console.log(err.error.message);
          this.toastr.error(err.error.message,'Soory!',{
            timeOut:2000,
            progressBar:true,
            progressAnimation:'increasing',
            
        });
        }
      );

    }else{
      this.toastr.error('Password Does not match','Error',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:'increasing',
          
      });
    }


  }
  googleOuth(){
    this.customerService.GoogleOuth().subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err.error);
      }
    );
  }

}

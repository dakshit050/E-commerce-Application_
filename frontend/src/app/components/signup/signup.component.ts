import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

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
    private spinner:NgxSpinnerService,
    private authservice:SocialAuthService,
    private router:Router
  ) { }

  signInWithGoogle(): void {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['',[Validators.minLength(3),Validators.maxLength(20),Validators.required]],
      email: ['',Validators.required],
      Birthday:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmpassword:['',Validators.required]
  
    });

    this.authservice.authState.subscribe((user)=>{
      this.customerService.GoogleOuth(user).subscribe(data=>{
        this.customerService.SetToken(data['token']);
        this.router.navigate(['cart']);
      })
    })
  }
  onSubmit(){
    this.spinner.show();
    this.customer=this.registrationForm.value;
    if( this.customer.password!==undefined && this.customer.confirmpassword!==undefined && this.customer.password===this.customer.confirmpassword){
      this.customerService.AddNewUser(this.customer).subscribe(
        data=>{
          this.spinner.hide();
          this.toastr.success('Account created successfully','welcome',{
            timeOut:2000,
            progressBar:true,
            progressAnimation:'increasing',
            
        });
        },
        err=>{
          this.spinner.hide();
          this.toastr.error(err.error.message,'Soory!',{
            timeOut:2000,
            progressBar:true,
            progressAnimation:'increasing',
            
        });
        }
      );

    }else{
      this.spinner.hide();
      this.toastr.error('Password Does not match','Error',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:'increasing',
          
      });
    }


  }


}

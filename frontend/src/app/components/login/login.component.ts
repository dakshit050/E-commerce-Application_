import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { response } from './../../models/customer.model';
import { CustomerService } from './../../services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
response: response = new response();

  constructor(
    private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private routes:Router,
    private toster:ToastrService,
    private spinner:NgxSpinnerService,
    private authservice:SocialAuthService
  ) { }

  signInWithGoogle(): void {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

servererrormsg:string;
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });

    this.authservice.authState.subscribe((user)=>{
      this.customerService.GoogleOuth(user).subscribe(data=>{
        this.customerService.SetToken(data['token']);
        this.routes.navigate(['cart']);
      })
    })
  }
onSubmit(){
  this.customerService.Authenticate(this.loginForm.value).subscribe(data=>{
    this.customerService.SetToken(data['token']);
    this.routes.navigateByUrl('/home');
  },
    err=>{
      this.toster.error(err.error.message,'Error',{
        timeOut:2000,
        progressBar:true,
        progressAnimation:"increasing"
      });
    }
    
  );
}
}

import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGardGuard } from './auth/auth-gard.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from './auth/admin-guard.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGardGuard]},
  {path:'contact',component:ContactComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGardGuard]},
  {path:'product',component:ProductComponent},
  {path:'user/signup', component:SignupComponent},
  {path:'user/login',component:LoginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGardGuard]},
  {path:'product/:id',component:SingleProductComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGardGuard,AdminGuardGuard]},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGardGuard]},
  {path:'thankyou',component:ThankyouComponent,canActivate:[AuthGardGuard]},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[HomeComponent,CartComponent,ContactComponent,CheckoutComponent,ProductComponent,SignupComponent,LoginComponent];
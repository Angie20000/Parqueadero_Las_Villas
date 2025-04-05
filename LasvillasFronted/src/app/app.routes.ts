import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'header', component: HeaderComponent},
    {path:'footer', component: FooterComponent},
    {path:'registro', component:RegistroComponent},
    {path:'login', component:LoginComponent},
    {path:'login/forgot-password', component: ForgotPasswordComponent},
   
];

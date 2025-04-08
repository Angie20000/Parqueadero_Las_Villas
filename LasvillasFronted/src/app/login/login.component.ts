import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ]
})

export class LoginComponent implements  OnInit{
  loginForm: FormGroup;
  showPassword = false;
  constructor(private fb: FormBuilder, private loginSer: LoginService, private router: Router,) {
    this.loginForm = this.fb.group({
      'userName': ['', Validators.required],
      'contrasenia': ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
   ;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  LoginInicio() {
    const { userName, contrasenia } = this.loginForm.value;

    this.loginSer.loginInicio(userName, contrasenia).subscribe(
      (response: any) => {
        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          text: 'Bienvenido a la plataforma',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // 🔁 Redirigir a la ruta deseada después del alert
          this.router.navigate(['/principal']);
        });
        console.log(response);
      },
      (error: any) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    );
  }
}
  


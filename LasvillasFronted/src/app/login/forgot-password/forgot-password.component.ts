import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  token: string = '';
  newPassword: string = '';
  step: number = 1; // 1: Solicitar email, 2: Ingresar token y nueva contraseña

  constructor(private http: HttpClient, private router: Router) {

  }

  requestResetCode() {
    if (!this.email.trim()) {
      this.showAlert('error', 'Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }
  
    const url = `http://localhost:8081/auth/forgot-password?email=${encodeURIComponent(this.email)}`;
  
    this.http.post(url, {}, { responseType: 'text' }).subscribe({
      next: () => {
        this.showAlert('success', 'Código enviado', 'Revisa tu correo.');
        this.step = 2; // Pasar al siguiente paso
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.showAlert('error', 'Error', err.error || 'Hubo un problema.');
      }
    });
  }
  

  // Paso 2: Restablecer la contraseña
  resetPassword() {
    if (!this.token.trim() || !this.newPassword.trim()) {
      this.showAlert('error', 'Error', 'Por favor, completa todos los campos.');
      return;
    }

    const requestData = { email: this.email, token: this.token, newPassword: this.newPassword };
    
    this.http.post('http://localhost:8081/auth/reset-password', requestData, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.showAlert('success', 'Contraseña restablecida', 'Tu contraseña ha sido cambiada con éxito.');
          this.router.navigate(['/login']); // Redirigir al inicio de sesión
        },
        error: () => {
          this.showAlert('error', 'Error', 'El código es inválido o ha expirado. Inténtalo de nuevo.');
        }
      });
  }

  // Función para mostrar alertas con SweetAlert
  private showAlert(icon: 'success' | 'error', title: string, text: string) {
    Swal.fire({ icon, title, text, confirmButtonColor: icon === 'success' ? '#3085d6' : '#d33' });
  }
}
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Registro } from './registro';
import { RegistroService } from './registro.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { REPLCommand } from 'repl';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  
  registroForm!: FormGroup;
  mostrarcontrasenia: boolean= false;
  mensaje:String ="";
  // Lista que almacenará las rutinas obtenidas del servicio
  public registro: Registro = new Registro;

    // Constructor: Se inyecta el servicio de rutinas para manejar datos
    constructor(private RegistroSer:RegistroService ,private router: Router, private activatedRouted: ActivatedRoute, private fb: FormBuilder)  {
      this.registroForm= this.fb.group(
        {
          "nombre": ["", Validators.required],
          "apellido": ["", Validators.required],
          "direccion":["", Validators.required],
          "email":["", [Validators.required, Validators.email]],
          "telefono":["", Validators.required],
          "userName":["", Validators.required],
          "contrasenia":["", [Validators.required, Validators.minLength(7)]],
          "Validarcontrasenia":["", Validators.required],
        },{ validators: this.validarContrasenia() }
      )
    }
    validarContrasenia(): ValidatorFn {
      return (formGroup: AbstractControl) => {
        const contrasenia = formGroup.get('contrasenia')?.value;
        const Validar = formGroup.get('Validarcontrasenia')?.value;
        return contrasenia && Validar && contrasenia === Validar? null : { noCoincide: true };
      };
    }     
// Método que se ejecuta automáticamente al iniciar el componente
ngOnInit(): void {
    this.registroForm.get('contrasenia')?.valueChanges.subscribe(() => {
      this.registroForm.get('Validarcontrasenia')?.updateValueAndValidity();
      
    });
}
get formControls() {
  return this.registroForm.controls;
} 

toggleConfirmedPasswordVisibility() {
  this.mostrarcontrasenia = !this.mostrarcontrasenia;
}
CreateUser() {
  const usuario = this.registroForm.value;

  this.RegistroSer.create(usuario).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Has creado una cuenta',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.registroForm.reset(); // Limpia el formulario después del registro
        this.mensaje = ''; 
      });
    },
    error: (err) => {
      console.log("Error en el registro:", err); // Agrega un log para ver detalles del error

      let mensajeError = 'Error desconocido';
      if (err.error) {
        if (typeof err.error === 'string') {
          mensajeError = err.error; // Si el backend envía un mensaje de error en texto
        } else if (err.error.message) {
          mensajeError = err.error.message; // Si el backend envía un objeto con "message"
        }
      }

      Swal.fire({
        title: 'Error en el registro',
        text: mensajeError,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    },
  });
}

}



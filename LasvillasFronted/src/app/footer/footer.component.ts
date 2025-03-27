import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  autores:any={
    nombre :'Angie', apellidos: 'Florez',
    nombre2:'Charith', apellidos2 :'Chavarro',
    nombre3: 'Sergio', apellidos3: 'Muñoz'
    }
}

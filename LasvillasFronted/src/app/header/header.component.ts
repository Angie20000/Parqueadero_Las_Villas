import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from './header.service';
import { CommonModule } from '@angular/common';
import { Registro } from '../registro/registro';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
title = "PARQUEADERO LAS VILLAS";
usuario: Registro | null = null;

constructor(private headerService: HeaderService) {}

ngOnInit() {
  this.headerService.usuario$.subscribe((usuario :Registro | null) => {
    this.usuario = usuario; // Se actualizará automáticamente
  });
}

cerrarSesion() {
  this.headerService.setUsuario(null);
}
}


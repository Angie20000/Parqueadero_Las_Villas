import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  usuario: any = null;
  private headerService = inject(HeaderService);

  ngOnInit() {
    this.headerService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
}

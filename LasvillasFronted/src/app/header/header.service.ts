import { Injectable } from '@angular/core';
import { Registro } from '../registro/registro';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private usuarioSubject = new BehaviorSubject<Registro | null>(this.obtenerUsuario());
  public usuario$: Observable<Registro | null>; // Se expone como observable

  constructor() {
    const usuario = this.obtenerUsuario(); // ahora sí es seguro
    this.usuarioSubject = new BehaviorSubject<Registro | null>(usuario);
    this.usuario$ = this.usuarioSubject.asObservable(); // actualizamos
  }

  setUsuario(usuario:Registro | null) {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
    this.usuarioSubject.next(usuario); // 🔥 Notifica a todos los componentes que el usuario cambió
  }

  obtenerUsuario(): Registro | null {
    if (typeof window !== 'undefined') {
      const usuarioJson = localStorage.getItem('usuario');
      return usuarioJson ? JSON.parse(usuarioJson) : null;
    }
    return null;
  }
 
}

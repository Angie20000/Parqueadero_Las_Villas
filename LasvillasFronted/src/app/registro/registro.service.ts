import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from './registro';

@Injectable({
  providedIn: 'root'  // ✅ Esto hace que esté disponible globalmente
})
export class RegistroService {
  private urlEndpoint: string = "http://localhost:8081/api/lasvillas";

  constructor(private http: HttpClient) {}

  create(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.urlEndpoint, registro);
  }
}

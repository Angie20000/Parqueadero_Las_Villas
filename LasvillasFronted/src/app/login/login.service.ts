import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from '../registro/registro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  
// 
loginInicio(username: string, password: string): Observable<any> {
  return this.http.post( "http://localhost:8081/api/lasvillas/login", {
    username: username,
    password: password
  
  });
}


}

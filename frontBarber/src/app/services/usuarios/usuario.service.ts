import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api-barber-iwiu.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
   user : any = null ; 
  constructor(private http: HttpClient) {}

  
   // Endpoint 1: Login de usuario
  loginUsuario(identificador: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/login`, {
      identificador,
      password
    });
  }

  // Endpoint 2: Crear usuario
  crearUsuario(data: {
    nombre: string,
    celular: string,
    correo: string,
    password: string,
    rol: string,
    foto_perfil: string
  }): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/register`, data);
  }

}
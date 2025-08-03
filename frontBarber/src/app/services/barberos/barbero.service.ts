import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api-barber-iwiu.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class BarberoService {

  constructor(private http: HttpClient) { }

  // Endpoint 1: traer todos los barberos
    GetAllBarbers(): Observable<any> {
      return this.http.get(`${API_URL}/api/barbers`);
    }
  
    // Endpoint 2: eliminar barbero
    DeleteBarber(id: number): Observable<any> {
      let token = localStorage.getItem("token")
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.delete(`${API_URL}/api/barbers/` + id, { headers });
    }
  
    //Endpoint 3: Actualizar barbero
    PutBarber(id: number, nombre: String, correo: String, password: String, imagen: String): Observable<any>{
      let token = localStorage.getItem("token")
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.put(`${API_URL}/api/barbers/` + id,{
        nombre,
        correo,
        password,
        imagen
      }, { headers });
    }
}

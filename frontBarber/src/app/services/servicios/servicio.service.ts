import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api-barber-iwiu.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  // Endpoint 1: traer todos los servicios
  GetAllServices(): Observable<any> {
    return this.http.get(`${API_URL}/api/services`);
  }

  // Endpoint 2: crear servicio
  PostServices(titulo: String, descripcion: String, precio: String, imagen: String): Observable<any> {
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${API_URL}/api/services`, {
      titulo,
      descripcion,
      precio,
      imagen

    }, { headers });
  }

  // Endpoint 3: eliminar servicio
  DeleteService(id: number): Observable<any> {
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`${API_URL}/api/services/` + id, { headers });
  }

  //Endpoint 4: Actualizar servicio
  PutService(id: number, titulo: String, descripcion: String, precio: String, imagen: String): Observable<any>{
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${API_URL}/api/services/` + id,{
      titulo,
      descripcion,
      precio,
      imagen
    }, { headers });
  }

}

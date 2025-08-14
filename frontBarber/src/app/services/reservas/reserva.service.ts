import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api-barber-iwiu.onrender.com'; // Asegúrate de que esta URL sea correcta para tus reservas

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Nuevo Endpoint 1: Traer todas las reservas (opcionalmente filtradas por fecha)
  // GET /api/bookings?fecha=YYYY-MM-DD
  GetAllBookings(fecha?: string): Observable<any> {
    let params = new HttpParams();
    if (fecha) {
      params = params.set('fecha', fecha);
    }
    return this.http.get(`${API_URL}/api/bookings`, { headers: this.getAuthHeaders(), params: params });
  }

  // Nuevo Endpoint 2: Traer una reserva por ID
  // GET /api/bookings/<id>
  GetBookingById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/api/bookings/${id}`, { headers: this.getAuthHeaders() });
  }

  // Nuevo Endpoint 3: Crear una nueva reserva
  // POST /api/bookings
  CreateBooking(bookingData: {
    cliente_id?: number; // Opcional, si el usuario ya está logueado
    nombre_cliente: string;
    telefono_cliente: string;
    barbero_id: number;
    servicio_id: number;
    fecha_reserva: string; // Formato 'YYYY-MM-DD'
    hora_reserva: string; // Formato 'HH:MM'
  }): Observable<any> {
    return this.http.post(`${API_URL}/api/bookings`, bookingData); // No requiere token para clientes no logueados al crear
  }

  // Nuevo Endpoint 4: Actualizar el estado de una reserva
  // PUT /api/bookings/<id>/status
  UpdateBookingStatus(id: number, newStatus: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'): Observable<any> {
    const body = { estado: newStatus };
    return this.http.put(`${API_URL}/api/bookings/${id}/status`, body, { headers: this.getAuthHeaders() });
  }

  // Nuevo Endpoint 5: Eliminar una reserva
  // DELETE /api/bookings/<id>
  DeleteBooking(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/api/bookings/${id}`, { headers: this.getAuthHeaders() });
  }

  GetBarberAvailability(barberoId: number, fecha: string): Observable<any> {
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get(`${API_URL}/api/barbers/${barberoId}/availability`, { params: params });
  }
  
}

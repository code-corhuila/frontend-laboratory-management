import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservacion } from '../clases/reservacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  //Obtiene listado de usuario
  private baseURL = environment.apiBaseUrl+'/api/reservacion';

  constructor(private httpClient: HttpClient) { }

  
  actualizarEstadoReservacion(id: number, estado: string): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${id}/estado?estado=${estado}`, {});
  }
  

  //Obtener reservaciones
  obtenerListaDeReservaciones(): Observable<{ data: any[] }> {
    return this.httpClient.get<{ data: any[] }>(`${this.baseURL}`);
  }

  obtenerReservacionesPorEstado(estado: string): Observable<any> {
    return this.httpClient.get<{ data: any[] }>(`${this.baseURL}/${estado}`);
  }
  


  //Metodo para registrar reservacion
  registrarReservacion(reservacion: Reservacion): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, reservacion);
  }

  //Metodo para actualizar reservacion
  actualizarReservacion(id: number, reservacion: Reservacion): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, reservacion);
  }


  //Metodo para obtener o buscar una Usuario
  obtenerReservacionPorId(id: any): Observable<Reservacion> {
    return this.httpClient.get<Reservacion>(`${this.baseURL}/${id}`);
  }

  //metodo para eliminar un registro
  eliminarReservacion(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}

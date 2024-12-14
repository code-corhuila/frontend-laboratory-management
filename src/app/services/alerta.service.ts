import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private apiUrl = 'http://localhost:9002/api/alertas-notificaciones';

  private apiUrlAlert = 'http://localhost:9002/api/alertas';

  constructor(private http: HttpClient) { }

  obtenerAlertasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activas`);
  }

  // Marcar una alerta como atendida
  marcarComoAtendida(id: number, alerta: any): Observable<any> {
    return this.http.put(`${this.apiUrlAlert}/${id}`, alerta);
  }
}
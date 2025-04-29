import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private apiUrl = environment.apiBaseUrl+'/api/alertas-notificaciones';

  private apiUrlAlert = environment.apiBaseUrl+'/api/alertas';

  constructor(private http: HttpClient) { }

  obtenerAlertasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activas`);
  }

  // Marcar una alerta como atendida
  marcarComoAtendida(id: number, alerta: any): Observable<any> {
    return this.http.put(`${this.apiUrlAlert}/${id}`, alerta);
  }
}
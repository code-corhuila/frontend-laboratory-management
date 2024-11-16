import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Mantenimiento {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  fechaMantenimiento: string;
  repuestosUtilizados: string;
  observacion: string;
  equipoId: number; // Relación con la tabla Equipo
  tipoMantenimiento: number; // Relación con CatalogoMantenimiento
  responsableMantenimiento: number; // Relación con Usuario
}

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private apiUrl = 'http://localhost:9002/api/mantenimientos'; // URL del API para mantenimientos

  constructor(private http: HttpClient) {}

  // Método para obtener todos los mantenimientos
  getMantenimientos(): Observable<{ status: boolean; data: Mantenimiento[]; message: string }> {
    return this.http.get<{ status: boolean; data: Mantenimiento[]; message: string }>(this.apiUrl);
  }

  // Método para obtener un mantenimiento por ID
  getMantenimientoById(id: number): Observable<{ status: boolean; data: Mantenimiento; message: string }> {
    return this.http.get<{ status: boolean; data: Mantenimiento; message: string }>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo mantenimiento
  createMantenimiento(mantenimiento: Mantenimiento): Observable<{ status: boolean; data: Mantenimiento; message: string }> {
    return this.http.post<{ status: boolean; data: Mantenimiento; message: string }>(this.apiUrl, mantenimiento);
  }

  // Método para actualizar un mantenimiento existente
  updateMantenimiento(id: number, mantenimiento: Mantenimiento): Observable<{ status: boolean; data: Mantenimiento; message: string }> {
    return this.http.put<{ status: boolean; data: Mantenimiento; message: string }>(`${this.apiUrl}/${id}`, mantenimiento);
  }

  // Método para eliminar un mantenimiento
  deleteMantenimiento(id: number): Observable<{ status: boolean; message: string }> {
    return this.http.delete<{ status: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}

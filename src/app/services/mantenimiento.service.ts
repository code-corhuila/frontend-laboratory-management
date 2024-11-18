import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Equipo {
  id: number;
  state: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  createdBy: number | null;
  updatedBy: number | null;
  deletedBy: number | null;
  codigoIdentificacion: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  costo: number;
}

interface Mantenimiento {
  id: number;
  state: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  createdBy: number | null;
  updatedBy: number | null;
  deletedBy: number | null;
  fechaMantenimiento: string;
  repuestosUtilizados: string;
  observacion: string;
  equipo: Equipo;
  tipoMantenimiento: string;
  responsableMantenimiento: string;
}

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
  private apiUrl = 'http://localhost:9002/api/mantenimientos';

  constructor(private http: HttpClient) {}

  // Obtener todos los mantenimientos
  getMantenimientos(): Observable<{ status: boolean; data: Mantenimiento[]; message: string }> {
    return this.http.get<{ status: boolean; data: Mantenimiento[]; message: string }>(this.apiUrl);
  }

  // Obtener un mantenimiento por ID
  getMantenimientoById(id: number): Observable<{ status: boolean; data: Mantenimiento; message: string }> {
    return this.http.get<{ status: boolean; data: Mantenimiento; message: string }>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo mantenimiento
  createMantenimiento(mantenimiento: Mantenimiento): Observable<{ status: boolean; data: Mantenimiento; message: string }> {
    return this.http.post<{ status: boolean; data: Mantenimiento; message: string }>(this.apiUrl, mantenimiento);
  }

  // Actualizar un mantenimiento existente
  updateMantenimiento(id: number, mantenimiento: Mantenimiento): Observable<{ status: boolean; data: Mantenimiento; message: string }> {
    return this.http.put<{ status: boolean; data: Mantenimiento; message: string }>(`${this.apiUrl}/${id}`, mantenimiento);
  }

  // Eliminar un mantenimiento
  deleteMantenimiento(id: number): Observable<{ status: boolean; message: string }> {
    return this.http.delete<{ status: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}

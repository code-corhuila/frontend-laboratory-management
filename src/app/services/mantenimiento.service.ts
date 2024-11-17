import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mantenimiento {
  id: number;
  descripcion: string;
  fecha: string;
  equipo: { id: number, nombre: string };
  responsable: { id: number, nombre: string };
  tipoMantenimiento: { id: number, nombre: string };
  observaciones?: string;
  state?: string;
}

export interface Equipo {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  codigoIdentificacion: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  costo: number;
}
export interface Responsable {
  id: number;          // ID del responsable
  nombre: string;      // Nombre del responsable
  email: string;       // Correo electrónico del responsable
  telefono?: string;   // Teléfono opcional del responsable
  estado: boolean;     // Estado del responsable (activo/inactivo)
  fechaCreacion: string; // Fecha de creación del responsable
  fechaActualizacion: string; // Fecha de última actualización
}




@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  [x: string]: any;

  private baseURL = 'http://localhost:9002/api/mantenimientos'; // URL de tu backend Spring Boot

  constructor(private httpClient: HttpClient) {}

  // Obtener la lista de mantenimientos
  obtenerListaDeMantenimientos(): Observable<Mantenimiento[]> {
    return this.httpClient.get<Mantenimiento[]>(`${this.baseURL}/listar`);
  }

  // Obtener un mantenimiento por su ID
  obtenerMantenimientoPorId(id: string): Observable<Mantenimiento> {
    return this.httpClient.get<Mantenimiento>(`${this.baseURL}/${id}`);
  }

  // Crear un nuevo mantenimiento
  crearMantenimiento(mantenimiento: Mantenimiento): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/guardar`, mantenimiento);
  }

  // Actualizar un mantenimiento existente
  actualizarMantenimiento(id: string, mantenimiento: Mantenimiento): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/actualizar/${id}`, mantenimiento);
  }

  // Eliminar un mantenimiento por su ID
  eliminarMantenimiento(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/eliminar/${id}`);
  }
}

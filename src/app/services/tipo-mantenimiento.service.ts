import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para el tipo de mantenimiento
export interface TipoMantenimiento {
nombre: any;
  id: string;           // ID del tipo de mantenimiento
  tipoMantenimiento: string; // Descripción del tipo de mantenimiento (Ej: Preventivo, Correctivo, etc.)
}

@Injectable({
  providedIn: 'root',
})
export class TipoMantenimientoService {
  private apiUrl = 'http://localhost:9002/api/tipos-mantenimiento';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los tipos de mantenimiento
  getTiposMantenimiento(): Observable<TipoMantenimiento[]> {
    return this.http.get<TipoMantenimiento[]>(this.apiUrl + '/listar');
  }

  // Obtener un tipo de mantenimiento por ID
  getTipoMantenimientoById(id: string): Observable<TipoMantenimiento> {
    return this.http.get<TipoMantenimiento>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo tipo de mantenimiento
  createTipoMantenimiento(tipoMantenimiento: TipoMantenimiento): Observable<TipoMantenimiento> {
    return this.http.post<TipoMantenimiento>(this.apiUrl + '/guardar', tipoMantenimiento);
  }

  // Actualizar un tipo de mantenimiento existente
  updateTipoMantenimiento(id: string, tipoMantenimiento: TipoMantenimiento): Observable<TipoMantenimiento> {
    return this.http.put<TipoMantenimiento>(`${this.apiUrl}/actualizar/${id}`, tipoMantenimiento);
  }

  // Eliminar un tipo de mantenimiento
  deleteTipoMantenimiento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}

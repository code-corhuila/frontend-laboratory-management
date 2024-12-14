import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Equipo {
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
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private apiUrl = 'http://localhost:9002/api/equipos';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los equipos
  getEquipos(): Observable<{ status: boolean; data: Equipo[]; message: string }> {
    return this.http.get<{ status: boolean; data: Equipo[]; message: string }>(this.apiUrl);
  }

  // Método para obtener un equipo por ID
  getEquipoById(id: number): Observable<{ status: boolean; data: Equipo; message: string }> {
    return this.http.get<{ status: boolean; data: Equipo; message: string }>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo equipo
  createEquipo(equipo: Equipo): Observable<{ status: boolean; data: Equipo; message: string }> {
    return this.http.post<{ status: boolean; data: Equipo; message: string }>(this.apiUrl, equipo);
  }

  // Método para actualizar un equipo existente
  updateEquipo(id: number, equipo: Equipo): Observable<{ status: boolean; data: Equipo; message: string }> {
    return this.http.put<{ status: boolean; data: Equipo; message: string }>(`${this.apiUrl}/${id}`, equipo);
  }

  // Método para eliminar un equipo
  deleteEquipo(id: number): Observable<{ status: boolean; message: string }> {
    return this.http.delete<{ status: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}

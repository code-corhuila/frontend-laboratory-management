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
}

interface Inventario {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  equipo: Equipo;
  cantidadDisponible: number;
  disponibilidad: boolean;
  fechaAdquisicion: string;
  observaciones: string;
  costo: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:9002/api/inventarios'; 

  constructor(private http: HttpClient) {}

  getInventarios(): Observable<{ status: boolean; data: Inventario[]; message: string }> {
    return this.http.get<{ status: boolean; data: Inventario[]; message: string }>(this.apiUrl);
  }
}
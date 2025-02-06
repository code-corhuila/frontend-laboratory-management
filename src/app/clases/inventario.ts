import { Equipo } from "./equipo";

export interface Inventario {
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
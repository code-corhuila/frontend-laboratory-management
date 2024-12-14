import { Equipo } from "./equipo";

export interface Mantenimiento {
  id: number;
  state: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  createdBy: number | null;
  updatedBy: number | null;
  deletedBy: number | null;
  fechaMantenimiento: string;
  observacion: string;
  proximoMantenimiento: string;
  repuestosUtilizados: string;
  responsableMantenimiento: string;
  tipoMantenimiento: string;
  foto: string;
  equipo: Equipo;
}
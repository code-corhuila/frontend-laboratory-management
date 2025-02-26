export interface Equipo {
    id: number;
    state: boolean;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    createdBy: number | null;
    updatedBy: number | null;
    deletedBy: number | null;
    codigoIdentificacion: string;
    costo: number;
    descripcion: string;
    estado: string;
    nombre: string;
    ubicacion: string;
  }
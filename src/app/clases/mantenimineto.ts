export class Mantenimiento {
  id?: number; // ID del mantenimiento (opcional al crear, pero obligatorio al actualizar o eliminar)
  estado: boolean = true; // Estado del mantenimiento (activo o no)
  createdAt?: string; // Fecha de creación (opcional)
  updatedAt?: string; // Fecha de actualización (opcional)
  deletedAt?: string; // Fecha de eliminación (opcional)
  createdBy?: number; // ID del usuario que creó el mantenimiento (opcional)
  updatedBy?: number; // ID del usuario que actualizó el mantenimiento (opcional)
  deletedBy?: number; // ID del usuario que eliminó el mantenimiento (opcional)
  
  fechaMantenimiento: string; // Fecha del mantenimiento
  repuestosUtilizados?: string; // Repuestos utilizados en el mantenimiento
  observacion?: string; // Observaciones del mantenimiento
  equipoId: number; // ID del equipo relacionado
  tipoMantenimientoId: string; // ID del tipo de mantenimiento
  responsableMantenimientoId: number; // ID del responsable del mantenimiento (usuario)

  constructor(
    fechaMantenimiento: string,
    equipoId: number,
    tipoMantenimientoId: string,
    responsableMantenimientoId: number,
    repuestosUtilizados?: string,
    observacion?: string
  ) {
    this.fechaMantenimiento = fechaMantenimiento;
    this.equipoId = equipoId;
    this.tipoMantenimientoId = tipoMantenimientoId;
    this.responsableMantenimientoId = responsableMantenimientoId;
    this.repuestosUtilizados = repuestosUtilizados;
    this.observacion = observacion;
  }
}

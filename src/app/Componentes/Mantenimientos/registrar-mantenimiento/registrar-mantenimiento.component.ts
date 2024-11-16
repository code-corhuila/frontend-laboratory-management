import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-registro',
  templateUrl: './registrar-mantenimiento.component.html',
  styleUrls: ['./registrar-mantenimiento.component.css']
})
export class MantenimientoRegistroComponent {
  fechaMantenimiento: string;
  repuestosUtilizados: string;
  observacion: string;
  equipoId: number;
  tipoMantenimiento: number;
  responsableMantenimiento: number;

  // Para manejar el estado de la carga
  cargando = false;
  mensaje = '';

  constructor(private mantenimientoService: MantenimientoService, private router: Router) {}

  // Método para registrar un nuevo mantenimiento
  registrarMantenimiento() {
    this.cargando = true;
    const mantenimiento = {
      fechaMantenimiento: this.fechaMantenimiento,
      repuestosUtilizados: this.repuestosUtilizados,
      observacion: this.observacion,
      equipoId: this.equipoId,
      tipoMantenimiento: this.tipoMantenimiento,
      responsableMantenimiento: this.responsableMantenimiento
    };

    this.mantenimientoService.createMantenimiento(mantenimiento).subscribe(
      (response) => {
        this.cargando = false;
        this.mensaje = response.message;
        this.router.navigate(['/mantenimientos']); // Redirige a la lista de mantenimientos
      },
      (error) => {
        this.cargando = false;
        this.mensaje = 'Error al registrar el mantenimiento. Inténtelo nuevamente.';
      }
    );
  }
}

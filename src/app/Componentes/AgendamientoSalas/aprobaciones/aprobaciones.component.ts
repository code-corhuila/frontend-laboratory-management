import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Reservacion } from '../../../clases/reservacion';
import { ReservacionService } from '../../../services/reservacion.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-aprobaciones',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule ],
  templateUrl: './aprobaciones.component.html',
  styleUrl: './aprobaciones.component.css'
})
export class AprobacionesComponent implements OnInit{

    reservaciones: Reservacion[] = [];
    page: number = 1;
    cargando = true;
    estadoSeleccionado: string = 'pendientes'; // por defecto

  
    constructor(private reservacionService: ReservacionService, private router: Router) { }
  
    ngOnInit(): void {
      this.filtrarReservaciones();
    }


    filtrarReservaciones() {
      this.cargando = true;
      this.reservacionService.obtenerReservacionesPorEstado(this.estadoSeleccionado).subscribe(
        (respuesta) => {
          this.reservaciones = respuesta.data;
          this.cargando = false;
    
          if (this.reservaciones.length === 0) {
            Swal.fire({
              title: 'Sin resultados',
              text: `No hay reservas con estado "${this.estadoSeleccionado}".`,
              icon: 'info',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        (error) => {
          console.error('Error al cargar reservas por estado:', error);
          this.cargando = false;
        }
      );
    }
    
  
    obtenerEstadoLaboratorio(estadoOcupacional: any): string {
      return Number(estadoOcupacional) === 0 ? 'Fuera de servicio' : 'Habilitado';
    }



    actualizarEstadoReservacion(id: number, estado: string) {
      const estadoRe =  (estado) === 'APROBADA' ? ' aprobado ' : ' rechazado ';
      Swal.fire({
        title: `¿Confirmar estado ${estadoRe} para la reserva?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Sí, ${estado.toLowerCase()}`,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reservacionService.actualizarEstadoReservacion(id, estado).subscribe(() => {
            Swal.fire('Actualizado', `La solicitud fue ${estado.toLowerCase()} correctamente.`, 'success');
            this.ngOnInit(); // recarga la lista
          });
        }
      });
    }
  



}

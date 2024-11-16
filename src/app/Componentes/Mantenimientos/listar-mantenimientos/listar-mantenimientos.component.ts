import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { mantenimiento } from '../../../clases/mantenimineto';

@Component({
  selector: 'app-listar-mantenimientos',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './listar-mantenimientos.component.html',
  styleUrls: ['./listar-mantenimientos.component.css']
})
export class ListarMantenimientosComponent implements OnInit {

  mantenimientos: mantenimiento[] = [];
  page: number = 1;
  cargando = true;

  constructor(private mantenimientoService: MantenimientoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerMantenimientos();
  }

  // Método para actualizar un mantenimiento
  actualizarMantenimiento(id: number) {
    this.router.navigate(['dashboard', 'actualizarMantenimiento', id]);
  }

  // Método para cargar la lista de mantenimientos
  private obtenerMantenimientos() {
    this.cargando = true;
    this.mantenimientoService.getMantenimientos().subscribe(
      (respuesta) => {
        this.mantenimientos = respuesta.data;
        this.cargando = false;
        if (this.mantenimientos.length === 0) {
          Swal.fire({
            title: 'No hay registros',
            text: 'No se encontraron mantenimientos. ¿Quieres agregar uno nuevo?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Agregar Mantenimiento',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.agregarMantenimiento();
            }
          });
        }
      },
      (error) => {
        console.error('Error al cargar los mantenimientos', error);
        this.cargando = false;
      }
    );
  }

  // Método para eliminar un mantenimiento
  eliminarMantenimiento(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mantenimientoService.deleteMantenimiento(id).subscribe(() => {
          this.obtenerMantenimientos();
          Swal.fire(
            'Registro eliminado',
            'El mantenimiento ha sido eliminado con éxito',
            'success'
          );
        });
      }
    });
  }

  // Método para ver detalles de un mantenimiento
  verDetallesDeMantenimiento(id: number) {
    this.router.navigate(['dashboard', 'detalleMantenimiento', id]);
  }

  // Método para agregar un nuevo mantenimiento
  agregarMantenimiento() {
    this.router.navigate(['dashboard', 'registrarMantenimiento']);
  }

  // Método para obtener el tipo de mantenimiento en formato legible
  obtenerTipoMantenimiento(tipo: number): string {
    const tipos = { 1: 'Preventivo', 2: 'Correctivo', 3: 'Predictivo' };
    return tipos[tipo] || 'Desconocido';
  }

  // Método para obtener el nombre del responsable de mantenimiento
  obtenerResponsable(id: number): string {
    // Simulando una conversión básica, puedes ajustarlo para usar un servicio de usuarios
    return `Responsable ${id}`;
  }
}

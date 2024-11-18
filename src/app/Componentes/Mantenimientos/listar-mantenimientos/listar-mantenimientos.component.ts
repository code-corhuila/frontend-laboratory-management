import { Component, OnInit } from '@angular/core';
import { Equipo, Mantenimiento, MantenimientoService, Responsable } from '../../../services/mantenimiento.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-listar-mantenimientos',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './listar-mantenimientos.component.html',
  styleUrls: ['./listar-mantenimientos.component.css']
})
export class ListarMantenimientosComponent implements OnInit {
  
  mantenimientos: Mantenimiento[];
  page: number = 1;
  cargando = true;

  constructor(private mantenimientoService: MantenimientoService, private router: Router) { }


  ngOnInit(): void {
    this.obtenerMantenimientos();
  }

  actualizarMantenimiento(id: any) {
    this.router.navigate(['dashboard', 'actualizarSala', id]);
  }

  private obtenerMantenimientos() {
    this.cargando = true;
    this.mantenimientoService.obtenerListaDeMantenimientos().subscribe(
        (dato) => {
            this.mantenimientos = dato['data'];
            this.cargando = false;
            if (this.mantenimientos.length === 0) {
                Swal.fire({
                    title: 'No hay registros',
                    text: 'No se encontraron mantenimientos. ¿Quieres agregar un nuevo mantenimiento?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Agregar mantenimiento',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.agregarMantenimiento();
                    }
                });
            }
        },
        (error) => {
            console.error('Error al cargar las salas', error);
            this.cargando = false;
        }
    );
}

  eliminarMantenimiento(id: any) {
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
        this.mantenimientoService.eliminarMantenimiento(id).subscribe(() => {
          this.obtenerMantenimientos();
          Swal.fire(
            'Registro eliminado',
            'La sala ha sido eliminada con éxito',
            'success'
          );
        });
      }
    });
  }

  verDetallesDeMantenimineto(id: any) {
    this.router.navigate(['dashboard', 'detalleSala', id]);
  }

  obtenerEstadoMantenimiento(estadoOcupacional: number): string {
    return estadoOcupacional == 0 ? 'Fuera de servicio' : 'Habilitado';
  }

  agregarMantenimiento() {
    this.router.navigate(['dashboard', 'registrarSala']);
  }
}

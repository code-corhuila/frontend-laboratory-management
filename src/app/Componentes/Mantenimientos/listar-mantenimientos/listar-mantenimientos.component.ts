import { Component, OnInit } from '@angular/core';
import { Equipo, Mantenimiento, MantenimientoService, Responsable } from '../../../services/mantenimiento.service';
import { TipoMantenimiento } from '../../../services/tipo-mantenimiento.service';
@Component({
  selector: 'app-listar-mantenimientos',
  templateUrl: './listar-mantenimientos.component.html',
  styleUrls: ['./listar-mantenimientos.component.css']
})
export class ListarMantenimientosComponent implements OnInit {
  
  mantenimientos: Mantenimiento[] = [];
  equipos: Equipo[] = [];
  responsables: Responsable[] = [];
  tiposMantenimiento: TipoMantenimiento[] = [];
  
  isModalOpen = false;
  modalMode: 'add' | 'edit' = 'add';
  currentMantenimiento: Mantenimiento = {} as Mantenimiento;

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit(): void {
    this.cargarMantenimientos();
    this.cargarEquipos();
    this.cargarResponsables();
    this.cargarTiposMantenimiento();
  }

  cargarMantenimientos(): void {
    this.mantenimientoService.obtenerListaDeMantenimientos().subscribe(
      (mantenimientos) => {
        this.mantenimientos = mantenimientos;
      },
      (error) => {
        console.error('Error al cargar mantenimientos', error);
      }
    );
  }

  cargarEquipos(): void {
    // Cargar equipos de alguna API, similar a los mantenimientos
  }

  cargarResponsables(): void {
    // Cargar responsables de alguna API
  }

  cargarTiposMantenimiento(): void {
    // Cargar tipos de mantenimiento de alguna API
  }

  openModal(mode: 'add' | 'edit', mantenimiento?: Mantenimiento): void {
    this.modalMode = mode;
    if (mode === 'edit' && mantenimiento) {
      this.currentMantenimiento = { ...mantenimiento };
    } else {
      this.currentMantenimiento = {} as Mantenimiento;
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveMantenimiento(): void {
    if (this.modalMode === 'add') {
      this.mantenimientoService.crearMantenimiento(this.currentMantenimiento).subscribe(
        () => {
          this.cargarMantenimientos();
          this.closeModal();
        },
        (error) => {
          console.error('Error al guardar mantenimiento', error);
        }
      );
    } else if (this.modalMode === 'edit') {
      this.mantenimientoService.actualizarMantenimiento(this.currentMantenimiento.id.toString(), this.currentMantenimiento).subscribe(
        () => {
          this.cargarMantenimientos();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar mantenimiento', error);
        }
      );
    }
  }

  eliminarMantenimiento(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este mantenimiento?')) {
      this.mantenimientoService.eliminarMantenimiento(id.toString()).subscribe(
        () => {
          this.cargarMantenimientos();
        },
        (error) => {
          console.error('Error al eliminar mantenimiento', error);
        }
      );
    }
  }
}

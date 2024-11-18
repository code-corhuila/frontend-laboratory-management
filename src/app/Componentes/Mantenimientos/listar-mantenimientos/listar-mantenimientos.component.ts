import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../../../services/equipo.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';

interface Equipo {
  id: number;
  codigoIdentificacion: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  costo: number;
}

interface Mantenimiento {
  id: number;
  fechaMantenimiento: string;
  repuestosUtilizados: string;
  observacion: string;
  equipo: Equipo;
  tipoMantenimiento: string;
  responsableMantenimiento: string;
}

@Component({
  selector: 'app-listar-mantenimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-mantenimientos.component.html',
  styleUrls: ['./listar-mantenimientos.component.css']
})
export class ListarMantenimientosComponent implements OnInit {
  buttons: string[] = ['Equipos', 'Mantenimientos', 'Reportes'];
  selectedButton: string = 'Mantenimientos';
  equipos: Equipo[] = [];
  mantenimientos: Mantenimiento[] = [];
  isModalOpen: boolean = false;
  modalMode: 'add' | 'edit' = 'add';
  modalType: 'equipo' | 'mantenimiento' = 'equipo';
  currentItem: any = null;

  constructor(
    private equipoService: EquipoService,
    private mantenimientoService: MantenimientoService
  ) {}

  ngOnInit(): void {
    this.loadEquipos();
    this.loadMantenimientos();
  }

  loadEquipos(): void {
    this.equipoService.getEquipos().subscribe(response => {
      if (response.status) {
        this.equipos = response.data;
      }
    });
  }

  loadMantenimientos(): void {
    this.mantenimientoService.getMantenimientos().subscribe(response => {
      if (response.status) {
        this.mantenimientos = response.data;
      }
    });
  }

  setActiveButton(button: string) {
    this.selectedButton = button;
  }

  openModal(mode: 'add' | 'edit', type: 'equipo' | 'mantenimiento', item?: any): void {
    this.modalMode = mode;
    this.modalType = type;
    this.currentItem = mode === 'edit' ? { ...item } : this.initializeDefaultItem();
    this.isModalOpen = true;
  }

  private initializeDefaultItem(): any {
    return {
      codigoIdentificacion: '',
      nombre: '',
      descripcion: '',
      ubicacion: '',
      costo: 0,
      state: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      createdBy: 0,
      updatedBy: 0,
      deletedBy: 0,
    };
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentItem = null;
  }

  save(): void {
    const data = { ...this.currentItem };
    if (this.modalMode === 'add') {
      delete data.id; // Asegurarse de no enviar el ID
      this.equipoService.createEquipo(data).subscribe(() => {
        this.loadEquipos();
        this.closeModal();
      });
    } else {
      this.equipoService.updateEquipo(data.id, data).subscribe(() => {
        this.loadEquipos();
        this.closeModal();
      });
    }
  }

  delete(type: 'equipo' | 'mantenimiento', id: number): void {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      if (type === 'equipo') {
        this.equipoService.deleteEquipo(id).subscribe(() => this.loadEquipos());
      } else {
        this.mantenimientoService.deleteMantenimiento(id).subscribe(() => this.loadMantenimientos());
      }
    }
  }
}

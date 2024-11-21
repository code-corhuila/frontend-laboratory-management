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
  buttons: string[] = ['Equipos', 'Mantenimientos'];
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
    if (this.modalType === 'equipo') {
      return {
        id: 0,
        codigoIdentificacion: '',
        nombre: '',
        descripcion: '',
        ubicacion: '',
        costo: 0,
        state: true,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
      };
    } else if (this.modalType === 'mantenimiento') {
      return {
        id: 0,
        fechaMantenimiento: '',
        repuestosUtilizados: '',
        observacion: '',
        tipoMantenimiento: '',
        responsableMantenimiento: '',
        equipo: {
          id: 0,
          state: true,
          createdAt: null,
          updatedAt: null,
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
          codigoIdentificacion: '',
          nombre: '',
          descripcion: '',
          ubicacion: '',
          costo: 0,
        },
        state: true,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
      };
    }
    return {};
  }
  
  

  closeModal(): void {
    this.isModalOpen = false;
    this.currentItem = null;
  }

  save(): void {
    let data = { ...this.currentItem };
  
    if (this.modalType === 'mantenimiento') {
      // Normalizar los campos según el esquema del Swagger
      data = {
        ...data,
        state: data.state ?? true, // Asegura que sea true si no está definido
        createdAt: data.createdAt || null,
        updatedAt: data.updatedAt || null,
        deletedAt: data.deletedAt || null,
        createdBy: data.createdBy || null,
        updatedBy: data.updatedBy || null,
        deletedBy: data.deletedBy || null,
        equipo: {
          ...data.equipo,
          state: data.equipo?.state ?? true,
          createdAt: data.equipo?.createdAt || null,
          updatedAt: data.equipo?.updatedAt || null,
          deletedAt: data.equipo?.deletedAt || null,
          createdBy: data.equipo?.createdBy || null,
          updatedBy: data.equipo?.updatedBy || null,
          deletedBy: data.equipo?.deletedBy || null,
        },
      };
    }
  
    // Lógica para equipos o mantenimientos
    if (this.modalType === 'equipo') {
      if (this.modalMode === 'add') {
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
    } else if (this.modalType === 'mantenimiento') {
      if (this.modalMode === 'add') {
        this.mantenimientoService.createMantenimiento(data).subscribe(() => {
          this.loadMantenimientos();
          this.closeModal();
        });
      } else {
        this.mantenimientoService.updateMantenimiento(data.id, data).subscribe(() => {
          this.loadMantenimientos();
          this.closeModal();
        });
      }
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

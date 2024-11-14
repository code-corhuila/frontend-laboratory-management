import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../../services/inventario.service';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para habilitar ngModel

interface Equipo {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  codigoIdentificacion: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  costo: number;
}

interface Inventario {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  equipo: Equipo;
  cantidadDisponible: number;
  disponibilidad: boolean;
  fechaAdquisicion: string;
  observaciones: string;
  costo: number;
}

@Component({
  selector: 'app-listar-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Agrega FormsModule aquí
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css']
})
export class ListarInventarioComponent implements OnInit {
  inventarios: Inventario[] = [];
  modalMode: 'add' | 'edit' = 'add';
  currentInventario: Inventario | null = null;
  isModalOpen: boolean = false;

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.loadInventarios();
  }

  loadInventarios(): void {
    this.inventarioService.getInventarios().subscribe(response => {
      if (response.status) {
        this.inventarios = response.data;
      }
    });
  }

  openModal(mode: 'add' | 'edit', inventario?: Inventario): void {
    this.modalMode = mode;
    this.currentInventario = mode === 'edit' ? { ...inventario } : {} as Inventario;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentInventario = null;
  }

  saveInventario(): void {
    if (this.modalMode === 'add' && this.currentInventario) {
      this.inventarioService.createInventario(this.currentInventario).subscribe(() => {
        this.loadInventarios();
        this.closeModal();
      });
    } else if (this.modalMode === 'edit' && this.currentInventario && this.currentInventario.id) {
      this.inventarioService.updateInventario(this.currentInventario.id, this.currentInventario).subscribe(() => {
        this.loadInventarios();
        this.closeModal();
      });
    }
  }

  deleteInventario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este inventario?')) {
      this.inventarioService.deleteInventario(id).subscribe(() => {
        this.loadInventarios();
      });
    }
  }
}

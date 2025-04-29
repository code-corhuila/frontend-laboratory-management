import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventario } from '../../../clases/inventario';
import { Equipo } from '../../../clases/equipo';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { InventarioService } from '../../../services/inventario.service';
import { EquipoService } from '../../../services/equipo.service';


//src\app\Services\equipo.service.ts

@Component({
  selector: 'app-listar-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css']
})
export class ListarInventarioComponent implements OnInit {
  inventarios: Inventario[] = [];
  equipos: Equipo[] = [];
  modalMode: 'add' | 'edit' = 'add';
  currentInventario: Inventario | null = null;
  isModalOpen: boolean = false;

  filtroBusqueda: string = '';


  constructor(
    private inventarioService: InventarioService,
    private equipoService: EquipoService
  ) {}

  ngOnInit(): void {
    this.loadInventarios();
  }

  loadInventarios(): void {
    this.equipoService.getEquipos().pipe(
      switchMap((response) => {
        if (response.status && response.data && response.data.length > 0) {
          this.equipos = response.data;
          return this.inventarioService.getInventarios();
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "No hay equipos para agregar al inventario, debería crear nuevos equipos.",
            showConfirmButton: false,
            timer: 1500
          });
          throw new Error("No hay equipos disponibles."); // Detiene la cadena.
        }
      })
    ).subscribe({
      next: (response) => {
        if (response.status && response.data && response.data.length > 0) {
          this.inventarios = response.data.map((inventario: any) => ({
            ...inventario,
            equipo: {
              ...inventario.equipo,
            }
          }));
        } else {
          Swal.fire({
            title: "No hay datos para mostrar",
            icon: "warning",
            text: "¿Desea agregar un equipo al inventario?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, agregar equipo"
          }).then((result) => {
            if (result.isConfirmed) {
              this.openModal('add');
            }
          });
        }
      },
      error: (err) => {
        console.error(err.message || 'Error al cargar datos');
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message || "Ocurrió un error al cargar datos.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  openModal(mode: 'add' | 'edit', inventario?: Inventario): void {
    this.modalMode = mode;
    this.currentInventario = mode === 'edit'
      ? { ...inventario, equipo: { ...inventario?.equipo }, state: inventario?.state || true }
      : { equipo: {} as Equipo, state: true } as Inventario;
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

  inventariosFiltrados(): Inventario[] {
    if (!this.filtroBusqueda) {
      return this.inventarios; // Si no hay texto de búsqueda, devuelve todos los inventarios
    }
  
    const textoBusqueda = this.filtroBusqueda.toLowerCase();
  
    return this.inventarios.filter((inventario) =>
      inventario.equipo.nombre.toLowerCase().includes(textoBusqueda) || 
      inventario.equipo.codigoIdentificacion.toLowerCase().includes(textoBusqueda)
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../../../services/equipo.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { Equipo } from '../../../clases/equipo';
import { Mantenimiento } from '../../../clases/mantenimiento';
import Swal from 'sweetalert2';


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
  file: File | null = null;

  filtroCodigo: string = '';  // Valor del filtro
  mantenimientosFiltrados: Mantenimiento[] = [];

  filtroTipo: string = '';

  constructor(
    private equipoService: EquipoService,
    private mantenimientoService: MantenimientoService
  ) { }

  ngOnInit(): void {
    this.loadMantenimientos();
  }

  ngOnChanges(): void {
    if (this.selectedButton === 'Equipos') {
      this.loadEquipos();
    }
  }

  onFileSelected(event: any): void {
    const fileInput = event.target.files[0];
    if (fileInput) {
      this.file = fileInput;

      // Validar el tamaño del archivo o tipo si es necesario
      const reader = new FileReader();
      reader.onload = () => {
        this.currentItem.foto = reader.result as string; // Guardar base64 en `foto`
      };
      reader.onerror = () => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "ocurrio un error al cargar la imagen",
          showConfirmButton: false,
          timer: 1500
        });
      };
      reader.readAsDataURL(fileInput); // Leer archivo como Data URL (Base64)
    }
  }

  loadEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (response) => {
        if (response.status) {
          if (response.data && response.data.length > 0) {
            this.equipos = response.data;
          } else {
            Swal.fire({
              title: "No hay datos para mostrar",
              icon: "warning",
              text: "Desea Crear un nuevo equipo?",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, crear nuevo Equipo"
            }).then((result) => {
              if (result.isConfirmed) {
                this.openModal('add', 'equipo')
              }
            });
          }
        }
      },
      error: (err) => {
        console.error("Error al cargar equipos:", err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Ocurrió un error al cargar los equipos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  //openModal('add', 'mantenimiento')

  loadMantenimientos(): void {
    this.mantenimientoService.getMantenimientos().subscribe({
      next: (response) => {
        if (response.status) {
          this.mantenimientos = response.data.map((mantenimiento: any) => ({
            ...mantenimiento,
            equipo: {
              ...mantenimiento.equipo,
            }
          }));
          this.mantenimientosFiltrados = this.mantenimientos;
        }
      },
      error: (err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "ocurrio un error al cargar los mantenimientos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  setActiveButton(button: string) {
    this.selectedButton = button;
    if (button === 'Equipos') {
      this.loadEquipos();
    }
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
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
        state: true,
        codigoIdentificacion: '',
        costo: 0,
        descripcion: '',
        estado: '',
        nombre: '',
        ubicacion: '',
      };
    } else if (this.modalType === 'mantenimiento') {
      return {
        state: true,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
        fechaMantenimiento: '',
        proximoMantenimiento: '',
        observacion: '',
        repuestosUtilizados: '',
        responsableMantenimiento: '',
        tipoMantenimiento: '',
        foto: '',
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
          costo: 0,
          descripcion: '',
          estado: '',
          nombre: '',
          ubicacion: '',

        }
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

    if (data.fechaMantenimiento) {
      const fecha = new Date(data.fechaMantenimiento); // Convierte a objeto Date
      data.fechaMantenimiento = fecha.toISOString(); // Obtiene el formato ISO con tiempo
    }

    if (data.proximoMantenimiento) {
      const fecha2 = new Date(data.proximoMantenimiento); // Convierte a objeto Date
      data.proximoMantenimiento = fecha2.toISOString(); // Obtiene el formato ISO con tiempo
    }


    // Agregar lógica específica para foto
    if (this.modalType === 'mantenimiento' && this.file) {
      data.foto = this.currentItem.foto; // La foto en formato base64
    }

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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Equipo Creado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
        });
      } else {
        this.equipoService.updateEquipo(data.id, data).subscribe(() => {
          this.loadEquipos();
          this.closeModal();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Equipo Actualizado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    } else if (this.modalType === 'mantenimiento') {
      if (this.modalMode === 'add') {
        this.mantenimientoService.createMantenimiento(data).subscribe(() => {
          this.loadMantenimientos();
          this.closeModal();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Mantenimiento Creado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
        });
      } else {
        this.mantenimientoService.updateMantenimiento(data.id, data).subscribe(() => {
          this.loadMantenimientos();
          this.closeModal();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Mantenimiento Actualizado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    }
  }

  delete(type: 'equipo' | 'mantenimiento', id: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === 'equipo') {
          this.equipoService.deleteEquipo(id).subscribe(() => {
            this.loadEquipos(); // Recargar lista de equipos
            Swal.fire({
              title: "¡Eliminado!",
              text: "El Equipo ha sido eliminado.",
              icon: "success"
            });
          });
        } else if (type === 'mantenimiento') {
          this.mantenimientoService.deleteMantenimiento(id).subscribe(() => {
            this.loadMantenimientos(); // Recargar lista de mantenimientos
            Swal.fire({
              title: "¡Eliminado!",
              text: "El Mantenimiento ha sido eliminado.",
              icon: "success"
            });
          });
        }
      }
    });
  }

  isInfoModalOpen = false;
  selectedMantenimiento: Mantenimiento | null = null;

  // Método para mostrar la información del mantenimiento
  showInfo(mantenimiento: Mantenimiento): void {
    this.selectedMantenimiento = mantenimiento;
    this.isInfoModalOpen = true;
  }

  // Cerrar el modal de información
  closeInfoModal(): void {
    this.isInfoModalOpen = false;
    this.selectedMantenimiento = null;
  }

  filtrarMantenimientos(): void {
    if (this.filtroCodigo) {
      this.mantenimientosFiltrados = this.mantenimientos.filter(mantenimiento =>
        mantenimiento.equipo.codigoIdentificacion.includes(this.filtroCodigo)
      );
    } else {
      this.mantenimientosFiltrados = this.mantenimientos;
    }

    // Ordenar por fecha de mantenimiento más reciente
    this.mantenimientosFiltrados.sort((a, b) =>
      new Date(b.fechaMantenimiento).getTime() - new Date(a.fechaMantenimiento).getTime()
    );
  }

  filtrarPorTipo(): void {
    if (this.filtroTipo) {
      this.mantenimientosFiltrados = this.mantenimientos.filter(
        mantenimiento => mantenimiento.tipoMantenimiento === this.filtroTipo
      );
    } else {
      this.mantenimientosFiltrados = [...this.mantenimientos]; // Restaurar todos si no hay filtro
    }
  }

}



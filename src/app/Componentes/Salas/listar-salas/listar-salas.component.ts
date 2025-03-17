import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistrarSalaComponent } from '../registrar-sala/registrar-sala.component';
import { DetalleSalaComponent } from '../detalle-sala/detalle-sala.component';
import { ActualizarSalaComponent } from '../actualizar-sala/actualizar-sala.component';

@Component({
  selector: 'app-listar-salas',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RegistrarSalaComponent, RegistrarSalaComponent, DetalleSalaComponent, ActualizarSalaComponent],
  templateUrl: './listar-salas.component.html',
  styleUrl: './listar-salas.component.css'
})
export class ListarSalasComponent implements OnInit {

  salas: Sala[] = [];
  page: number = 1;
  cargando = true;
  mostrarModal: boolean = false; // Variable modal registro
  mostrarModalDetalle: boolean = false; //variable modal detalle
  mostrarModalActualizar: boolean = false; //variable modal actualizar
  idSalaSeleccionada: number | null = null; // ID de la sala seleccionada

  constructor(private salaService: SalaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerSalas();
  }

  abrirModal() {
    this.mostrarModal = true; // Solo cambia la variable a true
  }

  agregarSala() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  abrirModalDetalle(id: any) {
    this.idSalaSeleccionada = id; // Guarda el ID de la sala
    this.mostrarModalDetalle = true; // Solo cambia la variable a true
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
  }

  abrirModalActualizar(id: any) {
    this.idSalaSeleccionada = id;
    this.mostrarModalActualizar = true;
  }

  cerrarModalActualizar() {
    this.mostrarModalActualizar = false;
  }


  obtenerSalas() {
    this.cargando = true;
    this.salaService.obtenerListaDeSalas().subscribe(
      (dato) => {
        this.salas = dato['data'];
        this.cargando = false;
        if (this.salas.length === 0) {
          Swal.fire({
            title: 'No hay registros',
            text: 'No se encontraron salas. ¿Quieres agregar una nueva?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Agregar Sala',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.abrirModal();
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




  eliminarSala(id: any) {
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
        this.salaService.eliminarSala(id).subscribe(() => {
          this.obtenerSalas();
          Swal.fire(
            'Registro eliminado',
            'La sala ha sido eliminada con éxito',
            'success'
          );
        });
      }
    });
  }


  obtenerEstadoLaboratorio(estadoOcupacional: any): string {
    return Number(estadoOcupacional) === 0 ? 'Fuera de servicio' : 'Habilitado';
  }





}

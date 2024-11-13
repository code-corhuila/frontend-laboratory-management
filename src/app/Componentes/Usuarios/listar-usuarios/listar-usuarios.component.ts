import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent  implements OnInit{

  usuarios: Sala[];
  page: number = 1;
  cargando = true;

  constructor(private usuarioService: SalaService, private router: Router) { }


  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  actualizarSala(id: any) {
    this.router.navigate(['dashboard', 'actualizarSala', id]);
  }

  private obtenerUsuarios() {
    this.cargando = true;
    this.usuarioService.obtenerListaDeSalas().subscribe(
        (dato) => {
            this.usuarios = dato['data'];
            this.cargando = false;
            if (this.usuarios.length === 0) {
                Swal.fire({
                    title: 'No hay registros',
                    text: 'No se encontraron usuarios. ¿Quieres agregar un nuevo registro?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Agregar Usuario',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.agregarUsuario();
                    }
                });
            }
        },
        (error) => {
            console.error('Error al cargar los usuarios', error);
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
        this.usuarioService.eliminarSala(id).subscribe(() => {
          this.obtenerUsuarios();
          Swal.fire(
            'Registro eliminado',
            'La sala ha sido eliminada con éxito',
            'success'
          );
        });
      }
    });
  }

  verDetallesDeUsuario(id: any) {
    this.router.navigate(['dashboard', 'detalleSala', id]);
  }

  obtenerEstadoUsuario(estadoOcupacional: number): string {
    return estadoOcupacional == 0 ? 'Fuera de servicio' : 'Habilitado';
  }

  agregarUsuario() {
    this.router.navigate(['dashboard', 'registrarSala']);
  }
}







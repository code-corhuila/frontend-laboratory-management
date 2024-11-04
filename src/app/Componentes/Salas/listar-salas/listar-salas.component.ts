import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-salas',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './listar-salas.component.html',
  styleUrl: './listar-salas.component.css'
})
export class ListarSalasComponent implements OnInit {

  salas:Sala[];
  page: number = 1;  // Variable para manejar la página actual

  constructor( private salaService:SalaService, private router:Router) { }


  ngOnInit(): void {
    this.obtenerSalas();
  }

  actualizarSala(id:any){
    this.router.navigate(['dashboard','actualizarSala', id]);
  }
  

  private obtenerSalas(){
    this.salaService.obtenerListaDeSalas().subscribe(dato => {
      this.salas = dato['data'];
    });
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
  


  verDetallesDeSala(id:any){
    this.router.navigate(['dashboard','detalleSala',id]);
  }

  obtenerEstadoOcupacional(estadoOcupacional: number): string {
    return estadoOcupacional === 1 ? 'Ocupado' : 'Libre';
  }

  agregarSala(id:any){
    this.router.navigate(['dashboard','registrarSala']);
  }
}
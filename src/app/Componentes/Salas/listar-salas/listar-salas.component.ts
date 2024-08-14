import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-salas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-salas.component.html',
  styleUrl: './listar-salas.component.css'
})
export class ListarSalasComponent implements OnInit {

  empleados:Sala[];

  constructor( private empleadoService:SalaService, private router:Router) { }


  ngOnInit(): void {
    console.log("obtener salas", this.empleados)
    this.obtenerEmpleados();
  }

  actualizarEmpleado(id:any){
    this.router.navigate(['actualizar-empleado', id]);
  }

  private obtenerEmpleados(){
    this.empleadoService.obtenerListaDeSalas().subscribe(dato => {
      this.empleados = dato['data'];
    });
  }


  eliminarEmpleado(id: any) {
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
        this.empleadoService.eliminarSala(id).subscribe(() => {
          this.obtenerEmpleados();
          Swal.fire(
            'Empleado eliminado',
            'El empleado ha sido eliminado con éxito',
            'success'
          );
        });
      }
    });
  }
  


  verDetallesDelEmpleado(id:any){
    this.router.navigate(['empleado-detalles',id]);
  }

}
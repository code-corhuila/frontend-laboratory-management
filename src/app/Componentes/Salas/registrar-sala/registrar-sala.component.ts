import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registrar-sala',
  templateUrl: './registrar-sala.component.html',
  styleUrl: './registrar-sala.component.css',
  standalone: true,
  imports: [FormsModule]
})

export class RegistrarSalaComponent implements OnInit {

  sala : Sala = new Sala();

  constructor( private salaService: SalaService, private router:Router,
                private location:Location
  ) { }

  ngOnInit(): void {
    console.log("empleado init : " +this.sala);
  }

  guardarSala(){
    this.sala.state = 1;
     this.salaService.registrarSala(this.sala).subscribe(dato => {
      this.irALaListaDeSalas();
     }, error => console.log(error));
  }


  verDetallesDeSala(id:any){
    this.router.navigate(['dashboard','detalleSala',id]);
  }
  

  irALaListaDeSalas(){
    this.router.navigate(['dashboard','listarSalas']);
    Swal.fire('Sala registrada',`La sala ${this.sala.laboratorio} ha sido registrada con exito`,`success`);
  }

  onSubmit(){
    this.guardarSala();
    this.irALaListaDeSalas();
  }

  cancelar(): void {
    this.location.back();
  }
}
import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-sala',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-sala.component.html',
  styleUrl: './actualizar-sala.component.css'
})
export class ActualizarSalaComponent  implements OnInit {

  id:number;
  sala:Sala = new Sala();
  constructor(private salaService:SalaService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.salaService.obtenerSalaPorId(this.id).subscribe(dato =>{
      this.sala = dato['data'];
    },error => console.log(error));
  }

  irAlaListaDeSalas(){
    this.router.navigate(['dashboard','listarSalas']);
    Swal.fire('Empleado actualizado',`El empleado ${this.sala.nombre} ha sido actualizado con exito`,`success`);
  }

  onSubmit(){
    this.salaService.actualizarSala(this.id,this.sala).subscribe(dato => {
      this.irAlaListaDeSalas();
    },error => console.log(error));
  }
}

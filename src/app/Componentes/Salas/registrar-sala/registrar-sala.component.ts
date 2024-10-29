import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-sala',
  templateUrl: './registrar-sala.component.html',
  styleUrl: './registrar-sala.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class RegistrarSalaComponent implements OnInit {

  sala : Sala = new Sala();

  constructor( private salaService: SalaService, private router:Router) { }

  ngOnInit(): void {
    console.log("empleado init : " +this.sala);
  }

  guardarEmpleado(){
     this.salaService.registrarSala(this.sala).subscribe(dato => {
      this.irALaListaDeSalas();
     }, error => console.log(error));
  }

  irALaListaDeSalas(){
    this.router.navigate(['/listarSalas']);
  }

  onSubmit(){
    this.guardarEmpleado();
  }

}

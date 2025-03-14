import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-registrar-sala',
  templateUrl: './registrar-sala.component.html',
  styleUrl: './registrar-sala.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule]
})

export class RegistrarSalaComponent implements OnInit {

  sala: Sala = new Sala();

  constructor(private salaService: SalaService, private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.sala = new Sala();
    //this.sala.estado_laboratorio = 1;
  }

  guardarSala() {
    this.salaService.registrarSala(this.sala).subscribe({
      next: (dato) => {
        this.irALaListaDeSalas();
      },
      error: (err) => {
        console.error("Error al registrar la sala:", err);
        Swal.fire("Error", "Hubo un problema al guardar la sala. Inténtalo de nuevo.", "error");
      }
    });
  }


  verDetallesDeSala(id: any) {
    this.router.navigate(['dashboard', 'detalleSala', id]);
  }


  irALaListaDeSalas() {
    this.router.navigate(['dashboard', 'listarSalas']);
    Swal.fire('Sala registrada', `Registro guardado con exito`, `success`);
  }

  onSubmit(salaForm: any) {
    if (salaForm.invalid) {
      salaForm.form.markAllAsTouched();
      return;
    }

    this.guardarSala();
    this.irALaListaDeSalas();
  }


  cancelar(): void {
    this.location.back();
  }
}
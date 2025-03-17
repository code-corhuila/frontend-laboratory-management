import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-sala',
  templateUrl: './registrar-sala.component.html',
  styleUrl: './registrar-sala.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegistrarSalaComponent {
  @Input() mostrarModal: boolean = false; // Recibe el estado del modal
  @Output() modalCerrado = new EventEmitter<void>(); // Evento para cerrar

  sala: Sala = new Sala();

  constructor(private salaService: SalaService, private router: Router) {}

  guardarSala() {
    this.salaService.registrarSala(this.sala).subscribe({
      next: () => {
        this.irALaListaDeSalas();
      },
      error: (err) => {
        console.error("Error al registrar la sala:", err);
        Swal.fire("Error", "Hubo un problema al guardar la sala. Inténtalo de nuevo.", "error");
      }
    });
  }

  irALaListaDeSalas() {
    this.router.navigate(['dashboard', 'listarSalas']);
    Swal.fire('Sala registrada', `Registro guardado con éxito`, `success`);
  }

  onSubmit(salaForm: any) {
    if (salaForm.invalid) {
      salaForm.form.markAllAsTouched();
      return;
    }
    this.guardarSala();
  }

  cerrarModal() {
    this.modalCerrado.emit(); // Notifica al padre que debe cerrar el modal
  }
}

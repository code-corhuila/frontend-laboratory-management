import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../services/sala.service';
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
  @Output() salaGuardada = new EventEmitter<void>(); // Evento para notificar cuando la sala sea guardada


  sala: Sala = new Sala();


  constructor(private salaService: SalaService, private router: Router) {}

  guardarSala() {
    this.salaService.registrarSala(this.sala).subscribe({
      next: () => {
        this.irALaListaDeSalas();
        this.salaGuardada.emit(); // Emitir el evento después de guardar la sala
      },
      error: (err) => {
        console.error("Error al registrar la sala:", err);
        Swal.fire("Error", "Hubo un problema al guardar la sala. Inténtalo de nuevo.", "error");
      }
    });
  }

  irALaListaDeSalas() {
    this.cerrarModal();
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
    this.modalCerrado.emit();
  }
}

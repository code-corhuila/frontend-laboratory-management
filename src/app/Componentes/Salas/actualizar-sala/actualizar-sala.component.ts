import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../Services/sala.service';
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
export class ActualizarSalaComponent implements OnInit, OnChanges {

  @Input() idSala: number | null = null; // Recibe el ID de la sala desde el padre
  @Input() mostrarModal: boolean = false; // Recibe si el modal está abierto
  @Output() modalActualizarCerrado = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() salaActualizada = new EventEmitter<void>(); // 🔥 Evento para actualizar la lista en el padre

 

  sala: Sala = new Sala(); // Inicializamos la sala

  constructor(private salaService: SalaService) { }

  ngOnInit(): void {
    if (this.idSala) {
      this.cargarSala(this.idSala);
    }
  }

  // Detecta cambios en idSala cuando se abre el modal
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idSala'] && this.idSala !== null) {
      this.cargarSala(this.idSala);
    }
  }

  cargarSala(id: number) {
    this.salaService.obtenerSalaPorId(id).subscribe({
      next: (dato) => {
        this.sala = dato['data'];
        this.sala.estadoLaboratorio = +this.sala.estadoLaboratorio; // Convertir a número
      },
      error: (err) => console.log("Error al cargar la sala:", err)
    });
  }

  onSubmit() {
    if (!this.idSala) {
      console.error("ID de la sala no válido");
      return;
    }

    this.salaService.actualizarSala(this.idSala, this.sala).subscribe({
      next: () => {
        Swal.fire('Registro actualizado', `El registro ha sido actualizado con éxito`, 'success');
        this.salaActualizada.emit(); // 🔥 Notifica al padre que se actualizó una sala
        this.cerrarModalActualizar();
      },
      error: (err) => {
        console.error("Error al actualizar el registro:", err);
        Swal.fire("Error", "Hubo un problema al actualizar el registro. Inténtalo de nuevo.", "error");
      }
    });
  }


  cerrarModalActualizar() {
    this.modalActualizarCerrado.emit(); // Notifica al padre que debe cerrar el modal
  }
}

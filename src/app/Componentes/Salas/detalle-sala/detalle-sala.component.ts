import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { SalaService } from '../../../services/sala.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-sala',
  standalone: true,
  templateUrl: './detalle-sala.component.html',
  styleUrl: './detalle-sala.component.css'
})
export class DetalleSalaComponent implements OnInit, OnChanges {

  @Input() mostrarModal: boolean = false; // Estado del modal
  @Output() modalCerrado = new EventEmitter<void>(); // Evento para cerrar el modal

  @Input() idSala: number | null = null; // Recibe el ID de la sala desde el padre

  sala: Sala | null = null; // Inicializamos la variable de la sala

  constructor(private salaService: SalaService) { }

  ngOnInit(): void {
    if (this.idSala) {
      this.cargarDetalles(this.idSala);
    }
  }

  // Detecta cuando cambia el ID de la sala
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idSala'] && this.idSala !== null) {
      this.cargarDetalles(this.idSala);
    }
  }

  cargarDetalles(id: number) {
    this.salaService.obtenerSalaPorId(id).subscribe({
      next: (data) => {
        this.sala = data['data']; // Ajustamos para acceder correctamente a los datos
      },
      error: (err) => {
        console.error("Error al obtener los detalles de la sala:", err);
      }
    });
  }

  obtenerEstadoOcupacional(estadoOcupacional: any): string {
    return estadoOcupacional == false ? 'Fuera de servicio' : 'Habilitado';
  }



  cerrarModalDetalle() {
    this.modalCerrado.emit(); // Notifica al padre que debe cerrar el modal
  }
}

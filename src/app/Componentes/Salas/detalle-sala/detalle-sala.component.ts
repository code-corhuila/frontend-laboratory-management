import { Component, OnInit } from '@angular/core';
import { Sala } from '../../../clases/sala';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../../../Services/sala.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-sala',
  standalone: true,
  imports: [],
  templateUrl: './detalle-sala.component.html',
  styleUrl: './detalle-sala.component.css'
})
export class DetalleSalaComponent implements OnInit {

  id: number;
  sala: Sala;
  constructor(private route: ActivatedRoute,
    private salaService: SalaService,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sala = new Sala();
    this.salaService.obtenerSalaPorId(this.id).subscribe(dato => {
      this.sala = dato['data'];
      Swal.fire({
        title: `Detalles: ${this.sala.laboratorio}`,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#28a745', // color gris
        background: '#f8f9fa',
        customClass: {
          title: 'swal-title',
        }
      });;
    })
  }

  obtenerEstadoOcupacional(estadoOcupacional: number): string {
    return estadoOcupacional === 1 ? 'No disponible' : 'Disponible';
  }

  cerrar(): void {
    this.location.back();
  }

}

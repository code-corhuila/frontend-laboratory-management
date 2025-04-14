import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../../calendario/calendario.component';
import { RouterModule } from '@angular/router';
import { ListarSalasComponent } from '../../Salas/listar-salas/listar-salas.component';
import { AprobacionesComponent } from '../aprobaciones/aprobaciones.component';

@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [CommonModule, CalendarioComponent,RouterModule, ListarSalasComponent, AprobacionesComponent],
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})
export class AgendamientoComponent { 
  rolUsuario: string = '';
  

  vistaActual: string = 'calendario'; // Por defecto, muestra el calendario

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }
  
}

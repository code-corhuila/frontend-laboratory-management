import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../../services/inventario.service';

interface Equipo {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  codigoIdentificacion: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  costo: number;
}

interface Inventario {
  id: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
  equipo: Equipo;
  cantidadDisponible: number;
  disponibilidad: boolean;
  fechaAdquisicion: string;
  observaciones: string;
  costo: number;
}

@Component({
  selector: 'app-listar-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css']  // Corregido styleUrls
})
export class ListarInventarioComponent implements OnInit {
  inventarios: Inventario[] = [];  // Modificado para manejar múltiples inventarios

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.getInventarios().subscribe(response => {
      console.log(response.data)
      if (response.status) {
        this.inventarios = response.data;
      }
    });
  }
}


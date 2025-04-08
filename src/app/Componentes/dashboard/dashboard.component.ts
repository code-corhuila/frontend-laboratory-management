import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})

export class DashboardComponent implements OnInit {

  rolUsuario: string = '';
  alertas: any[] = [];
  showDropdown = false;
  dropdownVisibleUser = false; 
  mostrarRR = false;

  currentDate = new Date().toLocaleDateString(); // Fecha actual

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertaService: AlertaService,
  ) {
    this.currentDate = new Date().toLocaleDateString();
  }

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
    this.cargarAlertas();
  }


  cargarAlertas(): void {
    this.alertaService.obtenerAlertasActivas().subscribe((data) => {
      this.alertas = data;
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  mostras(): void {
    this.mostrarRR = !this.mostrarRR;
  }

  toggleDropdownUser(): void {
    console.log("jjjj");
    this.dropdownVisibleUser = !this.dropdownVisibleUser;
    console.log("dropdownVisibleUser:", this.dropdownVisibleUser);
  }

  marcarAlertaComoAtendida(alerta: any, index: number): void {
    const alertaActualizada = {
      ...alerta,
      estadoAlerta: true
    };
    this.alertaService.marcarComoAtendida(alerta.id, alertaActualizada).subscribe(() => {
      // Remover la alerta de la lista después de atenderla
      this.alertas = this.alertas.filter(a => a.id !== alerta.id);
      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Notificacion leida",
        showConfirmButton: false,
        timer: 800
      });
      this.showDropdown = false;

      // Elimina la alerta de la lista local
      //this.alertas.splice(index, 1);
      // Si no quedan alertas, cierra el dropdown
      //if (this.alertas.length === 0) {
       // this.showDropdown = false;
      //}
    });
  }

  cerrarSesion() {
    const confirmacion = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmacion) {
      this.afAuth.signOut().then(() => {
        localStorage.clear(); // o solo removeItem de lo necesario
        this.router.navigate(['']);
      }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
    }
  }
  

}

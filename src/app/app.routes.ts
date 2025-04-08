import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard de autenticación
import { FormsModule } from '@angular/forms';

export const routes: Routes = [

  // Ruta para el login
  { 
    path: 'login', 
    component: LoginComponent 
  },
  // Redirige la ruta vacía a /login
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege esta ruta con el guard de autenticación
    children: [
      { path: 'agendamiento', loadComponent: () => import('./Componentes/AgendamientoSalas/agendamiento/agendamiento.component').then(m => m.AgendamientoComponent) },
      { path: 'inventario', loadComponent: () => import('./Componentes/Inventarios/listar-inventario/listar-inventario.component').then(m => m.ListarInventarioComponent) },
      { path: 'usuarios', loadComponent: () => import('./Componentes/Usuarios/listar-usuarios/listar-usuarios.component').then(m => m.ListarUsuariosComponent) },
      { path: 'asistencia', loadComponent: () => import('./Componentes/Asistencia/listar-asistencia/listar-asistencia.component').then(m => m.ListarAsistenciaComponent) },
      { path: 'reporte', loadComponent: () => import('./Componentes/Reportes/listar-reporte/listar-reporte.component').then(m => m.ListarReporteComponent) },
      { path: 'agendarNuevaSala', loadComponent: () => import('./Componentes/AgendamientoSalas/agendar-nueva-sala/agendar-nueva-sala.component').then(m => m.AgendarNuevaSalaComponent) },
      { path: 'verDetalle', loadComponent: () => import('./Componentes/AgendamientoSalas/ver-detalle/ver-detalle.component').then(m => m.VerDetalleComponent) },
      { path: 'crearUsuario', loadComponent: () => import('./Componentes/Usuarios/crear-usuario/crear-usuario.component').then(m => m.CrearUsuarioComponent) },
      { path: 'detallesUsuario', loadComponent: () => import('./Componentes/Usuarios/detalles-usuario/detalles-usuario.component').then(m => m.DetallesUsuarioComponent) },
      { path: 'listarSalas', loadComponent: () => import('./Componentes/Salas/listar-salas/listar-salas.component').then(m => m.ListarSalasComponent) },
      { path: 'registrarSala', loadComponent: () => import('./Componentes/Salas/registrar-sala/registrar-sala.component').then(m => m.RegistrarSalaComponent) },
      { path: 'actualizarSala/:id', loadComponent: () => import('./Componentes/Salas/actualizar-sala/actualizar-sala.component').then(m => m.ActualizarSalaComponent) },
      { path: 'detalleSala/:id', loadComponent: () => import('./Componentes/Salas/detalle-sala/detalle-sala.component').then(m => m.DetalleSalaComponent) },
      { path: 'calendario', loadComponent: () => import('./Componentes/calendario/calendario.component').then(m => m.CalendarioComponent)},
      { path: 'listarMantenimientos', loadComponent: () => import('./Componentes/Mantenimientos/listar-mantenimientos/listar-mantenimientos.component').then(m => m.ListarMantenimientosComponent) },
    ],
  },
  //{ path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida al LoginComponent
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

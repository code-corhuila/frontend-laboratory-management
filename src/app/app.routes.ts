import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard de autenticación

export const routes: Routes = [
  { path: '', component: LoginComponent },
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
      { path: 'mantenimientos', loadComponent: () => import('./Componentes/Mantenimientos/listar-mantenimientos/listar-mantenimientos.component').then(m => m.ListarMantenimientosComponent) },
      { path: 'agendarNuevaSala', loadComponent: () => import('./Componentes/AgendamientoSalas/agendar-nueva-sala/agendar-nueva-sala.component').then(m => m.AgendarNuevaSalaComponent) },
      { path: 'verDetalle', loadComponent: () => import('./Componentes/AgendamientoSalas/ver-detalle/ver-detalle.component').then(m => m.VerDetalleComponent) },
      { path: 'crearUsuario', loadComponent: () => import('./Componentes/Usuarios/crear-usuario/crear-usuario.component').then(m => m.CrearUsuarioComponent) },
      { path: 'detallesUsuario', loadComponent: () => import('./Componentes/Usuarios/detalles-usuario/detalles-usuario.component').then(m => m.DetallesUsuarioComponent) },
      { path: 'listarSalas', loadComponent: () => import('./Componentes/Salas/listar-salas/listar-salas.component').then(m => m.ListarSalasComponent) },
      { path: 'actualizarSala', loadComponent: () => import('./Componentes/Salas/actualizar-sala/actualizar-sala.component').then(m => m.ActualizarSalaComponent) },

    ],
  },
  { path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida al LoginComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard de autenticación

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege esta ruta con el guard de autenticación
    children: [
      { path: 'agendamiento', loadComponent: () => import('./agendamiento/agendamiento.component').then(m => m.AgendamientoComponent) },
      { path: 'inventario', loadComponent: () => import('./inventario/inventario.component').then(m => m.InventarioComponent) },
      { path: 'usuarios', loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent) },
      { path: 'asistencia', loadComponent: () => import('./asistencia/asistencia.component').then(m => m.AsistenciaComponent) },
      { path: 'reporte', loadComponent: () => import('./reporte/reporte.component').then(m => m.ReporteComponent) },
      { path: 'mantenimientos', loadComponent: () => import('./mantenimientos/mantenimientos.component').then(m => m.MantenimientosComponent) },
    ],
  },
  { path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida al LoginComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

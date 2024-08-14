import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   //Obtiene listado de usuario
   private baseURL = "http://localhost:8080/api/actividades";

   constructor( private httpClient : HttpClient) { }
 
   //Obtenemos las usuario
   obtenerListaDeActividades():Observable<Usuario[]>{
     return this.httpClient.get<Usuario[]>(`${this.baseURL+'/listar'}`)
   }

   //Metodo para registrar Usuario
   registrarUsuario(usuario:Usuario): Observable<Object>{
     return this.httpClient.post(`${this.baseURL+'/guardar'}`,usuario);
   }

   //Metodo para actualizar Usuario
   actualizarUsuario(id:number,usuario:Usuario) : Observable<Object>{
     return this.httpClient.put(`${this.baseURL}/${id}`,usuario);
   }

   
   //Metodo para obtener o buscar una Usuario
   obtenerUsuarioPorId(id:number):Observable<Usuario>{
     return this.httpClient.get<Usuario>(`${this.baseURL}/${id}`);
   }

   //metodo para eliminar una Usuario
   eliminarUsuario(id:number):Observable<Object>{
     return this.httpClient.delete(`${this.baseURL}/${id}`);
   }

}

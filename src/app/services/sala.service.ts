import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sala } from '../clases/sala';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

   //Obtiene listado de usuario
   private baseURL = "http://localhost:9002/api/sala";

   constructor( private httpClient : HttpClient) { }
 
   //Obtenemos las clases
   obtenerListaDeSalas():Observable<Sala[]>{
     console.log("obtener salas en servicio");
     return this.httpClient.get<Sala[]>(`${this.baseURL}`)
   }

   //Metodo para registrar sala
   registrarSala(sala:Sala): Observable<Object>{
     return this.httpClient.post(`${this.baseURL}`,sala);
   }

   //Metodo para actualizar sala
   actualizarSala(id:number,sala:Sala) : Observable<Object>{
     return this.httpClient.put(`${this.baseURL}/${id}`,sala);
   }

   
   //Metodo para obtener o buscar una Usuario
   obtenerSalaPorId(id:any):Observable<Sala>{
     return this.httpClient.get<Sala>(`${this.baseURL}/${id}`);
   }

   //metodo para eliminar una Usuario
   eliminarSala(id:number):Observable<Object>{
     return this.httpClient.delete(`${this.baseURL}/${id}`);
   }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Clientes, Cliente } from '../interfaces/clientes.interface';
import { NuevoCliente } from '../interfaces/nuevoCliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesServicesService {
  private baseUrl = 'https://crud-sergio.herokuapp.com/api/clientes'
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjY5N2NiZTAwNTA2MTM5YzkzY2MyYjYiLCJpYXQiOjE2NTIwNTY2MDYsImV4cCI6MTY1MjE0MzAwNn0.vZFuudm0dGjXxsriu-5DM6HNc7rd48aPA7bLsDO5C9s'

  constructor( private http: HttpClient) { }

  obtenerClientes(){
    const headers = new HttpHeaders()
      .set('x-token', this.token);
    return this.http.get<Clientes>(`${ this.baseUrl }`, {headers} )
  }

  mostrarClienteId( id:string ){
    const headers = new HttpHeaders()
    .set('x-token', this.token);
  
    return this.http.get<NuevoCliente>(`${ this.baseUrl }/${ id }`, {headers} )
  }



  crearCliente( cliente:Cliente )  {

  const headers = new HttpHeaders()
    .set('x-token', this.token);
  
  return this.http.post<NuevoCliente>(`${ this.baseUrl }`,cliente, {headers} )
        .pipe(
          map( resp => true ),
          catchError ( err => of(err.error.errors.msg))
        )
  }

  actualizarCliente( cliente:Cliente, id:string )  {

    const headers = new HttpHeaders()
      .set('x-token', this.token);
    
    return this.http.put<NuevoCliente>(`${ this.baseUrl }/${ id }`,cliente, {headers} )
          .pipe(
            map( resp => true ),
            catchError ( err => of(err.error.errors.msg))
          )
    }


  eliminarCliente(id:string){
    const headers = new HttpHeaders()
    .set('x-token', this.token);
  
    return this.http.delete<NuevoCliente>(`${ this.baseUrl }/${ id }`, {headers} )

  }




}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Clientes, Cliente } from '../interfaces/clientes.interface';
import { NuevoCliente } from '../interfaces/nuevoCliente.interface';


interface Token {
  data: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClientesServicesService {


  private baseUrl = 'https://crud-sergio.herokuapp.com/api/clientes'
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjY5N2RlNjdiZTI3Nzg4MTczZjNlZTEiLCJpYXQiOjE2NTIwNjM3OTl9.SLI0gQQUsLNjuFPik2xa73m7JICINRw2pZR1MV6OtOo'

  constructor( private http: HttpClient) {
      this.http.post<Token>('https://crud-sergio.herokuapp.com/api/clientes/token',{id:"62697de67be27788173f3ee1"})
      // this.http.post<Token>('http://localhost:3000/api/clientes/token', {id:"62697de67be27788173f3ee1"})
          .subscribe( (token: Token) => this.token = token.data )
    }

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
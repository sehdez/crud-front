import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesServicesService } from '../../services/clientes-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { switchMap, tap } from 'rxjs';
import { NuevoCliente, Data } from '../../interfaces/nuevoCliente.interface';
import { Cliente } from '../../interfaces/clientes.interface';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente!: Cliente;

  constructor( private clientesServices: ClientesServicesService,
                private fb:FormBuilder ,
                private router: Router,
                private activatedRouter: ActivatedRoute) 
  {              
    this.activatedRouter.params
    .pipe(
      switchMap( ({ id }) => this.clientesServices.mostrarClienteId( id ) )
    )
    .subscribe( (cliente: NuevoCliente) => {
      this.cargarFormulario( cliente.data );
      this.cliente = cliente.data;
    } );  
                }


  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";  

  miFormulario!: FormGroup;


  cargarFormulario( cliente: Data ){
    this.miFormulario  = this.fb.group({
      nombres         :[cliente.nombres, [Validators.required, Validators.minLength(3)]],
      apellidoPaterno :[cliente.apellidoPaterno, [Validators.required, Validators.minLength(3)]],
      apellidoMaterno :[cliente.apellidoMaterno, [Validators.required, Validators.minLength(3)]],
      domicilio       :[cliente.domicilio, [Validators.required, Validators.minLength(3)]],
      email           :[cliente.email, [Validators.required, Validators.minLength(3), Validators.pattern( this.emailPattern )]],

})

  }


  ngOnInit(): void {

  }

  actualizarCliente(){
    this.clientesServices.actualizarCliente(this.miFormulario.value, this.cliente.id)
    .subscribe( (res) => {    
    if( res === true ){
    this.router.navigateByUrl('../')
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: res,
      })
    }
    })
  }

}

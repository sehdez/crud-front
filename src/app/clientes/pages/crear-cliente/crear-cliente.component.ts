import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesServicesService } from '../../services/clientes-services.service';
import {  NuevoCliente } from '../../interfaces/nuevoCliente.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  constructor( private clientesServices: ClientesServicesService,
                private fb:FormBuilder ,
                private router: Router) { }


  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";                
  miFormulario: FormGroup = this.fb.group({
    nombres:['', [Validators.required, Validators.minLength(3)]],
    apellidoPaterno:['', [Validators.required, Validators.minLength(3)]],
    apellidoMaterno:['', [Validators.required, Validators.minLength(3)]],
    domicilio:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.minLength(3), Validators.pattern( this.emailPattern )]],

  })

  ngOnInit(): void {
  }

  crearCliente(){

    this.clientesServices.crearCliente(this.miFormulario.value)
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

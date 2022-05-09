import { Component, OnInit } from '@angular/core';
import { Clientes, Cliente } from '../../interfaces/clientes.interface';
import { ClientesServicesService } from '../../services/clientes-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  constructor( private clientesServices:ClientesServicesService ) { 
    this.cargando= true;
   }

  clientes!: Cliente[];
  clientesTotales = 0;
  hayClientes = true;
  cargando!:boolean;

  ngOnInit(): void {
    this.cargarClientes();
            
  }

  cargarClientes(){
    this.cargando = true;
    this.clientesServices.obtenerClientes()
        .subscribe( (clientes:Clientes) => {
            this.clientes = clientes.data.clientes;
            this.clientesTotales = clientes.data.clientesTotales;
            this.clientes.shift();
            this.cargando = false;
            if ( this.clientes.length === 0 ){
              this.hayClientes = false;
            }
        })
  }

  eliminar( id: string, index: number ){
    const cliente = this.clientes[index];
    Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${cliente.nombres}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, lo quiero eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesServices.eliminarCliente(id)
            .subscribe();
        this.cargarClientes();

        Swal.fire(
          'Registro eliminado',
          'No volverá a mostar ese cliente'
        )
      }
    })
  }


}

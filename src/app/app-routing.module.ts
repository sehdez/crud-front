import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './clientes/pages/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './clientes/pages/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/pages/editar-cliente/editar-cliente.component';

const routes: Routes = [
  {path: '', component:ListarClientesComponent},
  {path: 'crear',  component :CrearClienteComponent},
  {path: 'editar/:id', component :EditarClienteComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

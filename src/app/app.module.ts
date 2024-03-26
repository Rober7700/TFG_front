import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { PrendasComponent } from './prendas/prendas.component';
import { CrearPrendaComponent } from './prendas/crear-prenda/crear-prenda.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/crearCliente', component: CrearClienteComponent },
  { path: 'clientes/crearCliente/:id', component: CrearClienteComponent },
  
  { path: 'prendas', component: PrendasComponent },
  { path: 'prendas/page/:page', component: PrendasComponent },
  { path: 'prendas/crearPrenda', component: CrearPrendaComponent },
  { path: 'prendas/crearPrenda/:id', component: CrearPrendaComponent },

  { path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    HomeComponent,
    CrearClienteComponent,
    PaginatorComponent,
    PrendasComponent,
    CrearPrendaComponent,
    DetalleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

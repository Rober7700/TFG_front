import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { PrendasComponent } from './prendas/prendas.component';
import { CrearPrendaComponent } from './prendas/crear-prenda/crear-prenda.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AuthorizedComponent } from './authorized/authorized.component';
import { ResourceInterceptor } from './interceptors/resource.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import { RopaComponent } from './ropa/ropa.component';
import { ZapatosComponent } from './zapatos/zapatos.component';
import { JoyasComponent } from './joyas/joyas.component';
import { CinturonesComponent } from './cinturones/cinturones.component';
import { BolsosComponent } from './bolsos/bolsos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FinPedidoComponent } from './fin-pedido/fin-pedido.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { ArchivadorComponent } from './archivador/archivador.component';
import { authGuard } from './guards/auth.guard';
import { DataTablesModule} from 'angular-datatables';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'authorized', component: AuthorizedComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'ropa', component: RopaComponent },
  { path: 'zapatos', component: ZapatosComponent },
  { path: 'joyas', component: JoyasComponent },
  { path: 'cinturones', component: CinturonesComponent },
  { path: 'bolsos', component: BolsosComponent },

  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
  { path: 'clientes/page/:page', component: ClientesComponent, canActivate: [authGuard] },
  { path: 'clientes/crearCliente', component: CrearClienteComponent, canActivate: [authGuard] },
  { path: 'clientes/crearCliente/:id', component: CrearClienteComponent, canActivate: [authGuard] },

  { path: 'prendas', component: PrendasComponent, canActivate: [authGuard] },
  { path: 'prendas/page/:page', component: PrendasComponent, canActivate: [authGuard] },
  { path: 'prendas/crearPrenda', component: CrearPrendaComponent, canActivate: [authGuard] },
  { path: 'prendas/crearPrenda/:id', component: CrearPrendaComponent, canActivate: [authGuard] },

  { path: 'archivador', component: ArchivadorComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'finPedido', component: FinPedidoComponent, canActivate: [authGuard] },
  { path: 'misPedidos', component: MisPedidosComponent, canActivate: [authGuard] }];

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
    AuthorizedComponent,
    AdminComponent,
    UserComponent,
    LogoutComponent,
    RopaComponent,
    ZapatosComponent,
    JoyasComponent,
    CinturonesComponent,
    BolsosComponent,
    CarritoComponent,
    FinPedidoComponent,
    MisPedidosComponent,
    ArchivadorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

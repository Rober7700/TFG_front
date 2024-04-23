import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { PrendasComponent } from './prendas/prendas.component';
import { CrearPrendaComponent } from './prendas/crear-prenda/crear-prenda.component';
import { DetalleComponent } from './detalles/detalle/detalle.component';
import { AuthorizedComponent } from './authorized/authorized.component';
import { ResourceInterceptor } from './interceptors/resource.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import { ZapatosComponent } from './almacen/zapatos/zapatos.component';
import { JoyasComponent } from './almacen/joyas/joyas.component';
import { CinturonesComponent } from './almacen/cinturones/cinturones.component';
import { BolsosComponent } from './almacen/bolsos/bolsos.component';
import { CarritoComponent } from './checkout/carrito/carrito.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { ArchivadorComponent } from './archivador/archivador.component';
import { authGuard } from './guards/auth.guard';
import { DataTablesModule} from 'angular-datatables';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { EscaparateHomeComponent } from './home/escaparate-home/escaparate-home.component';
import { ProductoHomeComponent } from './home/escaparate-home/producto-home/producto-home.component';
import { RopaTallaSComponent } from './almacen/ropas/ropa-talla-s/ropa-talla-s.component';
import { RopaTallaMComponent } from './almacen/ropas/ropa-talla-m/ropa-talla-m.component';
import { RopaTallaLComponent } from './almacen/ropas/ropa-talla-l/ropa-talla-l.component';
import { ProductoComponent } from './almacen/producto/producto.component';
import { DetalleAdminComponent } from './detalles/detalle-admin/detalle-admin.component';
import { PagoConfirmadoComponent } from './checkout/pago-confirmado/pago-confirmado.component';
import { CarritoProductoComponent } from './checkout/carrito/carrito-producto/carrito-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchivadorProductoComponent } from './archivador/archivador-producto/archivador-producto.component';
import { HeartButtonComponent } from './utils/heart-button/heart-button.component';
import { BodyComponent } from './body/body.component';
import { SublevelMenuComponent } from './sidebar/header-utils/sublevel-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxStripeModule } from 'ngx-stripe';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'authorized', component: AuthorizedComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'collection/ropa/tallaS', component: RopaTallaSComponent },
  { path: 'collection/ropa/tallaM', component: RopaTallaMComponent },
  { path: 'collection/ropa/tallaL', component: RopaTallaLComponent },
  
  { path: 'collection/detalles/:id', component: DetalleComponent },

  { path: 'collection/zapatos', component: ZapatosComponent },
  { path: 'collection/joyas', component: JoyasComponent },
  { path: 'collection/cinturones', component: CinturonesComponent },
  { path: 'collection/bolsos', component: BolsosComponent },

  { path: 'prendas', component: PrendasComponent, canActivate: [authGuard] },
  { path: 'prendas/crearPrenda', component: CrearPrendaComponent, canActivate: [authGuard] },
  { path: 'prendas/crearPrenda/:id', component: CrearPrendaComponent, canActivate: [authGuard] },

  { path: 'archivador', component: ArchivadorComponent, canActivate: [authGuard] },
  { path: 'pago/finalizado', component: PagoConfirmadoComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard]},
  { path: 'pago-confirmado', component: PagoConfirmadoComponent, canActivate: [authGuard] },
  { path: 'misPedidos', component: MisPedidosComponent, canActivate: [authGuard] }];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PrendasComponent,
    CrearPrendaComponent,
    DetalleComponent,
    AuthorizedComponent,
    AdminComponent,
    UserComponent,
    LogoutComponent,
    ZapatosComponent,
    JoyasComponent,
    CinturonesComponent,
    BolsosComponent,
    CarritoComponent,
    MisPedidosComponent,
    ArchivadorComponent,
    EscaparateHomeComponent,
    ProductoHomeComponent,
    RopaTallaSComponent,
    RopaTallaMComponent,
    RopaTallaLComponent,
    ProductoComponent,
    DetalleAdminComponent,
    PagoConfirmadoComponent,
    CarritoProductoComponent,
    ArchivadorProductoComponent,
    HeartButtonComponent,
    BodyComponent,
    SublevelMenuComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    DataTablesModule,
    CarouselModule.forRoot(),
    NgxStripeModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

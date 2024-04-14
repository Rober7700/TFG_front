import { Component } from '@angular/core';
import { CarritoService } from '../core/services/carrito.service';
import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent {
  
  misPedidos: any;
  isAdmin:boolean;

  constructor(private carritoService: CarritoService, private tokenService:TokenService){}

  ngOnInit(){
    this.getPedidos();
  }

  getPedidos() {
    this.isAdmin = this.tokenService.isAdmin();
    if (this.isAdmin) {
      this.carritoService.getAllPedidos().subscribe((res) => {
        this.misPedidos = res;
        console.log(res);
      })
    } else {
      this.carritoService.getPedidos().subscribe((res) => {
        this.misPedidos = res;
        console.log(res);
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../core/services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-confirmado',
  templateUrl: './pago-confirmado.component.html',
  styleUrl: './pago-confirmado.component.css'
})
export class PagoConfirmadoComponent implements OnInit{

  pedido: any = {};

  constructor(private carritoService: CarritoService, private router:Router){
    this.pedido.metodoPago = "Stripe"
  }

  ngOnInit(): void {
    this.carritoService.finalizarPedido(this.pedido).subscribe((res) => {
      this.router.navigate(['']);
    })
  }
}

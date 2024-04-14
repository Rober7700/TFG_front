import { Component } from '@angular/core';
import { CarritoService } from '../core/services/carrito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-pedido',
  templateUrl: './fin-pedido.component.html',
  styleUrl: './fin-pedido.component.css'
})
export class FinPedidoComponent {
  pedido = {
    direccion: '',
    descripcion: '',
    metodoPago: ''
  };

  constructor(private carritoService: CarritoService, private router:Router){}

  finalizarPedido() {
    console.log('Formulario enviado:', this.pedido);
    this.carritoService.finalizarPedido(this.pedido).subscribe((res) => {
      Swal.fire('Pedido Realizado', ``, 'success')
      this.router.navigate(['']);
    })
  }3
}

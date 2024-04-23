import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Carrito } from '../../../core/classes/carrito';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-carrito-producto',
  templateUrl: './carrito-producto.component.html',
  styleUrl: './carrito-producto.component.css'
})
export class CarritoProductoComponent {
  @Input() carrito:Carrito
  @Output() productoEliminado: EventEmitter<number> = new EventEmitter<number>();

  constructor(private carritoService: CarritoService) { }

  ngOnInit(){
    console.log("product", this.carrito);
  }

  primeraFoto(carrito: Carrito): string {
    if (carrito && carrito.imagenes && carrito.imagenes.length > 0) {
      return `http://localhost:8080/almacen/prendas/img/${carrito.imagenes[0]}`;
    } else {
      return 'http://localhost:8080/img/IconoMas.png';
    }
  } 

  delete(prendaId: number) {
    this.carritoService.quitarPrendaCarrito(prendaId).subscribe((res) => {
      this.productoEliminado.emit(prendaId);
      console.log(res); 
    })
  }
}

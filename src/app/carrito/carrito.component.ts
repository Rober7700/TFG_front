import { Component } from '@angular/core';
import { CarritoService } from '../core/services/carrito.service';
import { ModalService } from '../core/services/modal.service';
import { Prenda } from '../core/classes/prenda';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  total: number;
  carritoPrendas: any = [];
  listaVacia: boolean;

  constructor(private carritoService: CarritoService, private modalService: ModalService) { }

  ngOnInit() {
    this.getCarrito();
  }

  getCarrito() {
    this.carritoService.getPrendaAlCarrito().subscribe((res) => {
      this.carritoPrendas = res.carritoItemDtoList;
      this.total = res.total;
      if (this.carritoPrendas.length === 0) {
        this.listaVacia = true;
        console.log('El carrito de prendas está vacío');
      } else {
        this.listaVacia = false;
        console.log('El carrito de prendas NO está vacío');
      }
    })
  }

  delete(prendaId: number) {
    this.carritoService.quitarPrendaCarrito(prendaId).subscribe((res) => {
      console.log(res);
      this.getCarrito();
    })
  }

}

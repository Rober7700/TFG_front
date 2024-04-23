import { Component } from '@angular/core';
import { CarritoService } from '../../core/services/carrito.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { Carrito } from '../../core/classes/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  carritoPrendas: any = [];
  listaVacia: boolean;
  precioOriginal: number;
  precioConDescuento: number;
  descuento: number;

  constructor(private carritoService: CarritoService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getCarrito();
  }

  getCarrito() {
    this.carritoService.getPrendaAlCarrito().subscribe((res) => {
      console.log(res)
      this.carritoPrendas = res.carritoItemDtoList;
      this.precioOriginal = res.precioOriginal;
      this.precioConDescuento = res.precioConDescuento;
      this.descuento = this.precioOriginal - this.precioConDescuento;
      if (this.carritoPrendas.length === 0) {
        this.listaVacia = true;
        console.log('El carrito de prendas está vacío');
      } else {
        this.listaVacia = false;
        console.log('El carrito de prendas NO está vacío');
      }
    })
  }
  /*
  navigateToCheckout(){
    this.router.navigate(["/checkout"])
  }*/

  primeraFoto(carrito: Carrito): string {
    if (carrito && carrito.imagenes && carrito.imagenes.length > 0) {
      return `http://localhost:8080/almacen/prendas/img/${carrito.imagenes[0]}`;
    } else {
      return 'http://localhost:8080/img/IconoMas.png';
    }
  } 

  navigateToCheckout() {

    const items = this.carritoPrendas.map((prenda: any) => ({
      nombre: prenda.nombre,
      precioConDescuento: prenda.precioConDescuento,
      imagen: this.primeraFoto(prenda)
    }));
    console.log(items);
    this.http.post('http://localhost:4242/checkout', {items}).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51P8eltIQn0K4OEAqR9DCf3BZ4h61XBkQ1IGsmdZePY9RHWqyUPZ9bPw3p7YwKvhIYkd5p5bkulnIbnYePyYy8Aab00Cb0DkRFt');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }

  productoEliminado(prendaId: number) {
    this.getCarrito();
  }

}

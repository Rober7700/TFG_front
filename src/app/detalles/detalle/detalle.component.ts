import { Component } from '@angular/core';
import { PrendaService } from '../../core/services/prenda.service';
import { TokenService } from '../../core/services/token.service';
import { CarritoService } from '../../core/services/carrito.service';
import { ArchivadorService } from '../../core/services/archivador.service';
import { Prenda } from '../../core/classes/prenda';
import { PrendaCompartidaService } from '../../core/services/prenda.compartida.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})

export class DetalleComponent {

  prenda: Prenda;
  imagenSeleccionada: string;
  isLogged: boolean;

  public isButtonHeartOn = false;
  public size: number = 100;

  constructor(private prendaService: PrendaService, private tokenService: TokenService,
    private carritoService: CarritoService, private archivadorService: ArchivadorService,
    private prendaCompartidaService: PrendaCompartidaService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.isLogged = this.tokenService.isLogged()
    let storedPrendaJson = localStorage.getItem('prendaDetalles'); // Obtiene el objeto JSON almacenado
    if (storedPrendaJson) {
      let storedPrenda: Prenda = JSON.parse(storedPrendaJson); // Convierte el JSON a un objeto Prenda
      console.log(storedPrenda)
      this.prenda = storedPrenda;
      this.imagenSeleccionada = this.prenda.fotos[0];
    } else {
      this.prendaCompartidaService.prendaActual$.subscribe(prenda => {
        this.prenda = prenda;
        this.imagenSeleccionada = this.prenda.fotos[0];
      });
    }
  }
  

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  addCarrito(prendaId: number) {
    const addToCartButton = document.querySelector('.btn-add-to-cart') as HTMLButtonElement;
    addToCartButton.classList.add('cart-adding');
    this.carritoService.addPrendaAlCarrito(prendaId).subscribe({
      next: () => {
        setTimeout(() => {
          addToCartButton.classList.add('cart-added');
          addToCartButton.classList.remove('cart-adding');
        }, 2500);
  
        setTimeout(() => {
          addToCartButton.classList.remove('cart-added');
        }, 5000);
      },
      error: () => {
        setTimeout(() => {
          addToCartButton.classList.add('cart-failed');
          addToCartButton.classList.remove('cart-adding');
        }, 2500);
  
        setTimeout(() => {
          addToCartButton.classList.remove('cart-failed');
        }, 5000);
      }
    });
  }

  addArchivador(prendaId: number) {
    this.isButtonHeartOn = !this.isButtonHeartOn;
    this.archivadorService.addPrendaAlArchivador(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

}

import { Component, Input } from '@angular/core';
import { Prenda } from '../../core/classes/prenda';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { CarritoService } from '../../core/services/carrito.service';
import { ArchivadorService } from '../../core/services/archivador.service';
import { PrendaCompartidaService } from '../../core/services/prenda.compartida.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  
  @Input() prenda:Prenda;
  isLogged: boolean;
  
  public isButtonHeartOn = false;
  public size: number = 50;

  constructor(private router:Router, private tokenService: TokenService, private carritoService: CarritoService,
    private archivadorService: ArchivadorService, private prendaCompartidaService: PrendaCompartidaService) { 
    this.isLogged = this.tokenService.isLogged()
  }

  
  verDetalle() {
    this.prendaCompartidaService.setPrenda(this.prenda);
    this.router.navigate([`collection/detalles/${this.prenda.id}`]);
  }
  
  addCarrito(prendaId: number) {
    console.log(prendaId);
    this.carritoService.addPrendaAlCarrito(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

  addArchivador(prendaId: number) {
    this.isButtonHeartOn = !this.isButtonHeartOn;
    this.archivadorService.addPrendaAlArchivador(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

}

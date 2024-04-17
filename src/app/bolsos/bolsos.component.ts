import { Component } from '@angular/core';
import { Prenda } from '../core/classes/prenda';
import { PrendaService } from '../core/services/prenda.service';
import { CarritoService } from '../core/services/carrito.service';
import { ArchivadorService } from '../core/services/archivador.service';
import { TokenService } from '../core/services/token.service';

const TIPO_PRENDA = 'BOLSO';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrl: './bolsos.component.css'
})
export class BolsosComponent {

  prendas: Prenda[];
  isLogged: boolean;

  constructor(private prendaService: PrendaService, private tokenService: TokenService, private carritoService: CarritoService, private archivadorService: ArchivadorService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.prendaService.getPrendasPorTipo(TIPO_PRENDA).subscribe(response => {
      this.prendas = response.data as Prenda[];
      console.log(response.data);
    });
  }

  addCarrito(prendaId:number) {
    this.carritoService.addPrendaAlCarrito(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

  addArchivador(prendaId:number) {
    this.archivadorService.addPrendaAlArchivador(prendaId).subscribe((res) => {
      console.log(res);
    })
  }
}

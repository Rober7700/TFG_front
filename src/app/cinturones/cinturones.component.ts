import { Component } from '@angular/core';
import { PrendaService } from '../core/services/prenda.service';
import { Prenda } from '../core/classes/prenda';
import { ModalService } from '../core/services/modal.service';
import { CarritoService } from '../core/services/carrito.service';
import { ArchivadorService } from '../core/services/archivador.service';

@Component({
  selector: 'app-cinturones',
  templateUrl: './cinturones.component.html',
  styleUrl: './cinturones.component.css'
})
export class CinturonesComponent {

  tipo: string = "CINTURON"
  prendas: Prenda[];

  constructor(private prendaService: PrendaService,
    private modalService: ModalService, private carritoService: CarritoService, private archivadorService: ArchivadorService) { }

  ngOnInit() {
    this.prendaService.getPrendasPorTipo(this.tipo).subscribe(response => {
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

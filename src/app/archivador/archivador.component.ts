import { Component } from '@angular/core';
import { ModalService } from '../core/services/modal.service';
import { ArchivadorService } from '../core/services/archivador.service';
import { CarritoService } from '../core/services/carrito.service';

@Component({
  selector: 'app-archivador',
  templateUrl: './archivador.component.html',
  styleUrl: './archivador.component.css'
})
export class ArchivadorComponent {
  total: number;
  archivadorPrendas: any = [];
  listaVacia: boolean;

  constructor(private archivadorService: ArchivadorService, private carritoService: CarritoService, private modalService: ModalService) { }

  ngOnInit() {
    this.getCarrito();
  }

  getCarrito() {
    this.archivadorService.getPrendaAlArchivador().subscribe((res) => {
      this.archivadorPrendas = res.prendaArchivadaDto;
      this.total = res.total;
      if (this.archivadorPrendas.length === 0) {
        this.listaVacia = true;
        console.log('El carrito de prendas está vacío');
      } else {
        this.listaVacia = false;
        console.log('El carrito de prendas NO está vacío');
      }
    })
  }

  delete(prendaId: number) {
    this.archivadorService.quitarPrendaArchivador(prendaId).subscribe((res) => {
      console.log(res);
      this.getCarrito();
    })
  }
  
  addCarrito(prendaId:number) {
    this.carritoService.addPrendaAlCarrito(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

}

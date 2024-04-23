import { Component } from '@angular/core';
import { ArchivadorService } from '../core/services/archivador.service';

@Component({
  selector: 'app-archivador',
  templateUrl: './archivador.component.html',
  styleUrl: './archivador.component.css'
})
export class ArchivadorComponent {
  archivadorPrendas: any = [];
  prendasSeleccionadas: any = [];
  listaVacia: boolean;

  constructor(private archivadorService: ArchivadorService) { }

  ngOnInit() {
    this.getArchivador();
  }

  getArchivador() {
    this.archivadorService.getPrendaAlArchivador().subscribe((res) => {
      this.archivadorPrendas = res.prendaArchivadaDto;
      this.prendasSeleccionadas = res.prendaArchivadaDto;
      if (this.archivadorPrendas.length === 0) {
        this.listaVacia = true;
        console.log('El carrito de prendas está vacío');
      } else {
        this.listaVacia = false;
        console.log('El carrito de prendas NO está vacío');
      }
    })
  }

  productoEliminado(prendaId: number) {
    this.getArchivador();
  }

  cambioOrdenPrecio(orden:boolean) {
    if (orden) {
      this.prendasSeleccionadas.sort((a, b) => a.precioConDescuento - b.precioConDescuento);
    } else {
      this.prendasSeleccionadas.sort((a, b) => b.precioConDescuento - a.precioConDescuento);
    }
  }

  // Método para cambiar el orden de las prendas por fecha
  cambioOrdenFecha(orden:boolean) {
    if (orden) {
      this.prendasSeleccionadas.sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
    } else {
      this.prendasSeleccionadas.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
    }
  }

}

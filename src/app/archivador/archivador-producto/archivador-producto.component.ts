import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archivador } from '../../core/classes/archivador';
import { Router } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';
import { PrendaCompartidaService } from '../../core/services/prenda.compartida.service';
import { PrendaService } from '../../core/services/prenda.service';
import { Prenda } from '../../core/classes/prenda';
import { ArchivadorService } from '../../core/services/archivador.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-archivador-producto',
  templateUrl: './archivador-producto.component.html',
  styleUrl: './archivador-producto.component.css'
})
export class ArchivadorProductoComponent {

  @Input() prenda: Archivador;
  @Output() prendaEliminada: EventEmitter<number> = new EventEmitter<number>();
  prendaActual: Prenda;

  constructor(private router: Router, private carritoService: CarritoService, private archivadorService: ArchivadorService,
    private prendaCompartidaService: PrendaCompartidaService, private prendaService: PrendaService) {
  }

  verDetalle() {
    this.prendaService.getPrenda(this.prenda.prendaId).subscribe((res) => {
      this.prendaActual = res.data;
      this.prendaCompartidaService.setPrenda(this.prendaActual);
      this.router.navigate([`collection/detalles/${this.prendaActual.id}`]);
    })
  }

  delete(prendaId: number) {
    this.archivadorService.quitarPrendaArchivador(prendaId).subscribe((res) => {
      this.prendaEliminada.emit(prendaId);
      console.log(res);
    });
  }

  addCarrito(prendaId: number) {
    this.carritoService.addPrendaAlCarrito(prendaId).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.delete(prendaId);
          return of(null);
        } else {
          console.error('Ocurrió un error al agregar la prenda al carrito:', error);
          return of(error); 
        }
      })
    ).subscribe((res) => {
      if (res !== null) {
        console.log('La prenda se agregó al carrito con éxito:', res);
      }
    });
  }
}



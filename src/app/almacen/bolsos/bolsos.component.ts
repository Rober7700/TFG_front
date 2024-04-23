import { Component } from '@angular/core';
import { Prenda } from '../../core/classes/prenda';
import { PrendaService } from '../../core/services/prenda.service';

const TIPO_PRENDA = 'BOLSO';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrl: './bolsos.component.css'
})
export class BolsosComponent {

  prendas: Prenda[];
  prendasSeleccionadas: Prenda[];

  constructor(private prendaService: PrendaService) { }

  ngOnInit() {
    this.mostrarTodo();
  }

  mostrarTodo(){
    this.prendaService.getPrendasPorTipo(TIPO_PRENDA).subscribe(response => {
      this.prendas = response.data as Prenda[];
      this.prendasSeleccionadas = response.data as Prenda[];
      console.log(response.data);
    });
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
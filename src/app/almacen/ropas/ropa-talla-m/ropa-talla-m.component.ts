import { Component } from '@angular/core';
import { PrendaService } from '../../../core/services/prenda.service';
import { Prenda } from '../../../core/classes/prenda';

@Component({
  selector: 'app-ropa-talla-m',
  templateUrl: './ropa-talla-m.component.html',
  styleUrl: './ropa-talla-m.component.css'
})
export class RopaTallaMComponent {

  prendasTallaM: Prenda[];
  prendasSeleccionadas: Prenda[];

  selectedType: string = "";
  previousSelectedType: string = "";

  tipoPrendaSeleccionado:boolean;

  constructor(private prendaService: PrendaService) { }

  ngOnInit() {
    this.mostrarTodo();
  }

  mostrarTodo() {
    this.prendaService.getPrendasPorTalla("M").subscribe((res) => {
      this.prendasTallaM = res.data;
      this.prendasSeleccionadas = res.data;
      console.log(this.prendasTallaM);
    });
  }

  handleClick(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    const tipoSeleccionado = target.value;

    event.stopPropagation();

    if (this.selectedType !== tipoSeleccionado) {

      if (this.previousSelectedType !== "") {
        document.getElementById(this.previousSelectedType)?.classList.remove('selected');
      }

      document.getElementById(type)?.classList.add('selected');

      this.previousSelectedType = this.selectedType;
      this.selectedType = tipoSeleccionado;

      if (tipoSeleccionado === 'ALL') {
        this.prendasSeleccionadas = this.prendasTallaM;
        this.tipoPrendaSeleccionado = false;
      } else {
        this.prendasSeleccionadas = this.prendasTallaM.filter(prenda => prenda.tipo.toString() === tipoSeleccionado);
        console.log("Mostrando prendas de tipo", tipoSeleccionado + ":", this.prendasSeleccionadas);
        this.tipoPrendaSeleccionado = true;
      }
    }
  }
  cambioOrdenPrecio(orden: boolean) {
    if (orden) {
      this.prendasSeleccionadas.sort((a, b) => a.precioConDescuento - b.precioConDescuento);
    } else {
      this.prendasSeleccionadas.sort((a, b) => b.precioConDescuento - a.precioConDescuento);
    }
  }

  // Método para cambiar el orden de las prendas por fecha
  cambioOrdenFecha(orden: boolean) {
    if (orden) {
      this.prendasSeleccionadas.sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
    } else {
      this.prendasSeleccionadas.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
    }
  }

}

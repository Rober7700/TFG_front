import { Component } from '@angular/core';
import { Prenda } from '../../../core/classes/prenda';
import { PrendaService } from '../../../core/services/prenda.service';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-ropa-talla-l',
  templateUrl: './ropa-talla-l.component.html',
  styleUrl: './ropa-talla-l.component.css'
})
export class RopaTallaLComponent {

  prendasTallaL: Prenda[];
  prendasSeleccionadas: Prenda[];

  selectedType: string = "";
  previousSelectedType: string = "";

  tipoPrendaSeleccionado:boolean;

  constructor(private prendaService: PrendaService) { }

  ngOnInit() {
    this.mostrarTodo()
  }

  mostrarTodo(){
    this.prendaService.getPrendasPorTalla("L").pipe(
      concatMap(resS => {
        return this.prendaService.getPrendasPorTalla("XL").pipe(
          // Combina los resultados de las dos llamadas en un solo array
          map(resXS => [...resS.data, ...resXS.data])
        );
      })
    ).subscribe((prendas: Prenda[]) => {
      this.prendasTallaL = prendas;
      this.prendasSeleccionadas = prendas;
      console.log(this.prendasTallaL);
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
        this.prendasSeleccionadas = this.prendasTallaL;
        this.tipoPrendaSeleccionado = false;
      } else {
        this.prendasSeleccionadas = this.prendasTallaL.filter(prenda => prenda.tipo.toString() === tipoSeleccionado);
        console.log("Mostrando prendas de tipo", tipoSeleccionado + ":", this.prendasSeleccionadas);
        this.tipoPrendaSeleccionado = true;
      }
    }
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


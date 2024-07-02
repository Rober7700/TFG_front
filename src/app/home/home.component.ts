import { Component } from '@angular/core';
import { Prenda } from '../core/classes/prenda';
import { PrendaService } from '../core/services/prenda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  prendasEscaparate: Prenda[];
  prendasNovedades: Prenda[];
  prendasDescuento: Prenda[]
  prendasVendidas: Prenda[];

  constructor(private prendaService: PrendaService) { }

  ngOnInit() {
    this.prendaService.getAllPrendas().subscribe((res) => {
        // Filtrar prendas para escaparate
        const prendasEscaparate = res.filter(prenda => prenda.escaparate && !prenda.vendido).slice(0, 5);
        this.prendasEscaparate = prendasEscaparate;
        console.log("Escaparate", this.prendasEscaparate);

        // Filtrar prendas para descuento y novedades
        const prendasNoVendidas = res.filter(prenda => !prenda.vendido);
        const prendasValidas = prendasNoVendidas.filter(prenda => prenda.precioOriginal !== prenda.precioConDescuento);
        if (prendasNoVendidas.length <= 5) {
            this.prendasNovedades = prendasNoVendidas;
            console.log("Novedades", this.prendasNovedades);
        } else {
            this.prendasNovedades = prendasNoVendidas.slice(-5);
            console.log("Novedades", this.prendasNovedades);
        }
        if (prendasValidas.length <= 5) {
            this.prendasDescuento = prendasValidas;
            console.log("Descuento", this.prendasDescuento);
        } else {
            const prendasSeleccionadas = [];
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * prendasValidas.length);
                prendasSeleccionadas.push(prendasValidas.splice(randomIndex, 1)[0]);
            }
            this.prendasDescuento = prendasSeleccionadas;
            console.log("Descuento", this.prendasDescuento);
        }

        // Filtrar prendas vendidas
        this.prendasVendidas = res.filter(prenda => prenda.vendido).slice(0, 5);
        console.log("Vendido", this.prendasVendidas);
    });
}

}

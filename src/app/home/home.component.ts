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
  prendasVendidas: Prenda[];
  prueba3: Prenda[]

  constructor(private prendaService:PrendaService) { }

  ngOnInit() {
    this.prendaService.getAllPrendas().subscribe((res) => {
      console.log(res);
      this.prendasVendidas= res.slice(50,55);
      this.prueba3= res.slice(20,25);
    })
    this.prendaService.getPrendasPorEscaparate().subscribe((res) => {
      console.log(res);
      this.prendasEscaparate= res.data.slice(0,5);
    })   
    /*this.prendaService.getPrendasPorVendido().subscribe((res) => {
      console.log(res);
      this.prendasVendidas= res.data.slice(0,5);
    })*/
  }
}

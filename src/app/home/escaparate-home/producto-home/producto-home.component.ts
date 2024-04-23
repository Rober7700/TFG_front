import { Component, Input } from '@angular/core';
import { Prenda } from '../../../core/classes/prenda';
import { Router } from '@angular/router';
import { PrendaCompartidaService } from '../../../core/services/prenda.compartida.service';

@Component({
  selector: 'app-producto-home',
  templateUrl: './producto-home.component.html',
  styleUrl: './producto-home.component.css'
})
export class ProductoHomeComponent {
  @Input() prenda:Prenda;

  constructor(private router:Router, private prendaCompartidaService: PrendaCompartidaService) {
  }


  verDetalle() {
    this.prendaCompartidaService.setPrenda(this.prenda);
    this.router.navigate([`collection/detalles/${this.prenda.id}`]);
  }
  
}

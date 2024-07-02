import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Prenda } from '../../../core/classes/prenda';
import { Router } from '@angular/router';
import { PrendaCompartidaService } from '../../../core/services/prenda.compartida.service';

@Component({
  selector: 'app-producto-home',
  templateUrl: './producto-home.component.html',
  styleUrls: ['./producto-home.component.css']
})
export class ProductoHomeComponent implements OnInit, OnDestroy {
  @Input() prenda: Prenda;
  currentImageIndex: number = 0;
  interval: any;

  constructor(private router: Router, private prendaCompartidaService: PrendaCompartidaService) {}

  ngOnInit() {
    this.startImageRotation();
  }

  ngOnDestroy() {
    this.stopImageRotation();
  }

  startImageRotation() {
    this.nextImage(); // Mostrar la primera imagen inmediatamente
    this.interval = setInterval(() => {
      this.nextImage();
    }, this.getRandomInterval()); // Cambiar la imagen después de un intervalo aleatorio
  }

  stopImageRotation() {
    clearInterval(this.interval);
  }

  nextImage() {
    if (this.prenda && this.prenda.fotos && this.prenda.fotos.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.prenda.fotos.length;
    }
  }

  getRandomInterval() {
    // Generar un número aleatorio entre 5 y 10 segundos (5000 y 10000 milisegundos)
    return Math.floor(Math.random() * (10000 - 5000 + 1) + 3000);
  }

  verDetalle() {
    this.prendaCompartidaService.setPrenda(this.prenda);
    this.router.navigate([`collection/detalles/${this.prenda.id}`]);
  }
}

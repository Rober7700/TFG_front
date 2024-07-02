import { Component, Input } from '@angular/core';
import { Prenda } from '../../core/classes/prenda';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { CarritoService } from '../../core/services/carrito.service';
import { ArchivadorService } from '../../core/services/archivador.service';
import { PrendaCompartidaService } from '../../core/services/prenda.compartida.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  @Input() prenda: Prenda;
  isLogged: boolean;

  public isButtonHeartOn = false;
  public size: number = 50;
  public showSecond: boolean = false;

  
  public firstPhotoUrl: string;
  public secondPhotoUrl: string;

  constructor(private router: Router, private tokenService: TokenService, private carritoService: CarritoService,
    private archivadorService: ArchivadorService, private prendaCompartidaService: PrendaCompartidaService) {
    this.isLogged = this.tokenService.isLogged()
  }

  ngOnInit(){
    if (this.prenda && this.prenda.fotos && this.prenda.fotos.length > 0) {
      // Asignar la URL de la primera foto
      this.firstPhotoUrl = `http://localhost:8080/almacen/prendas/img/${this.prenda.fotos[0]}`;
      // Verificar si hay una segunda foto
      if (this.prenda.fotos.length > 1) {
        // Asignar la URL de la segunda foto
        this.secondPhotoUrl = `http://localhost:8080/almacen/prendas/img/${this.prenda.fotos[1]}`;
      }
    }
  }

  verDetalle() {
    this.prendaCompartidaService.setPrenda(this.prenda);
    this.router.navigate([`collection/detalles/${this.prenda.id}`]);
  }

  addCarrito(prendaId: number) {
    console.log(prendaId);
    this.carritoService.addPrendaAlCarrito(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

  addArchivador(prendaId: number) {
    this.isButtonHeartOn = !this.isButtonHeartOn;
    this.archivadorService.addPrendaAlArchivador(prendaId).subscribe((res) => {
      console.log(res);
    })
  }

  showSecondPhoto() {
    if (this.secondPhotoUrl) {
      this.showSecond = true;
    }
  }

  hideSecondPhoto() {
    this.showSecond = false;
  }

  getCurrentPhoto(): string {
    return this.showSecond ? this.secondPhotoUrl : this.firstPhotoUrl;
  }

}

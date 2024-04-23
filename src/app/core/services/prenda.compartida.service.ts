import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Prenda } from '../classes/prenda';

@Injectable({
  providedIn: 'root'
})
export class PrendaCompartidaService {
  private prendaSource = new BehaviorSubject<Prenda | null>(null);
  prendaActual$ = this.prendaSource.asObservable();

  constructor() { }

  setPrenda(prenda: Prenda) {
    this.prendaSource.next(prenda);
    localStorage.setItem('prendaDetalles', JSON.stringify(prenda));
  }
}

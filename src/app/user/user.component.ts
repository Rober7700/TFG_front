import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface IPedido {
  direccion: string;
  direccion2: string;
  nombre: string;
  apellido: string;
  metodoPago: string;
  ciudad: string;
  pais: string;
  zip: string;
  provincia: string;
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  reactiveForm!: FormGroup;
  pedido: IPedido;

  paises = ['Seleccione un país', 'España', 'Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú', 'Uruguay', 'Venezuela'];
  provincias: string[] = [
    'Seleccione una provincia', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz',
    'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa',
    'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
    'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza',
    'Ceuta', 'Melilla'
  ];

  constructor() {
    this.pedido = {} as IPedido;
  }

  ngOnInit(): void {
    this.iniciarTabla();
  }

  iniciarTabla() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(this.pedido.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      pais: new FormControl(this.pedido.pais, [
        Validators.required,
      ]),
      nombre: new FormControl(this.pedido.nombre, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      apellido: new FormControl(this.pedido.apellido, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      direccion: new FormControl(this.pedido.direccion, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      direccion2: new FormControl(this.pedido.direccion2, [
        Validators.maxLength(250),
      ]),
      ciudad: new FormControl(this.pedido.ciudad, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      provincia: new FormControl(this.pedido.provincia, [
        Validators.required,
      ]),
      zip: new FormControl(this.pedido.zip, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      telefono: new FormControl(this.pedido.telefono, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
    });
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get pais() {
    return this.reactiveForm.get('pais')!;
  }

  get nombre() {
    return this.reactiveForm.get('nombre')!;
  }

  get apellido() {
    return this.reactiveForm.get('apellido')!;
  }

  get direccion() {
    return this.reactiveForm.get('direccion')!;
  }

  get direccion2() {
    return this.reactiveForm.get('direccion2')!;
  }

  get ciudad() {
    return this.reactiveForm.get('ciudad')!;
  }

  get provincia() {
    return this.reactiveForm.get('provincia')!;
  }

  get zip() {
    return this.reactiveForm.get('zip')!;
  }

  get telefono() {
    return this.reactiveForm.get('telefono')!;
  }


  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.pedido = this.reactiveForm.value;

    console.log(this.pedido)
  }

}
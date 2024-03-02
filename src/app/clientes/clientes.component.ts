import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [
    {id: 1, nombre: 'Roberto', apellido: 'Lopez', email: 'prueba@1asd.com', createAt: '2024-03-01'}
  ]

  constructor() {}

  ngOnInit() {

  }
}

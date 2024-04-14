import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/classes/cliente';
import { ClienteService } from '../../core/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo: string = "Crear Cliente"

  errores: string[]

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }
/*
  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe({
        next: (cliente) => {
          this.router.navigate(['/clientes'])
          console.log(cliente)
          Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success')
        },
        error: (err) => {
          console.error(err);
          this.errores = err.error.errors as string[]
        }
      });
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe({
        next: (cliente) => {
          this.router.navigate(['/clientes'])
          Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
        },
        error: (err) => {
          console.error(err);
          this.errores = err.error.errors as string[];
        }
      });
  }
  */
}

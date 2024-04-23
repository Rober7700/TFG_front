import { Component, OnInit } from '@angular/core';
import { Prenda } from '../core/classes/prenda';
import { PrendaService } from '../core/services/prenda.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from '../core/services/modal.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrls: ['./prendas.component.css']
})
export class PrendasComponent implements OnInit {

  prendas: Prenda[];
  paginator: any;
  prendaSeleccionada: Prenda;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private prendaService: PrendaService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      language: {
        "emptyTable": "No hay datos disponibles en la tabla",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
        "lengthMenu": "Mostrar _MENU_ entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "No se encontraron registros coincidentes",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        },
      },
      order: [[1, 'asc']],
      lengthMenu: [
        [5, 10, 50, -1], // Aquí se definen los valores y etiquetas de las opciones
        [5, 10, 50, "Todos"] // Aquí se definen las etiquetas que se mostrarán en el menú
      ],
      pageLength: 5,
    }

    this.cargarContenido();

    this.modalService.notificarUpload.subscribe((prenda) => {
      this.prendas = this.prendas.map(prendaOriginal => {
        if (prenda.id == prendaOriginal.id) {
          prendaOriginal.fotos = prenda.fotos;
        }
        console.log("prendaOriginal", prendaOriginal.fotos[0])
        console.log("prenda", prenda.fotos[0])
        return prendaOriginal;
      })
    });
  }

  primeraFoto(prenda: Prenda): string {
    if (prenda && prenda.fotos && prenda.fotos.length > 0) {
      return `http://localhost:8080/almacen/prendas/img/${prenda.fotos[0]}`;
    } else {
      return 'http://localhost:8080/img/IconoMas.png';
    }
  } 

  cargarContenido() {
    this.prendaService.getAllPrendas().subscribe(res => {
      this.prendas = res as Prenda[];
      this.dtTrigger.next(null);
    });
  }

  delete(prenda: Prenda): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la prenda ${prenda.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        this.prendaService.delete(prenda.id).subscribe(
          response => {
            this.prendas = this.prendas.filter(pre => pre !== prenda);
            Swal.fire(
              'Prenda Eliminada!',
              `Prenda ${prenda.id} eliminada con éxito.`,
              'success'
            );
          }
        );
      }
    })
  }

  abrirModal(prenda: Prenda) {
    this.prendaSeleccionada = prenda;
    this.modalService.abrirModal();
  }
}

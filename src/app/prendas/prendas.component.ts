import { Component, OnInit } from '@angular/core';
import { Prenda } from '../core/classes/prenda';
import { PrendaService } from '../core/services/prenda.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrl: './prendas.component.css'
})
export class PrendasComponent implements OnInit {

  prendas: Prenda[];
  paginator: any;
  prendaSeleccionada: Prenda;

  constructor(private prendaService: PrendaService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.prendaService.getPrendas(page).subscribe(response => {
        this.prendas = response.content as Prenda[];
        this.paginator = response;
      });
    })

    this.modalService.notificarUpload.subscribe((prenda) => {
      this.prendas = this.prendas.map(prendaOriginal => {
        if(prenda.id == prendaOriginal.id){
          prendaOriginal.foto = prenda.foto;
        }
        return prendaOriginal;
      })
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

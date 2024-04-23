import { Component, Input, OnInit } from '@angular/core';
import { Prenda } from '../core/classes/prenda';
import { PrendaService } from '../core/services/prenda.service';
import { ModalService } from '../core/services/modal.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  @Input() prenda: Prenda;
  titulo: string = "Foto de la prenda"
  progreso: number = 0;
  fotosSeleccionadas: File[];

  constructor(private prendaService: PrendaService,
    public modalService: ModalService) {

  }

  ngOnInit() {
    console.log(this.prenda)
  }

  seleccionarFoto(event) {
    this.fotosSeleccionadas = event.target.files;
  }


  subirFoto() {
    if (!this.fotosSeleccionadas) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.prendaService.subirFoto(this.fotosSeleccionadas, this.prenda.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.prenda = response.data as Prenda;
            this.modalService.notificarUpload.emit(this.prenda);
            Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }
  

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotosSeleccionadas = null;
    this.progreso = 0;
  }
}

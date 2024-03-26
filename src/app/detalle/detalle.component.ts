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
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private prendaService: PrendaService,
    public modalService: ModalService) {

  }

  ngOnInit() {
  }

  seleccionarFoto(event) {
    const files = event.target.files;
    if (files.length > 0) {
      this.fotoSeleccionada = files[0];
      console.log(this.fotoSeleccionada);
      if(this.fotoSeleccionada.type.indexOf('image') < 0){
        Swal.fire('Error selecciona imagen; ', 'El archivo tiene que ser imagen', 'error');
        this.fotoSeleccionada = null;
      }
    }
  }
  
  subirFoto() {
    if (!this.fotoSeleccionada){
      Swal.fire('Error Upload; ', 'Debe seleccionar una foto', 'error')
    } else {
      this.prendaService.subirFoto(this.fotoSeleccionada, this.prenda.id).subscribe(
        event => {
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
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}

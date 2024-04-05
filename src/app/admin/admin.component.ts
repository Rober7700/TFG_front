import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../core/services/resource.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  message = '';

  constructor(
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.resourceService.admin().subscribe( data => {
      this.message = data.mensaje;
      console.log(data);
    },
    err => {
      console.log(err);
    });
  }

}
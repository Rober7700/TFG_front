import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../core/services/resource.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  message = '';

  constructor(
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.resourceService.user().subscribe( data => {
      this.message = data.mensaje;
      console.log(data);
    },
    err => {
      console.log(err);
    });
  }

}
import { Component, Input } from '@angular/core';
import { Prenda } from '../../core/classes/prenda';

@Component({
  selector: 'app-escaparate-home',
  templateUrl: './escaparate-home.component.html',
  styleUrl: './escaparate-home.component.css'
})
export class EscaparateHomeComponent {
  @Input() titulo:any;
  @Input() prendas:Prenda[];
}

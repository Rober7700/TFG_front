import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'webApp';

  @ViewChild('header') header: HeaderComponent;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const events = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    events.subscribe((e: NavigationEnd) => {this.header.getLogged();})
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

interface SideNavToogle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'webApp';

  isSideNavCollapsed = false;
  screenWidth = 0;

  @ViewChild('header') header: HeaderComponent;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const events = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    events.subscribe((e: NavigationEnd) => {this.header.getLogged();})
  }

  onToggleSideNav(data: SideNavToogle):void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }
}

import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { adminNavbarData, navbarData } from './header-utils/nav-data';
import { INavbarData, fadeInOut } from './header-utils/helper';
import { environment } from '../../environments/environment';
import { TokenService } from '../core/services/token.service';
import { HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'; 

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface SideNavToogle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [fadeInOut]
})
export class SidebarComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    }
  }
  @Output() onToogleSideNav: EventEmitter<SideNavToogle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  adminNavbar = adminNavbarData;
  multiple: boolean = false;

  authorize_uri: string = environment.authorize_uri;
  logout_url = environment.logout_url;

  isLogged: boolean;
  isAdmin: boolean;

  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
  }

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getLogged();
  }

  toogleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  handleClick(item:INavbarData):void {
    if(!this.multiple){
      for(let modelItem of this.navData){
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  onLogin(): void {
    const code_verifier = this.generateCodeVerifier();
    this.tokenService.setVerifier(code_verifier);
    this.params.code_challenge = this.generateCodeChallenge(code_verifier);
    const httpParams = new HttpParams({fromObject: this.params});
    const codeUrl = this.authorize_uri + httpParams.toString();
    console.log(this.params);
    location.href = codeUrl;
  }

  onLogout(): void {
    location.href = this.logout_url;
  }

  getLogged(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
  }

  generateCodeVerifier(): string {
    let result = '';
    const char_length = CHARACTERS.length;
    for(let i =0; i < 44; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * char_length));
    }
    return result;
  }

  generateCodeChallenge(code_verifier: string): string {
    const codeverifierHash = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64);
    const code_challenge = codeverifierHash
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    return code_challenge;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { TokenService } from '../core/services/token.service';
import { ClienteService } from '../core/services/cliente.service';

const CLIENTE_ID = 'clienteId';

@Component({
  selector: 'app-autorized',
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent implements OnInit {

  code = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( data => {
      this.code = data.code;
      const code_verifier = this.tokenService.getVerifier();
      this.tokenService.deleteVerifier();
      this.getToken(this.code, code_verifier);
    });
  }

  getToken(code: string, code_verifier: string): void {
    this.authService.getToken(code, code_verifier).subscribe(
      data => {
       this.tokenService.setTokens(data.access_token, data.refresh_token);
       let user = this.tokenService.usuarioRegistrado();
       this.clienteService.getCliente(user).subscribe( response => {
        localStorage.setItem(CLIENTE_ID, response.id);
        console.log(response);
      });
       this.router.navigate(['']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
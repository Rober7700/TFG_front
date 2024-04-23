import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  private agregarAuth() {
    let httpHeaders = new HttpHeaders();
    const token = this.tokenService.getAccessToken();
    if (token != null) {
      return httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.tokenService.isLogged()) {
        this.tokenService.clear();
      }
      this.router.navigateByUrl('');
      return true;
    }
    if (e.status == 403) {
      this.router.navigateByUrl('');
      return true;
    }
    return false;
  }

  getCliente(email: String): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${email}`, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(() => (e));
        }
        this.router.navigate(['']);
        console.log(e);
        Swal.fire('Error al obtener: ', e.error.mensaje, 'error');
        return throwError(() => (e));
      })
    );
  }
}
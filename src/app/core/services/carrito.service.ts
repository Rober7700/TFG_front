import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";

const CLIENTE_ID = 'clienteId';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlEndPoint: string = 'http://localhost:8080/carrito';

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

  addPrendaAlCarrito(prendaId: number): Observable<any> {
    let CarritoItemDto = {
      prendaId: prendaId,
      clienteId: localStorage.getItem(CLIENTE_ID),
    }
    console.log(CarritoItemDto);
    return this.http.post<any>(`${this.urlEndPoint}/post`, CarritoItemDto, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(() => (e));
      })
    );
  }

  finalizarPedido(finPedidoDto: any): Observable<any> {
    finPedidoDto.clienteId = localStorage.getItem(CLIENTE_ID);
    console.log(finPedidoDto)
    return this.http.post<any>(`${this.urlEndPoint}/finPedido`, finPedidoDto, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(() => (e));
      })
    );
  }

  getPedidos(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/getFacturas/${localStorage.getItem(CLIENTE_ID)}`, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(() => (e));
      })
    );
  }


  getPrendaAlCarrito(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/get/${localStorage.getItem(CLIENTE_ID)}`, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(() => (e));
      })
    );
  }

  getAllPedidos(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/getFacturas`, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(() => (e));
      })
    );
  }

  quitarPrendaCarrito(prendaId: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/${localStorage.getItem(CLIENTE_ID)}/delete/${prendaId}`, { headers: this.agregarAuth() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(() => (e));
      })
    );
  }
}
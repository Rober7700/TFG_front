import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";

const CLIENTE_ID = 'clienteId';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    private urlEndPoint:string = 'http://localhost:8080/carrito';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http:HttpClient, private router:Router, private tokenService: TokenService) {    }

    private agregarAuth(){
        let httpHeaders = new HttpHeaders();
        const token = this.tokenService.getAccessToken();
        if (token != null) {
          return httpHeaders.append('Authorization', 'Bearer ' + token);
        }
        return this.httpHeaders;
      }
    
      private isNoAutorizado(e): boolean {
        if (e.status == 401) {
          if (this.tokenService.isLogged()){
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

    addPrendaAlCarrito(prendaId:number): Observable<any>{
        let CarritoItemDto = {
            prendaId: prendaId,
            clienteId: localStorage.getItem(CLIENTE_ID),
        }
        console.log(CarritoItemDto);
        console.log(this.urlEndPoint, CarritoItemDto);
        return this.http.post<any>(`${this.urlEndPoint}/post`, CarritoItemDto, {headers: this.agregarAuth()});
    }

    finalizarPedido(finPedidoDto:any): Observable<any>{
      finPedidoDto.clienteId = localStorage.getItem(CLIENTE_ID);
      return this.http.post<any>(`${this.urlEndPoint}/finPedido`, finPedidoDto, {headers: this.agregarAuth()});
    }

    getPedidos(): Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/getFacturas/${localStorage.getItem(CLIENTE_ID)}`, {headers: this.agregarAuth()});
    }


    getPrendaAlCarrito(): Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/get/${localStorage.getItem(CLIENTE_ID)}`, {headers: this.agregarAuth()});
    }

    getAllPedidos(): Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/getFacturas`, {headers: this.agregarAuth()});
    }

    quitarPrendaCarrito(prendaId:number): Observable<any>{
      return this.http.delete<any>(`${this.urlEndPoint}/${localStorage.getItem(CLIENTE_ID)}/delete/${prendaId}`, {headers: this.agregarAuth()});
    }
}
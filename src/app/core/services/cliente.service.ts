import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { Cliente } from "../classes/cliente";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
  })
export class ClienteService {

    private urlEndPoint:string = 'http://localhost:8080/api/clientes';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    
    constructor(private http:HttpClient, private router:Router, private tokenService: TokenService) {    }

    private agregarAuth(){
      let httpHeaders = new HttpHeaders();
      const token = this.tokenService.getAccessToken();
      if (token != null) {
        return httpHeaders.append('Authorization', 'Bearer ' + token);
      }
      return this.httpHeaders;
    }

    getClientes(page:number): Observable<any> {
        return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
          map((response)=>response as Cliente[])
          );
    }

    create(cliente: Cliente): Observable<any> {
        return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
          map((response: any) => response.data as Cliente),
          catchError(e => {

            if(e.status == 400){
              return throwError(() => (e));
            }

            console.log(e);
            Swal.fire('Error al crear al cliente: ', e.error.mensaje, 'error');
            return throwError(() => (e));
          })
        );
    }
    getCliente(email: String): Observable<any> {
        return this.http.get<any>(`${this.urlEndPoint}/${email}`, {headers: this.agregarAuth()}).pipe(
          catchError(e => {
            this.router.navigate(['/clientes']);
            console.log(e);
            Swal.fire('Error al editar: ', e.error.mensaje, 'error');
            return throwError(() => (e));
          })
        );
      }

    update(cliente: Cliente): Observable<Cliente>{
        return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
          map((response: any) => response.data as Cliente),
          catchError(e => {

            if(e.status == 400){
              return throwError(() => (e));
            }

            console.log(e);
            Swal.fire('Error al editar al cliente: ', e.error.Mensaje, 'error');
            return throwError(() => (e));
          })
        );
    }

    delete(id: number): Observable<Cliente>{
        return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
    }
}
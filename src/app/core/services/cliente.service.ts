import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { Cliente } from "../classes/cliente";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
  })
export class ClienteService {

    private urlEndPoint:string = 'http://localhost:8080/api/clientes';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    
    constructor(private http:HttpClient, private router:Router) {    }

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

    getCliente(id: number): Observable<any> {
        return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
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
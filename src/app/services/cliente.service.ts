import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteModel } from '../models/Cliente.model';
import { map } from 'rxjs/operators';
import { TokenModel } from '../models/Token.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


   private url_app = 'https://localhost:44386';

  token: TokenModel = new TokenModel();
  constructor(private http: HttpClient) {
    this.leerToken();
   }

  getQuery(url: string) {
    const urlBase = `${this.url_app}${url}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}`
    });
    return this.http.get(urlBase, {headers});
  }
  getQueryBlob(url: string) {
    const urlBase = `${this.url_app}${url}`;
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.token.token}`);
     return this.http.get(urlBase, {responseType: 'blob', observe: 'response'});
  }
  postQuery(url: string, cliente: ClienteModel) {
    const urlBase = `${this.url_app}${url}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}`
    });
    return this.http.post(urlBase,cliente, {headers});
  }
  updateQuery(url: string, cliente: ClienteModel) {
    const urlBase = `${this.url_app}${url}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}`
    });
    return this.http.put(urlBase, cliente, {headers});
  }
  deleteQuery(url: string) {
    const urlBase = `${this.url_app}${url}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}`
    });
    return this.http.delete(urlBase, {headers});
  }
  createCliente(cliente: ClienteModel) {
    return this.postQuery('/api/Cliente', cliente).pipe(
      map(resp => {
        return resp;
      })
    );
  }
  getTodosClientes() {
    return this.getQuery('/api/Cliente')
    .pipe(
      map(this.crearArreglo)
    );
  }
  getTodosClientesdExcel() {
    return this.getQueryBlob('/api/Cliente/excel');
  }
  getTodosClientesbyTipoClienteId(tipoClienteId: number) {
    return this.getQuery(`/api/Cliente/tipoCliente/${tipoClienteId}`)
    .pipe(
      map(this.crearArreglo)
    );
  }
  getTodosClientesbyTipoClienteIdExcel(tipoClienteId: number) {
    return this.getQueryBlob(`/api/Cliente/excel/tipoCliente/${tipoClienteId}`)
    .pipe(
      map(resp => {
        return resp;
      })
    );
  }
  getClienteId(id: number) {
    return this.getQuery(`/api/Cliente/${id}`)
    .pipe(
      map(resp => {
        return resp;
      })
    );
  }
  updateCliente(id: number, cliente: ClienteModel) {
    return this.updateQuery(`/api/Cliente/${id}`, cliente).pipe(
      map(resp =>{
        return resp;
      })
    );
  }
  deleteCliente(id: number) {
    return this.deleteQuery(`/api/Cliente/${id}`)
    .pipe(
      map(resp => {
        return resp;
      })
    );
  }
  crearArreglo(clientesObj: object){
    const clientes: ClienteModel[] = [];
    Object.keys(clientesObj).forEach(key => {
      const cliente: ClienteModel = clientesObj[key];
      clientes.push(cliente);
    });
    return clientes;
  }
  leerToken(){
    this.token.token = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
    this.token.expiration = (localStorage.getItem('expiration')) ? localStorage.getItem('expiration') : '';
  }
}

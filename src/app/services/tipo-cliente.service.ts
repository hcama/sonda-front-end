import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TipoClienteModel } from '../models/TipoCliente.model';
import { TokenModel } from '../models/Token.model';

@Injectable({
  providedIn: 'root'
})

export class TipoClienteService {
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
  getTodosTiposClientes() {
    return this.getQuery('/api/TipoCliente')
    .pipe(
      map(this.crearArreglo)
    );
  }
  crearArreglo(tipoClientesObj: object){
    const tipoClientes: TipoClienteModel[] = [];
    Object.keys(tipoClientesObj).forEach(key => {
      const tipoCliente: TipoClienteModel = tipoClientesObj[key];
      tipoClientes.push(tipoCliente);
    });
    return tipoClientes;
  }
  leerToken() {
    this.token.token = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
    this.token.expiration = (localStorage.getItem('expiration')) ? localStorage.getItem('expiration') : '';
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TipoClienteModel } from '../models/TipoCliente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoClienteService {
  //private url_app = 'https://localhost:44386';
  private url_app = 'https://sondaapi20200117013021.azurewebsites.net';
  constructor(private http: HttpClient) { }
  getQuery(url: string) {
    const urlBase = `${this.url_app}${url}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBkyuLNNcGRMWWjIRxU3KHnPgXfV46KI6lkNhyadzVW_O9W2VaPOBZdGjQ8S9WkTMlxF9ITIOwzvdSQNzg'
    // });
    // return this.http.get(urlBase, {headers});
    return this.http.get(urlBase);
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
}

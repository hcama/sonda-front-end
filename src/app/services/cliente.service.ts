import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteModel } from '../models/Cliente.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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
  getQueryBlob(url: string) {
    const urlBase = `${this.url_app}${url}`;
    // const headers = new HttpHeaders();
    // headers.append('Accept', 'text/plain');
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBkyuLNNcGRMWWjIRxU3KHnPgXfV46KI6lkNhyadzVW_O9W2VaPOBZdGjQ8S9WkTMlxF9ITIOwzvdSQNzg'
    // });
    // return this.http.get(urlBase, {headers});
    return this.http.get(urlBase, {responseType: 'blob', observe: 'response'});
  }
  postQuery(url: string, cliente: ClienteModel) {
    const urlBase = `${this.url_app}${url}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBkyuLNNcGRMWWjIRxU3KHnPgXfV46KI6lkNhyadzVW_O9W2VaPOBZdGjQ8S9WkTMlxF9ITIOwzvdSQNzg'
    // });
    // return this.http.get(urlBase, {headers});
    return this.http.post(urlBase, cliente);
  }
  updateQuery(url: string, cliente: ClienteModel) {
    const urlBase = `${this.url_app}${url}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBkyuLNNcGRMWWjIRxU3KHnPgXfV46KI6lkNhyadzVW_O9W2VaPOBZdGjQ8S9WkTMlxF9ITIOwzvdSQNzg'
    // });
    // return this.http.get(urlBase, {headers});
    return this.http.put(urlBase, cliente);
  }
  deleteQuery(url: string) {
    const urlBase = `${this.url_app}${url}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBkyuLNNcGRMWWjIRxU3KHnPgXfV46KI6lkNhyadzVW_O9W2VaPOBZdGjQ8S9WkTMlxF9ITIOwzvdSQNzg'
    // });
    // return this.http.get(urlBase, {headers});
    return this.http.delete(urlBase);
  } 
  createCliente(cliente: ClienteModel) {
    return this.postQuery('/api/Cliente', cliente).pipe(
      map(resp =>{
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/Usuario.modelo';
import { map } from 'rxjs/operators';
import { TokenModel } from '../models/Token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private url_app = 'https://localhost:44386';
 
  constructor(private http: HttpClient) { }
  postQuery(url: string, usuario: UsuarioModel){
    const urlBase = `${this.url_app}${url}`;
    return this.http.post(urlBase, usuario);
  }
  login(usuario: UsuarioModel){
    return this.postQuery('/api/Cuenta/login', usuario).pipe(
      map ((resp: TokenModel) => {
        this.guardarToken(resp);
        return resp;
       })
    );
  }
  guardarToken(token: TokenModel) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiration', token.expiration);
  }

}

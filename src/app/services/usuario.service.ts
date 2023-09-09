import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get(`${this.url}/users?per_page=6`)
      .pipe(map((resp: any) => resp['data']));
  }

  getUserById( id: string ) {
    return this.http.get(`${ this.url }/users/${ id }`)
          .pipe(
            map( (resp:any) => resp['data'])
          );
  }
}

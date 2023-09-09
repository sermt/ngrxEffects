import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { cargarUsuarios } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { ResponseError } from 'src/app/store/reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [],
})
export class ListaComponent implements OnInit, OnDestroy {
  usuariosSubs!: Subscription;
  usuarios: Usuario[] = [];
  error: ResponseError | null = null;
  cargando: boolean = false;
  constructor(public store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(cargarUsuarios());
    this.usuariosSubs = this.store
      .select('usuarios')
      .subscribe(({ users, loading, error }) => {
        this.usuarios = users;
        this.cargando = loading;
        this.error = error;
      });
  }
  ngOnDestroy(): void {
    this.usuariosSubs.unsubscribe();
  }
}

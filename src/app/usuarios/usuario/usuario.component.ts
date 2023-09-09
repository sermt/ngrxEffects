import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuario!: Usuario | null;
  loading: boolean = false;
  error:Error | null = null;
  storeSubs!:Subscription;
  routerSubs!:Subscription;

  constructor( private router: ActivatedRoute,
               private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('usuario').subscribe( ({ user, loading, error }) => {
      this.usuario = user;
      this.loading = loading;
      this.error = error;
    });


    this.router.params.subscribe( ({ id }) => {

      this.store.dispatch( cargarUsuario({ id }) );

    });

  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
    this.routerSubs.unsubscribe();
  }

}

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cargarUsuarios } from '../actions/usuarios.actions';
import { mergeMap, tap, of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as UserActions from '../actions';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarUsuarios),
      tap(console.log),
      mergeMap(() =>
        this.usuarioService.getUsers().pipe(
          tap((data) => console.log('data servicio', data)),
          map((users) => UserActions.cargarUsuariosSuccess({ users })),
          catchError((error) =>
            of(UserActions.cargarUsuariosError({ payload: error }))
          )
        )
      )
    )
  );
}

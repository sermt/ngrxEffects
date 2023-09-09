import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { ResponseError } from '../reducers';

export const cargarUsuario = createAction('[Usuario] Cargar Usuario',props<{ id: string }>());
export const cargarUsuarioSucces = createAction(
  '[Usuario] Cargar Usuario Success',
  props<{ user: Usuario }>()
);
export const cargarUsuarioError = createAction(
  '[Usuario] Cargar Usuario Error',
  props<{ payload: ResponseError }>()
);

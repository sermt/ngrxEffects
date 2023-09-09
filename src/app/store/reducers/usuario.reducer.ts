import { Action, createReducer, on } from '@ngrx/store';
import * as usuarioActions from '../actions';
import { Usuario } from 'src/app/models/usuario.model';
import { ResponseError } from './usuarios.reducer';

export interface UsuarioState {
  id: number | null;
  user: Usuario | null;
  loaded: boolean;
  loading: boolean;
  error: ResponseError | null;
}

export const usuarioInitialState: UsuarioState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _usuariosReducer = createReducer(
  usuarioInitialState,

  on(usuarioActions.cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id: Number(id),
  })),

  on(usuarioActions.cargarUsuarioSucces, (state, { user }) => ({
    ...state,
    id: user.id,
    user,
    loading: false,
    loaded: true,
  })),

  on(usuarioActions.cargarUsuarioError, (state, { payload }) => ({
    ...state,
    user: null,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function usuarioReducer(state = usuarioInitialState, action: Action) {
  return _usuariosReducer(state, action);
}

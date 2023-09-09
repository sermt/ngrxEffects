import { Action, createReducer, on } from '@ngrx/store';
import * as usuariosActions from '../actions/usuarios.actions';
import { Usuario } from 'src/app/models/usuario.model';

export interface ResponseError {
  url: string;
  name: string;
  message: string;
}

export interface UsuariosState {
  users: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: ResponseError | null;
}

export const initialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usuariosReducer = createReducer(
  initialState,

  on(usuariosActions.cargarUsuarios, (state) => ({ ...state, loading: true })),

  on(usuariosActions.cargarUsuariosSuccess, (state, { users }) => ({
    ...state,
    users: [...users],
    loading: false,
    loaded: true,
    error:null
  })),

  on(usuariosActions.cargarUsuariosError, (state, { payload }) => ({
    ...state,
    users: [],
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function usuariosReducer(state = initialState, action: Action) {
  return _usuariosReducer(state, action);
}

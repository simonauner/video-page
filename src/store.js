import { createStore, combineReducers } from 'redux';
import { filmReducer } from './services/film/film.reducer';

const combinedReducers = combineReducers({ film: filmReducer });

export default initialState => createStore(combinedReducers, initialState);

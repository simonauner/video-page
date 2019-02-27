import { createStore, combineReducers } from 'redux';
import { filmReducer } from './components/film/film.reducer';

const combinedReducers = combineReducers({ film: filmReducer });

export default initialState => createStore(combinedReducers, initialState);

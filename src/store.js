import { createStore, applyMiddleware, combineReducers } from 'redux';
import { filmReducer } from './components/film/film.reducer';

import thunkMiddleware from 'redux-thunk';

const combinedReducers = combineReducers({ film: filmReducer });

export default initialState =>
    createStore(
        combinedReducers,
        initialState,
        applyMiddleware(thunkMiddleware)
    );

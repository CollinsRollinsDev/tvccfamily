import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useTheReducer from './reducers';

const rootReducer = combineReducers({ useTheReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
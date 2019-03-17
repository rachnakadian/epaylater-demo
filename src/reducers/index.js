import { combineReducers } from 'redux';

import home from './home';

export const application = combineReducers({
	home
});

export const initialState =  {
	home : home({}, {type: 'init'})
};
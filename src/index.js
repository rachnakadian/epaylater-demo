import React 		from 'react';
import ReactDOM 	from 'react-dom';
import thunk		from 'redux-thunk';
import { Provider }	from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from "react-router-dom";

import { application, initialState } from './reducers'
import App 			from './components/app';
import * as history from 'history';

const customHistory = history.createBrowserHistory();

const store = createStore(application, initialState, applyMiddleware(thunk));

ReactDOM.render((
	<BrowserRouter history={customHistory}>
		<Provider store={store} >
			<App />
		</Provider>
	</BrowserRouter>
), document.getElementById("app"));
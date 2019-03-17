import React, {Component} from 'react';
import { Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';

import Search from './search';
import Detail from './detail';
import Header from './header';
import actions from '../actions';

class Home extends Component {
	
    render () {
        return (
        	<div>
        		<Header />
        		<Route exact path='/' component={Search} />
        		<Route exact path='/bookDetails/:isbn' component={Detail} />
	        </div>
        )
    }
}

const InputComp = (props) => {
	return <input type='test' name={props.searchBy} value={props[props.searchBy]} onChange={props.handleChange} />
}

const mapStateToProps = (state) => {
	return {
		booksByName: state.home.booksByName,
		bookByISBN: state.home.bookByISBN
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
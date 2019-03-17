import React, {Component} from 'react';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleLogout } from 'react-google-login';
import cookie from 'react-cookies';

import actions from '../actions';

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: cookie.load('userInfo')
		}
		this.loggedOut = this.loggedOut.bind(this);
	}

	loggedOut(response) {
		cookie.remove('userInfo');
		this.props.history.push('/login');
	}

    render () {
        return (
        	<div className='header'>
        		<div className='left-section' onClick={()=>this.props.history.push('/')}>
        			My Online Library
        		</div>
        		<div className='right-section'>
		    		<div className='image-sec'>
		    			{this.state.userInfo && this.state.userInfo.image ? <img src={this.state.userInfo.image} /> : ''}
		    		</div>
		    		<div className='info-sec'>
		    			<div className='userInfo-name'>{this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ''}</div>
			        	<div className='logout-sec'>
				        	<GoogleLogout
						      	buttonText="Logout"
						      	render={renderProps => (
							      	<button onClick={renderProps.onClick}>Logout</button>
							    )}
						      	onLogoutSuccess={this.loggedOut}
					    		clientId="<CLIENT_ID_HERE>"
						    ></GoogleLogout>
						</div>
		    		</div>
        		</div>
	        </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
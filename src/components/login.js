import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class Login extends Component {

	constructor(props) {
		super(props);
		this.onSuccess = this.onSuccess.bind(this);
		this.onFailure = this.onFailure.bind(this);
	}

	onSuccess(response) {
		let userData = {
			name: response.profileObj && response.profileObj.name ? response.profileObj.name : '',
			image: response.profileObj && response.profileObj.imageUrl ? response.profileObj.imageUrl : ''
		}
		cookie.save('userInfo', JSON.stringify(userData));
		this.props.history.push('/');
	}

	onFailure(response) {
		// console.log("Failure Login");
	}

    render () {
        return <div className='login-sec'>
        	<h1>Welcome to Online Library</h1>
	        <GoogleLogin
			    clientId="<CLIENT_ID_HERE>"
			    render={renderProps => (
			      <button className="login-btn" onClick={renderProps.onClick}>
					<img src="/public/images/search.png"/>
			      	<span>Sign in using Google Account</span>
			      </button>
			    )}
			    buttonText="Login"
			    onSuccess={this.onSuccess}
			    onFailure={this.onFailure}
			/>
		</div>
    }
}

const mapStateToProps = (state) => {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import Home from './home';
import Login from './login';

import '../../public/css/style.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
    }
    componentDidMount() {
        this.validate();
    }

    componentDidUpdate() {
        this.validate();
    }

    validate() {
        let userInfo = cookie.load('userInfo');
        if(!userInfo) {
            if(this.props.location.pathname.indexOf('/login') == -1) {
                this.props.history.push('/login');
            }
        } else {
            if(this.props.location.pathname.indexOf('/login') != -1) {
                this.props.history.push('/');
            }
        }
    }

    render () {
        return (
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/' component={Home} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
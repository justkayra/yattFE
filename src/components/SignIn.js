import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../store/security/actions";
import Alert from "@material-ui/lab/Alert";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin = event => {
        console.log(event);
        event.preventDefault();
        this.props.login(this.state.user, this.state.password);
    }

    render() {
        let message = '';
        if (this.props.security.type === 'LOGIN_FAIL'){
            message = <Alert severity="error">{this.props.security.title}</Alert>
        }
        return (
            <form onSubmit={this.submitLogin}>
                <div style={{marginTop: 100}}>
                    <div>
                        <TextField
                            id="outlined-disabled"
                            label="User name"
                            variant="outlined"
                        />
                    </div>
                    <div style={{marginTop: 20}}>
                        <TextField
                            id="outlined-disabled"
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                    <div  style={{marginTop: 20}}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                            onClick={this.submitLogin}
                        >
                            Sign in...
                        </Button>
                    </div>
                </div>
                {message}
            </form>
        )
    }
}

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    //security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security.serverPage,
});


export default connect(mapStateToProps, {login})(SignIn);

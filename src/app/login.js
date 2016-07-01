import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';

const style = {
    margin: 12
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.usernameErr = error.usernameErr.length ? error.usernameErr[0] : null;
        this.passwordErr = error.passwordErr.length ? error.passwordErr[0] : null;
        this.errorText = error.error.length ? error.error[0] : null;
        this.username = error.username;
    }

    handleSubmit() {};
    handleCancel() {
        location.replace('/');
    }

    render() {
        const ErrorText = this.errorText ? <p style={{color: red500}}>{this.errorText}</p> : null; 
        return (
            <MuiThemeProvider>
            <div>
            {ErrorText}
            <form action="/login" method="post">
                <TextField
                    name="username"
                    hintText="enter username"
                    defaultValue={this.username}
                    floatingLabelText="username"
                    errorText={this.usernameErr}
                /><br />
                <TextField
                    name="password"
                    hintText="password"
                    floatingLabelText="password"
                    errorText={this.passwordErr}
                    type="password"
                /><br />
                {/* <a href="/" style={style}><RaisedButton label="cancel"/></a><RaisedButton label="login" type="submit" primary={true} style={style}/> */}
                <RaisedButton label="cancel" style={style} onClick={this.handleCancel}/><RaisedButton label="login" type="submit" primary={true} style={style}/>
            </form>
            </div>
            </MuiThemeProvider>
        )
    }
};

render(<Login />, document.getElementById('login'));
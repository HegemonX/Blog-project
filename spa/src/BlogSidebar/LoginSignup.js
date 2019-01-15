import React from 'react'
import Info from './Info'

class LoginSignup extends React.Component {

    handleSignupSubmit = (e) => {
        this.props.handleSignup(e)
        this.setState({
            showedForm: 'login'
        })
    }

    render() {
        const loginForm = (
            <div className="auth-form">
                <button onClick={this.props.changeForm}>Create account</button>
                <p>Log in:</p>
                <form onSubmit={(e) => this.props.handleLogin(e)} id="loginform">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )

        const signupForm = (
            <div className="auth-form">
                <button onClick={this.props.changeForm}>Log in account</button>
                <p>Sign up:</p>
                <form onSubmit={(e) => this.handleSignupSubmit(e)} id="signupform">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="text" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )

        return(
            <div>
                {this.props.showedForm === 'login'
                    ? loginForm
                    : signupForm}
                <Info message={this.props.infoMessage} />                
            </div>

        )
    }
}

export default LoginSignup
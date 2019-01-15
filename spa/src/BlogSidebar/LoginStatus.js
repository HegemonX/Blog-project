import React from 'react';
// import Nav from '../commonBlocks/LoginForm/Nav';
// import LoginForm from '../commonBlocks/LoginForm/LoginForm';
// import SignupForm from '../commonBlocks/LoginForm/SignupForm';
import {AJAX_URL} from '../settings'
import LoginWelcome from './LoginWelcome'
import LoginSignup from './LoginSignup'

class LoginStatus extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      info: '',
      showedForm: 'login'
    }

  }

  changeForm = () => {
    this.setState(
        prevState => ({
            showedForm: (prevState.showedForm === 'login') 
                ? 'signup' 
                : 'login',
            info: ''
        }) 
    );
  }

  loginRequest(formData) {
    return fetch(`${AJAX_URL}/api/login/`, {
      method: 'post',
      body: formData
    })
  }

  signupRequest(formData) {
    return fetch(`${AJAX_URL}/api/users/`, {
      method: 'post',
      body: formData
    })
  }

  handleLogin = (event) => {
    event.preventDefault();
    var isOK = false;
    var formData = new FormData(event.target);
    this.loginRequest(formData)
    .then(
      res => {
        if (res.ok) {
          isOK = true;
        }
        return res.json();
      })
    .then(
      data => {
        if (!isOK) {
          this.setState({
            info: data
          })
        throw new Error('err')
        }
        this.props.login(data)
      })
    .catch(
      err => err
    );

  }

  handleSignup = (event) => {
    event.preventDefault();
    this.props.logout()
    var formData = new FormData(event.target)
    var isOK = false;
    this.signupRequest(formData)
    .then(
      res => {
        if (res.ok) {
          isOK = true;
          this.setState({
            showedForm: 'login',
            info: ['Successfully signed in']
          })
        }          
        return res.json()
      })
    .then(
      data => {
        if (!isOK) {
          this.setState({
            info: data
          })
          throw new Error('err')
        }
      })
    .catch(
      err => err
    );

  }

  render() {
    return(
      <div>
        {this.props.isLoggedIn 
          ? <LoginWelcome 
              userData={this.props.userData}
              handleLogout={this.props.logout}
            /> 
          : <LoginSignup
              handleLogin={this.handleLogin}
              handleSignup={this.handleSignup}
              infoMessage={this.state.info}
              showedForm={this.state.showedForm}
              changeForm={this.changeForm}
            />
        }
      </div>

    )
  }
}

export default LoginStatus
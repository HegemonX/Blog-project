import React from 'react'
import BlogSidebar from './BlogSidebar'
import BlogNews from './BlogNews'
import BlogTop from './BlogTop'
// import articlesFromFixture from './fixtures'
import './style.css'
import {AJAX_URL} from './settings'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      userData: {}
    }

  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      isLoggedIn: false,
      userData: {}
    })
  }

  handleLogin = (data) => {
      localStorage.setItem('token', data.token);
      this.setState({
        isLoggedIn: true,
        userData: data.user,
      });
  }

  tokenStatusRequest(token) {
      return fetch(`${AJAX_URL}/api/im/`, {
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      })
    }

  componentDidMount() {
      if (this.state.isLoggedIn) return;

      var token = localStorage.getItem('token');
      this.tokenStatusRequest(token)
      .then(
        res => {
          if (res.ok) return res.json();
          throw new Error('no token')
        })
      .then(
        data => {
          this.setState({
            isLoggedIn: true,
            userData: data
          });
        })
      .catch(
        err => {
          if (err.message !== 'no token') console.log(err)
        }
      )
  }

  render() {
      return (
          <div id="page">
              <BlogTop />
              <div id="content">
                  <BlogNews 
                      isLoggedIn={this.state.isLoggedIn}
                      userData={this.state.userData}                        
                  />
                  <BlogSidebar 
                      isLoggedIn={this.state.isLoggedIn}
                      userData={this.state.userData}
                      logout={this.handleLogout}
                      login={this.handleLogin}
                  />
              </div>
          </div>
      )
  }
}

export default App

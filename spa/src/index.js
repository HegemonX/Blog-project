import Blog from './Blog'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {AJAX_URL} from './settings'


class App extends React.Component {

  render() {
    return(
      <Router>
        <div>
            <Route exact path="/" component={Blog} />
            {/* //  */}
        </div>
      </Router>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"))
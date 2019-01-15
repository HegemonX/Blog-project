import React from "react";
import LoginStatus from "./LoginStatus";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

export default class BlogSidebar extends React.PureComponent {
  render() {
    return (
      <div id="blog-sidebar" className="block">
        <LoginStatus {...this.props} />
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/post" onClick={e => e.preventDefault()}>
              Add Post
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

import React, { Component } from 'react'
import './App.css';
import Routers from "./Route/Route-config"
import RouterViews from "./Route/RouterView"
import { BrowserRouter as Router } from "react-router-dom"
export default class App extends Component {
  render() {
    return (
      <Router>
        <RouterViews Routers={Routers} />
      </Router>
    )
  }
}

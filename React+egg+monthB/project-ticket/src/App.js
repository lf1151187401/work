import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Routers from "./Route/Router-config"
import RouterViews from "./Route/RouterViews"
export default class App extends Component {
  render() {
    return (
      <Router>
        <RouterViews Routers={Routers} />
      </Router>
    )
  }
}

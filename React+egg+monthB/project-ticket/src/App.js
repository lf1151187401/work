import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Routers from "./Route/Router-config"
import RouterViews from "./Route/RouterViews"
import { Provider } from "react-redux"
import store from "./store/index"
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <RouterViews Routers={Routers} />
        </Router>
      </Provider>
    )
  }
}

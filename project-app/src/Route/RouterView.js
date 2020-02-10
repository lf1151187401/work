import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
export default class RouterView extends Component {
    render() {
        let { Routers } = this.props;
        let newRouter = Routers.filter((item, index) => !item.redirect)
        let RedRouter = Routers.filter((item, index) => item.redirect)
        return (
            <Switch>
                {
                    newRouter.map((item, index) => {
                        return <Route path={item.path} render={props => {
                            if (item.children) {
                                return <item.component Routers={item.children} {...props} />
                            } else {
                                return <item.component {...props} />
                            }
                        }} />
                    })
                }


                {
                    RedRouter.map((item, index) => {
                        return <Redirect from={item.path} to={item.redirect} />
                    })
                }
            </Switch >
        )
    }
}

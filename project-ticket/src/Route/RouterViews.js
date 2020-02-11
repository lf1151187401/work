import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
export default class RouterViews extends Component {
    render() {
        let { Routers } = this.props;
        let NewRouter = Routers.filter(item => !item.redirect)
        let RedRouter = Routers.filter(item => item.redirect)
        return (
            <Switch>
                {
                    NewRouter.map((item, index) => {
                        return <Route key={index} path={item.path} render={props => {
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
                        return <Redirect key={index} from={item.path} to={item.redirect} />
                    })
                }
            </Switch>
        )
    }
}

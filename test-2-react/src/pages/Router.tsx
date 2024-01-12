import { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import LoginPageStep1 from './LoginPage/LoginPageStep1/LoginPageStep1'
import LoginPageStep2 from './LoginPage/LoginPageStep2/LoginPageStep2'

export default function Router() {
    return (
        <Switch>
            <Route exact path="/login/step-1">
                <LoginPageStep1 />
            </Route>
            <Route exact path="/login/step-2">
                <LoginPageStep2 />
            </Route>
            <Redirect exact from="/" to="/login/step-1" />
            <Route path="*">Not implemented</Route>
        </Switch>
    )
}

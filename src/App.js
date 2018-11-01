import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'


import { Form1, Form2 } from './pages'

export const App = () => (
  <React.Fragment>
    <div style={{ padding: '20px 20px 0 20px' }}>
      <NavLink exact to="/" style={{ margin: '0 10px' }}>Form 1 (default)</NavLink>
      <NavLink to="/form2" style={{ margin: '0 10px' }}>Form 2 (context)</NavLink>
    </div>

    <br />
    <hr />
    <br />

    <Switch>
      <Route exact path="/" component={Form1} />
      <Route path="/form2" component={Form2} />
    </Switch>
  </React.Fragment>
)

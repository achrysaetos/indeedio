import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { AuthContext } from "../context/auth"

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext) // get user if user is logged in

  return (
    // just a route tag that redirects to home if user is already logged in
    <Route
      {...rest}
      render={ (props) => user ? <Redirect to="/" /> : <Component {...props} /> }
    />
  )
  
}

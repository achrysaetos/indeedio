import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"
import { ChakraProvider } from "@chakra-ui/react"

import "semantic-ui-css/semantic.min.css"
import "./App.css"
import { AuthProvider } from "./context/auth"
import { AuthRoute, AuthRouteX } from "./util/AuthRoute"
import { theme } from "./theme"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MyFavorites from "./pages/MyFavorites"
import Discover from "./pages/Discover"

export default function App() {

  return (
    <ChakraProvider theme={theme}> {/* use custom theme from theme.js */}
      <AuthProvider> {/* pass the user and the login/logout functions from ./context/auth.js, to set/remove the user token */}
        <Router> {/* to route to different pages in the pages folder */}
          <Container> {/* semantic ui class to create margins */}
            <AuthRoute exact path="/" component={() => { window.location.href = 'https://achrysaetos.webflow.io/' }} />
            <Route exact path="/" component={Home} />
            <AuthRouteX exact path="/favorites" component={MyFavorites} /> {/* redirect to home if user is not logged in */}
            <AuthRouteX exact path="/discover" component={Discover} /> {/* redirect to home if user is not logged in */}
            <AuthRoute exact path="/login" component={Login} /> {/* redirect to home if user is logged in */}
            <AuthRoute exact path="/register" component={Register} /> {/* redirect to home if user is logged in */}
          </Container>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
  
}

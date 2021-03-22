import React, { useContext } from "react"

import { AuthContext } from "../context/auth"
import Dashboard from "../components/Dashboard"
// import Landing from "../components/Landing"

export default function Home() {
  const { user } = useContext(AuthContext)
  
  if (user) {
    return <Dashboard />
  } else {
    return "" // return <Landing />
  }
  
}

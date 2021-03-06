import React, { useContext } from "react"

import { AuthContext } from "../context/auth"
import Dashboard from "../components/Dashboard"

export default function Home() {
  const { user, logout } = useContext(AuthContext)
    
  return user ? <Dashboard user={user} logout={logout} /> : ""

}

import React, { useContext } from "react"

import { AuthContext } from "../context/auth"
import Discovery from "../components/Discovery"

export default function Discover() {
  const { user, logout } = useContext(AuthContext)
    
  return user ? <Discovery user={user} logout={logout} /> : ""

}

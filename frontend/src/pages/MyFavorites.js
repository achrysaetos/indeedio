import React, { useContext } from "react"

import { AuthContext } from "../context/auth"
import Favorites from "../components/Favorites"

export default function MyFavorites() {
  const { user, logout } = useContext(AuthContext)
    
  return user ? <Favorites user={user} logout={logout} /> : ""

}
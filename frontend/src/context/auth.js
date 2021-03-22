import React, { useReducer, createContext } from "react"
import jwtDecode from "jwt-decode"

// no token yet b/c we haven't verified the user yet
const initialState = { user: null } 

// used with useContext to let you read the context and subscribe to its changes, in order to verify that the user exists
const AuthContext = createContext({ user: null, login: (userData) => {}, logout: () => {} })

// if a token exists and isn't expired, user in initialState is set to the decodedToken
if (localStorage.getItem("jwtToken")) { 
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"))
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken")
  } else {
    initialState.user = decodedToken
  }
}

// determines changes to the state using the action it receives
function authReducer(state, action) { 
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return state
  }
}

// use initialState and authReducer from the above functions
function AuthProvider(props) { 
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData) { // put token in local storage
    localStorage.setItem("jwtToken", userData.token)
    dispatch({ type: "LOGIN", payload: userData })
  }

  function logout() { // remove token from local storage
    localStorage.removeItem("jwtToken")
    dispatch({ type: "LOGOUT" })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }} // pass these to the components between the AuthProvider tags
      {...props} // deep copy from props since we might get some props from the top-down component
    />
  )
  
}

export { AuthContext, AuthProvider }

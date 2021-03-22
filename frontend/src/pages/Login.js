import React, { useContext, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Link as aLink } from "react-router-dom"
import { Heading, VStack, Box, FormControl, InputGroup, Input, Button, InputLeftElement, Link, Text, Alert, AlertIcon } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

import { AuthContext } from "../context/auth"
import { useForm } from "../util/hooks"
import { LOGIN_USER } from "../graphql/LOGIN_USER"

export default function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, { username: "", password: "" }) // from ../util/hooks.js

  const [loginUser, { loading }] = useMutation(LOGIN_USER, { // call the LOGIN_USER mutation
    update(_, { data: { login: userData } }) {
      context.login(userData) // set the user token and userData payload, from ../context/auth.js
      props.history.push("/") // direct to home
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function loginUserCallback() { // lets you call loginUser() inside the useForm function above
    loginUser()
  }
  
  return(
    <VStack>
      <Box p={12} width={{ sm: "100%", md: "50%" }} borderWidth={1} borderRadius={12} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign In</Heading>
        </Box>

        <Box my={3} textAlign="left">
          <form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
            <FormControl>
              <InputGroup size="lg" mt={6}>
                <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300"/>}/>
                <Input 
                  variant="flushed"
                  focusBorderColor="grey"
                  autoComplete="off"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup size="lg" mt={6}>
                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300"/>}/>
                <Input
                  variant="flushed"
                  focusBorderColor="grey"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={onChange}
                />
              </InputGroup>
            </FormControl>

            <Box mt={3} align="right">
              <Link color="teal.500" as={aLink} to="/register">
                Forgot Password?
                </Link>
            </Box>
            
            <Button colorScheme="teal" variant="outline" width="full" mt={6} size="lg" type="submit">
              Sign In
            </Button>
            <Text mt={3} textAlign="center">
              Don’t have an account? 
              <Link color="teal.500" ml={2} as={aLink} to="/register">
                Sign up
              </Link>
            </Text>
          </form>
        </Box>
      </Box>

      <Box width={{ sm: "100%", md: "50%" }} align="center" justifyContent="center">
        {Object.keys(errors).length > 0 && (
          Object.values(errors).map((value) => (
            <Alert status="error" mt={2} borderRadius={12} key={value}>
              <AlertIcon/> {value}
            </Alert>
          ))
        )}
      </Box>
    </VStack>
  )

}

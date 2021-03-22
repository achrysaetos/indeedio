import React, { useContext, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Link as aLink } from "react-router-dom"
import { Heading, VStack, Box, FormControl, InputGroup, Input, Button, InputLeftElement, Link, Text, Alert, AlertIcon } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

import { AuthContext } from "../context/auth"
import { useForm } from "../util/hooks"
import { REGISTER_USER } from "../graphql/REGISTER_USER"

export default function Register(props) { // exactly the same as ./Login.js
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      props.history.push("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function registerUser() {
    addUser()
  }

  return (
    <VStack>
      <Box p={12} width={{ sm: "100%", md: "50%" }} borderWidth={1} borderRadius={12} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
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
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={onChange}
                />
              </InputGroup>
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
              <InputGroup size="lg" mt={6}>
                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300"/>}/>
                <Input 
                  variant="flushed"
                  focusBorderColor="grey"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={onChange}
                />
              </InputGroup>
            </FormControl>
            
            <Button colorScheme="teal" variant="outline" width="full" mt={9} size="lg" type="submit">
              Sign Up
            </Button>
            <Text mt={3} textAlign="center">
              Already have an account? 
              <Link color="teal.500" ml={2} as={aLink} to="/login">
                Sign in
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

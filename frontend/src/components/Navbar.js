import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Box, Heading, Flex, Text, Button, Input } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

import { AuthContext } from "../context/auth"

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const [ keyword, setKeyword ] = useState("")

  useEffect(() => {
    updateKeyword(keyword)
  }, [keyword]) // run useEffect to updateKeyword every time keyword changes

  const updateKeyword = (keyword) => {
    console.log(keyword)
  }

  const menuBar = user ? (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" py={6} pl={6} mb={3}>
      <Flex align="center">
        <Heading size="lg" color="teal.500" as={Link} to="/" _hover={{ color: "teal.500" }}>
          ACHRYSAETOS
        </Heading>
      </Flex>

      <Flex align="center">
        <Input 
          textAlign="left"
          mx={3}
          px={3}
          w="300px"
          size="lg" 
          variant="flushed"
          focusBorderColor="grey"
          autoComplete="off"
          placeholder="Enter search term..."
          name="keyword"
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <Menu>
          <MenuButton as={Button} colorScheme="teal" rightIcon={<ChevronDownIcon />} size="lg" mr={6}>
            {user.username.substr(0, 1).toUpperCase()}
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem>Account</MenuItem>
              <MenuItem>Help </MenuItem>
              <MenuItem>Settings</MenuItem>
            </MenuGroup>
            <MenuDivider/>
            <MenuItem onClick={logout}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>

  ) : (

    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" py={6} px={6} mb={3}>
      <Flex align="center">
        <Heading size="lg" color="teal.500" as={Link} to="/" _hover={{ color: "teal.500" }}>
          ACHRYSAETOS
        </Heading>
      </Flex>

      <Flex align="center">
        <Box display={{ sm: "none", md: "flex" }} width="auto">
          <Text mr={6} fontSize="lg" fontWeight="500" _hover={{ color: "teal.500" }} as={Link} to="/">
            Products
          </Text>
          <Text mr={6} fontSize="lg" fontWeight="500" _hover={{ color: "teal.500" }} as={Link} to="/">
            Features
          </Text>
          <Text mr={6} fontSize="lg" fontWeight="500" _hover={{ color: "teal.500" }} as={Link} to="/">
            Pricing
          </Text>
        </Box>

        <Button colorScheme="teal" variant="outline" size="lg" as={Link} to="/login">
          Sign In
        </Button>
      </Flex>
    </Flex>
  )

  return menuBar
}

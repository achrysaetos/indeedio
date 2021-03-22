import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

import AddCardBtn from "./navbar/AddCardBtn"
import MessagesBtn from "./navbar/MessagesBtn"
import ProfileBtn from "./navbar/ProfileBtn"
import { AuthContext } from "../context/auth"

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  
  /* Set active tab in navbar
  const pathname = window.location.pathname // the location object's url port
  const path = pathname === "/" ? "home" : pathname.substr(1) // path = name in pathname "/[name]"
  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name) // set the active item where the name matches the path
  */

  const menuBar = user ? (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" py={6} pl={6} mb={3}>
      <Flex align="center">
        <Heading size="lg" color="teal.500" as={Link} to="/" _hover={{ color: "teal.500" }}>
          ACHRYSAETOS
        </Heading>
      </Flex>

      <Flex align="center">
        <AddCardBtn />
        <MessagesBtn />
        <ProfileBtn />

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

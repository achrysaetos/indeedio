import React, { useState, useEffect } from "react"
import { Link, Box, Heading, Flex, Text } from "@chakra-ui/react"

import { Link as HomeLink } from "react-router-dom"
import { Button, Input } from "@chakra-ui/react"
import { Menu as MenuX, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

import Menu from "./dashboard/Menu"
import Footer from "./dashboard/Footer"

export default function Dashboard({user, logout}) {
  const [data, setData] = useState([]);
  const [dataDefault, setDataDefault] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080")
      const data = await response.json()
      setData(data)
      setDataDefault(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const [ keyword, setKeyword ] = useState("")

  useEffect(() => {
    const updateKeyword = (keyword) => {
      const filtered = dataDefault.filter(x => {
        return (
          x.title.toLowerCase().includes(keyword.toLowerCase()) || 
          x.company.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      setData(filtered)
    }
    updateKeyword(keyword)
  }, [dataDefault, keyword]) // run useEffect to updateKeyword every time keyword changes

  return loading ? "" : (
    <>
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" py={6} pl={6} mb={3}>
        <Flex align="center">
          <Heading size="lg" color="teal.500" as={HomeLink} to="/" _hover={{ color: "teal.500" }}>
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

          <MenuX>
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
          </MenuX>
        </Flex>
      </Flex>

      <Flex justifyContent="flex-start">
        <Menu />
        <Box w="100%">
          <Box pl={6} w="100%">
            <Box mb={4} w="100%">
              <Heading fontSize="3xl" color="teal.500" textAlign="center" pb={2}>Currently Hiring</Heading>
              <Heading fontSize="xl" color="teal.500" textTransform="uppercase" py={2}>Software Engineering Intern</Heading>
              <Text as="em">{data.length} results ({dataDefault.length} total)</Text>
            </Box>

            {data.map((x) => {
              return (
                <Flex key={Math.random().toString(36).substring(4)}>
                  <Link fontSize="lg" href={"https://www.google.com/search?q="+x.company} 
                  isExternal w={40} fontWeight="light" _hover={{ color: "black" }}>
                    {x.company}
                  </Link>
                  <Link fontSize="lg" href={x.link} isExternal w={500} _hover={{ color: "teal.500" }}>
                    {x.title}
                  </Link>
                </Flex>
              )
            })}
          </Box>
          <Footer />
        </Box>
      </Flex>
    </>
  )
  
}

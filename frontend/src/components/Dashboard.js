import React, { useState, useEffect } from "react"
import { Link, Box, Heading, Flex, Text, Tooltip } from "@chakra-ui/react"

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

  const [ sortBy, setSortBy ] = useState("Relevancy")
  const [ keyword, setKeyword ] = useState("")
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080")
      let data = await response.json()
      const data_copy = data.slice()
      if (sortBy === "Alphabetical"){
        data.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
      } else {
        data = data_copy
      }
      setData(data)
      setDataDefault(data)
      setLoading(false)
    }
    fetchData()
  }, [sortBy])

  useEffect(() => {
    const updateKeyword = (keyword) => {
      const filtered = dataDefault.filter(x => {
        return (
          x.title.toLowerCase().includes(keyword.toLowerCase()) || 
          x.company.toLowerCase().includes(keyword.toLowerCase()) ||
          x.location.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      setData(filtered)
    }
    updateKeyword(keyword)
  }, [dataDefault, keyword]) // run useEffect to updateKeyword every time keyword changes

  const changeSortOption = () => {
    if (sortBy === "Relevancy") setSortBy("Alphabetical")
    else setSortBy("Relevancy")
  }
  
  return loading ? "" : (
    <>
      {/* NAVBAR */}
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" py={6} pl={6}>
        <Flex align="center">
          <Heading size="lg" color="teal.500" as={HomeLink} to="/" _hover={{ color: "teal.500" }}>
            ACHRYSAETOS
          </Heading>
        </Flex>

        <Flex align="center" alignItems="flex-start">
          <Box>
            <Input textAlign="left" mx={3} px={3} w="300px" size="lg" variant="flushed" focusBorderColor="grey"
              autoComplete="off" placeholder="Filter by company, title, or location..." name="keyword" type="text" value={keyword} 
              onChange={e => setKeyword(e.target.value)}
            />
            <Flex justifyContent="flex-end" alignItems="baseline" px={3} pt={1}>
              <Text mr={1} fontWeight="semibold">Sorted by:</Text>
              <Link onClick={() => changeSortOption()} fontWeight="light" _hover={{ color: "black" }}>{sortBy}</Link>
            </Flex>
          </Box>
          
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

      {/* DASHBOARD */}
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
                    <Tooltip label={
                        <>
                          <Text>{x.location}</Text>
                          <Text>Posted {x.posted}</Text>
                        </>
                      } placement="right"
                    >
                      {x.title}
                    </Tooltip>
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

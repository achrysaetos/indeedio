import React, { useState, useEffect } from "react"
import { Link, Box, Heading, Flex, Text, Tooltip, Spinner, Divider } from "@chakra-ui/react"
import { useQuery } from "@apollo/react-hooks"

import { Link as HomeLink } from "react-router-dom"
import { Button, Input } from "@chakra-ui/react"
import { Menu as MenuX, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

import Menu from "./dashboard/Menu"
import Footer from "./dashboard/Footer"
import FavBtn from "./dashboard/FavBtn"
import { FETCH_USER } from "../graphql/FETCH_USER"

const dataFromArray = require("../companies.js")
const companies = dataFromArray.companies

export default function Dashboard({user, logout}) {
  const [data, setData] = useState([]);
  const [dataDefault, setDataDefault] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ sortBy, setSortBy ] = useState("Relevancy")
  const [ keyword, setKeyword ] = useState("")

  const { loading: loadingFetch, data: dataFetch } = useQuery(FETCH_USER, { variables: { userId: user?.id }})
  
  function filterCompanies(scrapedOutput) {
    let list = []
    for (let i=0; i<scrapedOutput.length; i++){
      const scrapedOutput_cur = scrapedOutput[i].company.toLowerCase().split(" ")
      for (let j=0; j<companies.length; j++){
        const companies_cur = companies[j].split(" ")
        if (scrapedOutput_cur.every(x => companies_cur.includes(x)) || companies_cur.every(x => scrapedOutput_cur.includes(x))){
          list.push({
            company: scrapedOutput[i].company, 
            title: scrapedOutput[i].title, 
            link: scrapedOutput[i].link, 
            location: scrapedOutput[i].location,
            posted: scrapedOutput[i].posted,
            corresponding: companies[j],
          })
        }
      }
    }
    // returns the set of filtered companies
    for (let i=0; i<list.length; i++){
      list[i] = JSON.stringify(list[i])
    }
    const set = new Set(list)
    let potentials = []
    set.forEach((x) => {
      potentials.push(JSON.parse(x))
    })
    return potentials
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080")
      let data = await response.json()
      data = filterCompanies(data)
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

  return loading || loadingFetch ? <Spinner size="xl" color="teal.500" thickness="3px" speed="0.5s" display= "block" ml= "auto" mr= "auto" mt={40} /> : (
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
            <Input textAlign="left" mx={6} px={3} w="300px" size="lg" variant="flushed" focusBorderColor="grey"
              autoComplete="off" placeholder="Filter by company, title, or location..." name="keyword" type="text" value={keyword} 
              onChange={e => setKeyword(e.target.value)}
            />
            <Flex justifyContent="flex-end" alignItems="baseline" px={6} pt={1}>
              <Text mr={1} fontWeight="semibold">Sorted by:</Text>
              <Link onClick={() => changeSortOption()} fontWeight="light" _hover={{ color: "black", fontWeight: "normal" }}>{sortBy}</Link>
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
        <Box w="60%">
          <Box pl={6} w="100%">
            <Box mb={4} w="100%">
              <Heading fontSize="3xl" color="teal.500" textAlign="center" pb={4}>Currently Hiring</Heading>
              <Divider />
              <Heading fontSize="xl" color="teal.500" textTransform="uppercase" py={2}>Software Engineering Intern</Heading>
              <Text as="em">{data.length} results ({dataDefault.length} total)</Text>
              <Divider mt={2} />
            </Box>

            {data.map((x) => {
              return (
                <Flex key={Math.random().toString(36).substring(4)} alignItems="baseline">
                  <FavBtn user={user} favs={dataFetch.getUser.favs} info={x}/>

                  <Tooltip label={x.corresponding} placement="left" mr={6}>
                    <Link fontSize="lg" href={"https://www.google.com/search?q="+x.company+" crunchbase"} 
                    isExternal w={40} fontWeight="light" _hover={{ color: "black", fontWeight: "normal" }}>
                      {x.company}
                    </Link>
                  </Tooltip>

                  <Tooltip label={
                      <>
                        <Text>{x.location}</Text>
                        <Text>Posted {x.posted}</Text>
                      </>
                    } placement="right" w="xl" hasArrow arrowSize={15}
                  >
                    <Link fontSize="lg" href={x.link} isExternal w={500} _hover={{ color: "teal.500" }}>
                      {x.title}
                    </Link>
                  </Tooltip>
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

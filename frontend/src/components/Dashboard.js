import React, { useState, useEffect } from "react"
import { Link, Box, Heading, Flex, Text } from "@chakra-ui/react"

import Menu from "./dashboard/Menu"
import Footer from "./dashboard/Footer"

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      setData(data)
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? "" : (
    <Flex justifyContent="flex-start">
      <Menu />
      <Box>
        <Box pl={6}>
          <Box mb={4}>
            <Heading fontSize="3xl" color="teal.500" textAlign="center" pb={2}>Currently Hiring</Heading>
            <Heading fontSize="xl" color="teal.500" textTransform="uppercase" py={2}>Software Engineering Intern</Heading>
            <Text as="em">{data.length} results found.</Text>
          </Box>

          {data.map((x) => {
            return (
              <Flex key={x.company}>
                <Link fontSize="lg" href={"https://www.google.com/search?q="+x.company} 
                isExternal w={40} fontWeight="light" _hover={{ color: "black" }}>
                  {x.company}
                </Link>

                <Link fontSize="lg" href={x.link} isExternal w={600} _hover={{ color: "teal.500" }}>
                  {x.title}
                </Link>
              </Flex>
            )
          })}
        </Box>
        <Footer />
      </Box>
    </Flex>
  )
  
}

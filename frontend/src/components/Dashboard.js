import React, { useState, useEffect } from "react"
import { Link, Box, Heading, Flex } from "@chakra-ui/react"

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
      <Box w="60%">
        <Box>
          <Heading fontSize="3xl" color="teal.500" textAlign="center" pb={2}>Companies</Heading>
          <Heading fontSize="xl" color="teal.500" textTransform="uppercase" py={2}>Currently Hiring</Heading>
          {data.map((x) => {
            return (
              <Box key={x.company}>
                {x.company}
                <Link fontSize="lg" color="black" href={x.link} _hover={{ color: "teal.500" }}>
                  {x.title}
                </Link>
              </Box>
            )
          })}
        </Box>
        <Footer />
      </Box>
    </Flex>
  )
  
}

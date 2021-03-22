import React from "react"
import { Flex, Link, Box, Text } from "@chakra-ui/react"

export default function Footer() {

  return(
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" py={6} pl={6} mb={3}>
      <Flex align="center">
        <Text> Copyright © 2021 ACHRYSAETOS. All rights reserved. </Text>
      </Flex>

      <Flex align="center">
        <Box display={{ sm: "none", md: "flex" }} width="auto">
          <Text mr={6} _hover={{ color: "teal.500" }} as={Link} to="/">
            About
          </Text>
          <Text mr={6} _hover={{ color: "teal.500" }} as={Link} to="/">
            Support
          </Text>
          <Text mr={6} _hover={{ color: "teal.500" }} as={Link} to="/">
            Contact Us
          </Text>
        </Box>

      </Flex>
    </Flex>
  )

}

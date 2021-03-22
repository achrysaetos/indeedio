import React from "react"
import { Box, Accordion, AccordionItem, AccordionIcon, AccordionPanel, AccordionButton, Avatar, Flex } from "@chakra-ui/react"

export default function Menu() {

  return(
    <Flex px={2} maxW="200px" minW="200px" maxH="500px" minH="500px" borderWidth={1} boxShadow="sm" align="center" direction="column">
      <Avatar my={6} src="https://bit.ly/broken-link" size="xl"/>
      <Accordion defaultIndex={[0]} w="100%" allowToggle>
        <AccordionItem>
          <AccordionButton _focus="outline: 0">
            <Box flex="1" textAlign="left" fontWeight="bold"> SECTION I </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} ml={2}> PANEL I </AccordionPanel>
          <AccordionPanel pb={4} ml={2}> PANEL II </AccordionPanel>
          <AccordionPanel pb={4} ml={2}> PANEL III </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton _focus="outline: 0">
            <Box flex="1" textAlign="left" fontWeight="bold"> SECTION II </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} ml={2}> PANEL I </AccordionPanel>
          <AccordionPanel pb={4} ml={2}> PANEL II </AccordionPanel>
          <AccordionPanel pb={4} ml={2}> PANEL III </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton _focus="outline: 0">
            <Box flex="1" textAlign="left" fontWeight="bold"> SECTION III </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} ml={2}> PANEL I </AccordionPanel>
          <AccordionPanel pb={4} ml={2}> PANEL II </AccordionPanel>
          <AccordionPanel pb={4} ml={2}> PANEL III </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  )

}

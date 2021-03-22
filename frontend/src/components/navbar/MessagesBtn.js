import React from "react"
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, IconButton } from "@chakra-ui/react"
import { BellIcon } from "@chakra-ui/icons"

export default function Messages(){

  return(
    <Popover>
      <PopoverTrigger>
        <IconButton variant="outline" colorScheme="teal" icon={<BellIcon />} size="lg" mr={6} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize="lg" fontWeight="semibold">Notifications</PopoverHeader>
        <PopoverBody fontSize="lg">No messages here! Check back later!</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
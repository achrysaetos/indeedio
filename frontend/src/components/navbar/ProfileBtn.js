import React from "react"
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, useDisclosure, Button } from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons"

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <IconButton variant="outline" ref={btnRef} colorScheme="teal" onClick={onOpen} icon={<ViewIcon />} size="lg" mr={6} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Account</DrawerHeader>

            <DrawerBody>
              Nothing here yet!
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
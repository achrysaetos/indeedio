import { extendTheme } from "@chakra-ui/react"

// chakra ui customize theme (https://chakra-ui.com/docs/theming/customize-theme)
const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
          _focus: "outline: 0",
      },
    },
  },
})

export { theme }
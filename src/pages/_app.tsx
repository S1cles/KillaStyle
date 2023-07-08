// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'


import { extendTheme } from '@chakra-ui/react'


export const theme = extendTheme()

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
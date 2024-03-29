import { ChakraProvider } from '@chakra-ui/react';
import 'regenerator-runtime/runtime'
import '../styles/camera.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../lib/theme'
import { AppProps } from 'next/app'
import Layout from './layout'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {

  const keypressController = (e) => {
    console.log('keypress', e);
  }

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp

import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp

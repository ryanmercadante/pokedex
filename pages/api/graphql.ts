import { ApolloServer } from 'apollo-server-micro'
import { PokeAPI } from '../../apollo/datasources/pokeApi'
import { schema } from '../../apollo/schema'

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    pokeAPI: new PokeAPI(),
  }),
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler

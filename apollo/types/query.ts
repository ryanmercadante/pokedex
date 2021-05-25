import { objectType, arg, nonNull, nullable } from 'nexus'
import { Context } from '../context'
import { IPokemon } from './pokemon'
import { IPokemonDetails } from './pokemonDetails'

export interface IQuery {
  pokemon: IPokemon[]
  pokemonDetails: IPokemonDetails[]
}

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('pokemon', {
      type: 'Pokemon',
      args: {
        type: arg({
          type: nullable('String'),
        }),
      },
      resolve: async (_root, { type }, { dataSources }: Context) => {
        try {
          const pokemon = await dataSources.pokeAPI.find(type)
          return pokemon
        } catch (err) {
          console.error('ERROR', err)
        }
      },
    }),
      t.field('pokemonDetails', {
        type: 'PokemonDetails',
        args: {
          id: arg({
            type: nonNull('String'),
          }),
        },
        resolve: async (_root, { id }, { dataSources }: Context) => {
          try {
            const pokemonDetails = await dataSources.pokeAPI.details(id)
            return pokemonDetails
          } catch (err) {
            console.error('ERROR', err)
          }
        },
      })
  },
})

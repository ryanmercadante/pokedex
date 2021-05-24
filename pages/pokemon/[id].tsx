import Link from 'next/link'
import React, { ReactElement } from 'react'
import { gql } from 'apollo-server-micro'
import Layout from 'components/Layout'
import { IPokemonDetails } from 'apollo/types/pokemonDetails'
import { initializeApollo } from 'apollo/client'
import { PokeAPI } from 'apollo/datasources/pokeApi'
import { context } from 'apollo/context'
import { GetServerSideProps } from 'next'
import { IPokemonAbility } from 'apollo/types/pokemonAbility'

const PokemonDetailsQuery = gql`
  query PokemonDetails($id: String) {
    pokemonDetails(id: $id) {
      id
      name
      imageUrl
      height
      weight
      abilities {
        name
        isHidden
      }
      stats {
        name
        baseStat
      }
      types
    }
  }
`

interface PokemonProps {
  pokemon: IPokemonDetails
}

export default function Pokemon({ pokemon }: PokemonProps): ReactElement {
  function printMultipleAbilities(arr: IPokemonAbility[]): string {
    let text = ''
    arr.forEach(({ name }, index) => {
      if (index === arr.length - 1) {
        text += `${name}`
      } else {
        text += `${name}, `
      }
    })
    return text
  }

  return (
    <Layout title={pokemon.name}>
      <h1 className='text-4xl mb-2 text-center capitalize'>{pokemon.name}</h1>
      <div className='bg-gray-700 my-8 p-4 rounded-md'>
        <div className='flex justify-start mb-4'>
          <img
            className='w-64 h-64 mr-4 bg-gray-200 rounded-md'
            src={pokemon.imageUrl}
            alt={pokemon.name}
          />
          <ul className='bg-red-500 flex-grow p-4 rounded-md'>
            {pokemon.stats.map(({ name, baseStat }) => {
              return (
                <li key={name} className='flex'>
                  <strong className='mr-10 mb-3'>{name}</strong>
                  <p>{baseStat}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='bg-blue-400 p-4 w-64 flex flex-row flex-wrap justify-between rounded-md'>
          <div className='mb-4 mr-10'>
            <p className='mr-2 text-white font-semibold'>Height</p>
            <p>{(+pokemon.height * 0.1).toPrecision(2)} m</p>
          </div>
          <div className='mr-10'>
            <p className='mr-2 text-white font-semibold'>Weight</p>
            <p>{(+pokemon.weight * 0.1).toPrecision(2)} kg</p>
          </div>
          <div className='mr-10'>
            <p className='mr-2 text-white font-semibold'>Abilities</p>
            {/* <p>{pokemon.abilities.map((ability) => ability.name)}</p> */}
            <p>{printMultipleAbilities(pokemon.abilities)}</p>
          </div>
        </div>
      </div>
      <h2 className='text-2xl mt-6 mb-2'>Types</h2>
      {pokemon.types.map((type) => (
        <p key={type}>{type}</p>
      ))}
      <p className='mt-10 text-center'>
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  const { InMemoryLRUCache } = require('apollo-server-caching')
  const pokeAPI = new PokeAPI()
  pokeAPI.initialize({ context, cache: new InMemoryLRUCache() })
  const apolloClient = initializeApollo(null, { dataSources: { pokeAPI } })

  interface PokemonDetailsQueryResult {
    pokemonDetails: IPokemonDetails
  }

  interface PokemonDetailsQueryVariables {
    id: string
  }

  const { data } = await apolloClient.query<
    PokemonDetailsQueryResult,
    PokemonDetailsQueryVariables
  >({
    query: PokemonDetailsQuery,
    variables: { id: id as string },
  })

  return {
    props: {
      pokemon: data.pokemonDetails,
    },
  }
}

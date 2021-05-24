import React, { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { gql, useLazyQuery } from '@apollo/client'
import Layout from '../components/Layout'
import PokemonCardList from '../components/PokemonCardList'
import Search from '../components/Search'
import { initializeApollo } from '../apollo/client'
import { PokeAPI } from 'apollo/datasources/pokeApi'
import { IPokemon } from 'apollo/types/pokemon'

const PokemonQuery = gql`
  query Pokemon($type: String) {
    pokemon(type: $type) {
      name
      url
      imageUrl
      pokeIndex
    }
  }
`

export interface FilterOptions {
  text: string
  type: string
}

export enum SortOption {
  Lowest,
  Highest,
  Atoz,
  Ztoa,
}

export default function Home({
  pokemon: pokemonFromProps,
}: {
  pokemon: IPokemon[]
}): ReactElement {
  const [pokemon, setPokemon] = useState<IPokemon[]>(pokemonFromProps)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    text: '',
    type: '',
  })
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Lowest)
  const [getPokemonByType, { data }] = useLazyQuery(PokemonQuery)

  useEffect(() => {
    if (data) {
      const filteredPokemon = data?.pokemon.filter((poke) => {
        return poke.name.includes(filterOptions.text)
      })
      setPokemon(filteredPokemon)
    }
  }, [data, filterOptions.text])

  useEffect(() => {
    if (filterOptions.type) {
      if (filterOptions.type === 'All') {
        setPokemon(pokemonFromProps)
      } else {
        console.log(filterOptions)
        getPokemonByType({
          variables: {
            type: filterOptions.type === 'All' ? null : filterOptions.type,
          },
        })
      }
    }
  }, [filterOptions, getPokemonByType, pokemonFromProps])

  useEffect(() => {
    let sortedPokemon: IPokemon[]

    switch (sortOption) {
      case SortOption.Highest:
        sortedPokemon = [...pokemon].sort((a, b) => {
          if (a.pokeIndex > b.pokeIndex) return -1
          if (a.pokeIndex < b.pokeIndex) return 1
          return 0
        })
        break
      case SortOption.Atoz:
        sortedPokemon = [...pokemon].sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        break
      case SortOption.Ztoa:
        sortedPokemon = [...pokemon].sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          return 0
        })
        break
      default:
        sortedPokemon = [...pokemon].sort((a, b) => {
          if (a.pokeIndex < b.pokeIndex) return -1
          if (a.pokeIndex > b.pokeIndex) return 1
          return 0
        })
        break
    }

    setPokemon(sortedPokemon)
  }, [pokemon, sortOption])

  function handleFormSubmit(e: React.SyntheticEvent): void {
    e.preventDefault()
    const filteredPokemon = pokemon.filter((poke) =>
      poke.name.includes(filterOptions.text),
    )
    setPokemon(filteredPokemon)
  }

  return (
    <Layout title='Pokedex'>
      <h1 className='text-4xl mb-8 text-center'>NextJS Pokedex</h1>
      <Search
        handleFormSubmit={handleFormSubmit}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setSortOption={setSortOption}
      />
      <PokemonCardList pokemon={pokemon} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { InMemoryLRUCache } = require('apollo-server-caching')
  const pokeAPI = new PokeAPI()
  pokeAPI.initialize({ context, cache: new InMemoryLRUCache() })
  const apolloClient = initializeApollo(null, { dataSources: { pokeAPI } })

  interface PokemonQueryResult {
    pokemon: IPokemon[]
  }

  const { data } = await apolloClient.query<PokemonQueryResult, null>({
    query: PokemonQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      pokemon: data.pokemon,
    },
  }
}

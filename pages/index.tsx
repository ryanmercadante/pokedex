import React, { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { gql, useLazyQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { PokeAPI } from '../apollo/datasources/pokeApi'
import { IPokemon } from '../apollo/types/pokemon'
import Layout from '../components/Layout'
import PokemonCardList from '../components/PokemonCardList'
import Search from '../components/Search'
import PokemonCountBadge from '../components/PokemonCountBadge'
import Scroll from '../components/Scroll'

export const PokemonQuery = gql`
  query Pokemon($type: String) {
    pokemon(type: $type) {
      name
      url
      imageUrl
      pokeIndex
    }
  }
`

export enum SortOption {
  Lowest,
  Highest,
  Atoz,
  Ztoa,
}

export interface FilterOptions {
  text: string
  type: string
  sort: SortOption
}

export interface GetPokemonQueryResult {
  pokemon: IPokemon[]
}

export interface GetPokemonQueryVariables {
  type?: string
}

export default function Home({
  pokemon: pokemonFromProps,
}: {
  pokemon: IPokemon[]
}): ReactElement {
  const [pokemon, setPokemon] = useState<IPokemon[]>(pokemonFromProps)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    text: '',
    type: 'All',
    sort: SortOption.Lowest,
  })
  const [getPokemonByType, { data }] = useLazyQuery<
    GetPokemonQueryResult,
    GetPokemonQueryVariables
  >(PokemonQuery, {
    onCompleted: ({ pokemon }) => {
      const _pokemon = sortAndFilter(pokemon)
      setPokemon(_pokemon)
    },
  })

  function sortAndFilter(pokemon): IPokemon[] {
    let _pokemon = sortPokemon(filterOptions.sort, pokemon)

    if (filterOptions.text) {
      _pokemon = _pokemon.filter((poke) =>
        poke.name.includes(filterOptions.text.toLowerCase()),
      )
    }

    return _pokemon
  }

  useEffect(() => {
    if (filterOptions.type) {
      getPokemonByType({
        variables: {
          type: filterOptions.type === 'All' ? null : filterOptions.type,
        },
      })
    }
    const pmon = sortAndFilter(data?.pokemon || pokemonFromProps)
    setPokemon(pmon)
  }, [filterOptions.sort, filterOptions.text, filterOptions.type])

  function sortPokemon(
    sortOption: SortOption,
    _pokemon: IPokemon[],
  ): IPokemon[] {
    let sortedPokemon: IPokemon[]

    switch (sortOption) {
      case SortOption.Highest:
        sortedPokemon = [..._pokemon].sort((a, b) => {
          if (a.pokeIndex > b.pokeIndex) return -1
          if (a.pokeIndex < b.pokeIndex) return 1
          return 0
        })
        break
      case SortOption.Atoz:
        sortedPokemon = [..._pokemon].sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        break
      case SortOption.Ztoa:
        sortedPokemon = [..._pokemon].sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          return 0
        })
        break
      default:
        sortedPokemon = [..._pokemon].sort((a, b) => {
          if (a.pokeIndex < b.pokeIndex) return -1
          if (a.pokeIndex > b.pokeIndex) return 1
          return 0
        })
        break
    }

    return sortedPokemon
  }

  function handleFormSubmit(e: React.SyntheticEvent): void {
    e.preventDefault()
    getPokemonByType({
      variables: {
        type: filterOptions.type === 'All' ? null : filterOptions.type,
      },
    })
  }

  return (
    <Layout title='Pokedex'>
      <Search
        handleFormSubmit={handleFormSubmit}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <PokemonCountBadge count={pokemon.length} />
      <Scroll>
        <PokemonCardList pokemon={pokemon} />
      </Scroll>
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

  try {
    const { data } = await apolloClient.query<PokemonQueryResult, null>({
      query: PokemonQuery,
    })

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        pokemon: data.pokemon,
      },
    }
  } catch (err) {
    return {
      props: { pokemon: [] },
    }
  }
}

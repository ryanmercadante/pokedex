import { useState } from 'react'
import Layout from '../components/Layout'
import PokemonCardList from '../components/PokemonCardList'
import Search from '../components/Search'

export default function Home({ pokemon: pokemonFromProps }) {
  const [text, setText] = useState('')
  const [pokemon, setPokemon] = useState(pokemonFromProps)

  function handleFormSubmit(e) {
    e.preventDefault()
    if (text === '') {
      setPokemon(pokemonFromProps)
    } else {
      const filteredPokemon = pokemonFromProps.filter((poke) =>
        poke.name.includes(text)
      )
      setPokemon(filteredPokemon)
    }
  }

  return (
    <Layout title='Pokedex'>
      <h1 className='text-4xl mb-8 text-center'>NextJS Pokedex</h1>
      <Search handleFormSubmit={handleFormSubmit} setText={setText} />
      <PokemonCardList pokemon={pokemon} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()

    const pokemon = results.map((result, index) => {
      const splitUrl = result.url.split('/')
      const pokeIndex = splitUrl[splitUrl.length - 2]
      console.log(pokeIndex)
      const paddedIndex = ('00' + pokeIndex).slice(-3)
      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        imageUrl,
        pokeIndex,
      }
    })

    return {
      props: { pokemon },
    }
  } catch (err) {
    console.error(err)
  }
}

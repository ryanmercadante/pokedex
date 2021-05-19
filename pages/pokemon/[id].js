import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'

export default function Pokemon({ pokemon }) {
  return (
    <Layout title={pokemon.name}>
      <h1 className='text-4xl mb-2 text-center capitalize'>{pokemon.name}</h1>
      <img className='mx-auto' src={pokemon.imageUrl} alt={pokemon.name} />
      <p>
        <span className='font-bold mr-2'>Weight: </span>
        {pokemon.weight}
      </p>
      <p>
        <span className='font-bold mr-2'>Height: </span>
        {pokemon.height}
      </p>
      <h2 className='text-2xl mt-6 mb-2'>Types</h2>
      {pokemon.types.map((type, index) => (
        <p className='' key={index}>
          {type.type.name}
        </p>
      ))}
      <p className='mt-10 text-center'>
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await res.json()
    const paddedIndex = ('00' + id).slice(-3)
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
    pokemon.imageUrl = imageUrl

    return {
      props: { pokemon },
    }
  } catch (err) {
    console.error(err)
  }
}

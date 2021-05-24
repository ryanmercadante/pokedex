import { ReactElement } from 'react'
import { IPokemon } from 'apollo/types/pokemon'
import Link from 'next/link'

interface PokemonCardProps {
  pokemon: IPokemon
}

export default function PokemonCard({
  pokemon,
}: PokemonCardProps): ReactElement {
  return (
    <li className='w-60 mx-2'>
      <Link href={`/pokemon/${pokemon.pokeIndex}`}>
        <a className='border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md flex-col'>
          <img
            className='w-20 h-20 mr-3'
            src={pokemon.imageUrl}
            alt={pokemon.name}
          />
          <div>
            <span className='mr-2 font-bold'>{pokemon.pokeIndex}.</span>
            {pokemon.name}
          </div>
        </a>
      </Link>
    </li>
  )
}

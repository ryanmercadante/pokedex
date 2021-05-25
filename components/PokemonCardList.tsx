import { ReactElement } from 'react'
import { IPokemon } from '../apollo/types/pokemon'
import PokemonCard from './PokemonCard'

interface PokemonCardListProps {
  pokemon: IPokemon[]
}

export default function PokemonCardList({
  pokemon,
}: PokemonCardListProps): ReactElement {
  return (
    <ul className='flex flex-wrap justify-center' data-testid='PokemonList'>
      {pokemon?.map((poke) => (
        <PokemonCard key={poke.name} pokemon={poke} />
      ))}
    </ul>
  )
}

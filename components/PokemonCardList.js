import PokemonCard from '../components/PokemonCard'

export default function PokemonCardList({ pokemon }) {
  return (
    <ul className='flex flex-wrap justify-center'>
      {pokemon?.map((poke, index) => (
        <PokemonCard key={poke.name} pokemon={poke} index={index} />
      ))}
    </ul>
  )
}

import { objectType } from 'nexus'
import { IPokemonAbility } from './pokemonAbility'
import { IPokemonStat } from './pokemonStat'

export interface IPokemonDetails {
  id: number
  name: string
  imageUrl: string
  height: number
  weight: number
  abilities: IPokemonAbility[]
  stats: IPokemonStat[]
  types: string[]
}

export const PokemonDetails = objectType({
  name: 'PokemonDetails',
  definition(t) {
    t.int('id'),
      t.string('name'),
      t.string('imageUrl'),
      t.float('height'),
      t.float('weight'),
      t.list.field('abilities', {
        type: 'PokemonAbility',
      }),
      t.list.field('stats', {
        type: 'PokemonStat',
      }),
      t.list.string('types')
  },
})

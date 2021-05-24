import { objectType } from 'nexus'

export interface IPokemonAbility {
  name: string
  isHidden: string
}

export const PokemonAbility = objectType({
  name: 'PokemonAbility',
  definition(t) {
    t.string('name'), t.string('isHidden')
  },
})

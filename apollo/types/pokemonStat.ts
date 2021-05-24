import { objectType } from 'nexus'

export interface IPokemonStat {
  name: string
  baseStat: string
}

export const PokemonStat = objectType({
  name: 'PokemonStat',
  definition(t) {
    t.string('name'), t.string('baseStat')
  },
})

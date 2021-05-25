import { RESTDataSource } from 'apollo-datasource-rest'
import { DataSource } from 'apollo-datasource'
import { IPokemon } from '../types/pokemon'
import { IPokemonDetails } from '../types/pokemonDetails'

export interface IPokeAPI extends DataSource {
  /**
   * find takes an optional string argument 'type' which will search for
   * all pokemon of that type. Otherwise, find returns all pokemon.
   */
  find(type?: string): Promise<IPokemon[] | null>
  /**
   * details takes a string argument 'id' which will search for
   * the pokemon details of that pokemon id.
   */
  details(id: string): Promise<IPokemonDetails | null>
}

export class PokeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  async find(type?: string): Promise<IPokemon[] | null> {
    let data
    if (type) {
      data = await this.get(`type/${type.toLowerCase()}`)
      return this.handleFindByType(data)
    } else {
      data = await this.get(`pokemon?limit=898`)
      return this.handleFind(data)
    }
  }

  async details(id: string): Promise<IPokemonDetails | null> {
    try {
      const [pokemonDetails] = await Promise.all([
        await this.get(`pokemon/${id}`),
      ])

      // Transform abilities into simpler structure
      const pokemonAbilities = pokemonDetails.abilities.map(
        ({ ability, is_hidden }) => {
          return {
            name: ability.name,
            isHidden: is_hidden,
          }
        },
      )

      // Transform stats into simpler structure
      const pokemonStats = pokemonDetails.stats.map(({ stat, base_stat }) => {
        return {
          name: stat.name,
          baseStat: base_stat,
        }
      })

      // Transform types into just an array of strings
      const pokemonTypes = pokemonDetails.types.map(({ type }) => type.name)

      const paddedIndex = ('00' + id).slice(-3)
      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

      // Transform API response into specific structure for querying
      const pokemonDetailsGraphQLObject: IPokemonDetails = {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        imageUrl,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
        abilities: pokemonAbilities,
        stats: pokemonStats,
        types: pokemonTypes,
      }

      return pokemonDetailsGraphQLObject
    } catch (err) {
      console.error('Error retrieving pokemon details', err)
      return err
    }
  }

  private transformData(pokemon): IPokemon {
    const splitUrl = pokemon.url.split('/')
    const pokeIndex = splitUrl[splitUrl.length - 2]
    const paddedIndex = ('00' + pokeIndex).slice(-3)
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

    return {
      ...pokemon,
      imageUrl,
      pokeIndex: +pokeIndex,
    }
  }

  private handleFind(data): IPokemon[] {
    return data?.results
      ?.map((result) => this.transformData(result))
      .filter((pokemon) => pokemon.pokeIndex <= 898) // filter out any pokemon after #898
  }

  private handleFindByType(data): IPokemon[] {
    return data?.pokemon
      ?.map(({ pokemon }) => this.transformData(pokemon))
      .filter((pokemon) => pokemon.pokeIndex <= 898) // filter out any pokemon after #898
  }
}

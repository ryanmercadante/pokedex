import { PokeAPI } from './datasources/pokeApi'

export interface DataSources {
  pokeAPI: PokeAPI
}

export interface DataSourcesFunction {
  (): DataSources
}

export interface Context {
  dataSources: DataSources
}

export const pokeAPI = new PokeAPI()

export function context(): Context {
  return {
    dataSources: {
      pokeAPI,
    },
  }
}

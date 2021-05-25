import { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { PokemonQuery } from '../pages'

const mocks = [
  {
    request: {
      query: PokemonQuery,
    },
    result: {
      data: {
        pokemon: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            imageUrl:
              'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            pokeIndex: 1,
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
            imageUrl:
              'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png',
            pokeIndex: 2,
          },
        ],
      },
    },
  },
]

interface ApolloRendererProps {
  children: ReactNode
}

const ApolloRenderer = ({ children }: ApolloRendererProps): ReactElement => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>
}

const customRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: any,
): RenderResult =>
  render(ui, {
    wrapper: ApolloRenderer,
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }

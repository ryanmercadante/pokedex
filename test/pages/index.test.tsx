import { render, fireEvent, act, waitFor } from '../test-utils'
import { IPokemon } from '../../apollo/types/pokemon'
import Home from '../../pages/index'

const pokemon: IPokemon[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    pokeIndex: 1,
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png',
    pokeIndex: 2,
  },
]

describe('Home Page', () => {
  it('renders a list of pokemon passed in to props', () => {
    const { getByText } = render(<Home pokemon={pokemon} />)

    const firstPokemon = getByText('bulbasaur')
    expect(firstPokemon).toBeInTheDocument()
  })

  it('shows a count of unique pokemon in the list', () => {
    const { getByTestId } = render(<Home pokemon={pokemon} />)

    const count = getByTestId('PokemonCount')
    expect(count.innerHTML).toBe('2')
  })

  it('filters the list of pokemon to match the text in the input', async () => {
    const { getByText, getByTestId, queryByText } = render(
      <Home pokemon={pokemon} />,
    )

    // get searchInput and change value to 'bulbasaur'
    const searchInput = getByTestId('SearchInput')
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'bulbasaur' } })
    })

    await waitFor(() => {
      // When entering 'bulbasaur' into text field, all other pokemon should
      // be filtered out, in this case just removing 'ivysaur' from page.
      const bulbasaur = getByText('bulbasaur')
      const ivysaur = queryByText('ivysaur')
      expect(bulbasaur).toBeInTheDocument()
      expect(ivysaur).toBeNull()
    })
  })
})

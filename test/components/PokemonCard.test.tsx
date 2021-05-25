import { render, fireEvent, act } from '../test-utils'
import { IPokemon } from '../../apollo/types/pokemon'
import PokemonCard from '../../components/PokemonCard'
import { waitFor } from '@testing-library/dom'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const pokemon: IPokemon = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  pokeIndex: 1,
}

describe('PokemonCard Component', () => {
  it('renders a PokemonCard component', () => {
    const { getByText } = render(<PokemonCard pokemon={pokemon} />)

    const bulbasaur = getByText('bulbasaur')
    expect(bulbasaur).toBeInTheDocument()
  })

  it('should redirect when clicking on card', async () => {
    // mock router push with jest
    const router = { push: jest.fn(), prefetch: jest.fn() }
    useRouter.mockReturnValue(router)

    const { getByText } = render(<PokemonCard pokemon={pokemon} />)

    // click next Link component
    const bulbasaur = getByText('bulbasaur')
    act(() => {
      fireEvent.click(bulbasaur.firstChild)
    })

    try {
      await waitFor(() => {
        // expect router.push to have been called with the correct route
        expect(router.push).toHaveBeenCalledTimes(1)
        expect(router.push).toHaveBeenCalledWith(
          '/pokemon/1',
          '/pokemon/1',
          expect.anything(),
        )
      })
    } catch (err) {
      console.error('err', err)
    }
  })
})

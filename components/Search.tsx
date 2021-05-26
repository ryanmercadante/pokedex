import { ReactElement } from 'react'
import { FilterOptions, SortOption } from '../pages'
import Dropdown from './Dropdown'

export interface IPokemonTypeOption {
  name: string
}

const pokemonTypeOptions: IPokemonTypeOption[] = [
  { name: 'All' },
  { name: 'Bug' },
  { name: 'Dark' },
  { name: 'Dragon' },
  { name: 'Electric' },
  { name: 'Fairy' },
  { name: 'Fighting' },
  { name: 'Fire' },
  { name: 'Flying' },
  { name: 'Ghost' },
  { name: 'Grass' },
  { name: 'Ground' },
  { name: 'Ice' },
  { name: 'Normal' },
  { name: 'Poison' },
  { name: 'Psychic' },
  { name: 'Rock' },
  { name: 'Steel' },
  { name: 'Water' },
]

export interface IDropdownSortOption {
  name: string
  type: SortOption
}

interface SearchProps {
  handleFormSubmit(e: React.SyntheticEvent): void
  filterOptions: FilterOptions
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
}

export default function Search({
  handleFormSubmit,
  filterOptions,
  setFilterOptions,
}: SearchProps): ReactElement {
  const sortOptions: IDropdownSortOption[] = [
    { name: 'Lowest Number (First)', type: SortOption.Lowest },
    { name: 'Highest Number (First)', type: SortOption.Highest },
    { name: 'A-Z', type: SortOption.Atoz },
    { name: 'Z-A', type: SortOption.Ztoa },
  ]

  return (
    <div className='lg:mx-20 mb-4 p-4 shadow-md bg-red-100 mx-10 mt-8'>
      <form
        onSubmit={handleFormSubmit}
        className='flex justify-center flex-col lg:flex-row'
      >
        <div className='flex md:flex-row flex-col lg:mb-0 md:mb-2'>
          <div className='mx-2 flex-grow my-1 md:w-48'>
            <label className='text-sm md:w-36' htmlFor='typeDropdown'>
              Filter by Type:
            </label>
            <Dropdown
              name='typeDropdown'
              testId='TypeDropdown'
              options={pokemonTypeOptions}
              onOptionSelect={(option: IPokemonTypeOption) => {
                setFilterOptions({ ...filterOptions, type: option.name })
              }}
            />
          </div>
          <div className='mx-2 flex-grow my-1 md:w-48'>
            <label className='text-sm' htmlFor='sortDropdown'>
              Sort:
            </label>
            <Dropdown
              name='sortDropdown'
              testId='SortDropdown'
              options={sortOptions}
              onOptionSelect={(option: IDropdownSortOption) => {
                setFilterOptions({ ...filterOptions, sort: option.type })
              }}
            />
          </div>
          <div className='mx-2 lg:w-48 md:w-36 flex-grow my-1 lg:my-2 md:mt-2'>
            <label
              className='text-sm block lg:mb-1 md:mb-1'
              htmlFor='searchInput'
            >
              Text Search:
            </label>
            <input
              name='searchInput'
              data-testid='SearchInput'
              className='p-2 h-9 shadow-md rounded-lg lg:w-48 w-full min-w-full'
              type='text'
              value={filterOptions.text}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, text: e.target.value })
              }
              placeholder='Pikachu'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

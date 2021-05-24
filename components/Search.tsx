import { FilterOptions, SortOption } from 'pages'
import { ReactElement } from 'react'
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
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>
}

export default function Search({
  handleFormSubmit,
  filterOptions,
  setFilterOptions,
  setSortOption,
}: SearchProps): ReactElement {
  const sortOptions: IDropdownSortOption[] = [
    { name: 'Lowest Number (First)', type: SortOption.Lowest },
    { name: 'Highest Number (First)', type: SortOption.Highest },
    { name: 'A-Z', type: SortOption.Atoz },
    { name: 'Z-A', type: SortOption.Ztoa },
  ]

  return (
    <div className='md:mx-20 mb-4 p-4 border-black border-solid border-2 bg-red-100 mx-20'>
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
              options={sortOptions}
              onOptionSelect={(option: IDropdownSortOption) => {
                setSortOption(option.type)
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
              className='p-2 h-9 shadow-md rounded-lg lg:w-48 md:w-36 min-w-full'
              type='text'
              value={filterOptions.text}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, text: e.target.value })
              }
              placeholder='Pika'
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-400 px-2 mx-2 rounded-lg text-white h-9 lg:mt-8 md:mt-2 mt-4'
        >
          Search
        </button>
      </form>
    </div>
  )
}

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
    <div className='md:mx-20 mb-4 p-4 border-black border-solid border-2 bg-red-100 sm:mx-32'>
      <form
        onSubmit={handleFormSubmit}
        className='flex justify-center lg:flex-row md:flex-col sm:flex-col'
      >
        <div className='flex md:flex-row sm:flex-col lg:mb-0 md:mb-2'>
          <div className='mx-2 md:flex-grow'>
            <label className='text-sm'>Filter by Type:</label>
            <Dropdown
              options={pokemonTypeOptions}
              onOptionSelect={(option: IPokemonTypeOption) => {
                setFilterOptions({ ...filterOptions, type: option.name })
              }}
            />
          </div>
          <div className='mx-2 md:flex-grow'>
            <label className='text-sm' htmlFor=''>
              Sort:
            </label>
            <Dropdown
              options={sortOptions}
              onOptionSelect={(option: IDropdownSortOption) => {
                setSortOption(option.type)
              }}
            />
          </div>
          <div className='mx-2 lg:w-48 md:w-36 md:flex-grow'>
            <label
              className='text-sm md:block md:mt-1 sm:block sm:mt-1'
              htmlFor='searchInput'
            >
              Text Search:
            </label>
            <input
              name='searchInput'
              className='p-2 h-9 shadow-md rounded-lg sm:my-1 lg:w-48 md:w-36 sm:min-w-full'
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
          className='bg-blue-400 px-2 mx-2 rounded-lg text-white h-9 lg:mt-7 md:mt-2 sm:mt-2'
        >
          Search
        </button>
      </form>
    </div>
  )
}

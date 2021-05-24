import { FilterOptions, SortOption } from 'pages'
import { ReactElement } from 'react'
import Dropdown from './Dropdown'

const pokemonTypes = [
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
  interface DropdownSortOption {
    name: string
    type: SortOption
  }

  const sortOptions: DropdownSortOption[] = [
    { name: 'Lowest Number (First)', type: SortOption.Lowest },
    { name: 'Highest Number (First)', type: SortOption.Highest },
    { name: 'A-Z', type: SortOption.Atoz },
    { name: 'Z-A', type: SortOption.Ztoa },
  ]

  return (
    <form onSubmit={handleFormSubmit} className='flex justify-center'>
      <Dropdown
        options={pokemonTypes}
        onOptionSelect={(option) => {
          setFilterOptions({ ...filterOptions, type: option.name })
        }}
      />
      <Dropdown
        options={sortOptions}
        onOptionSelect={(option: DropdownSortOption) => {
          setSortOption(option.type)
        }}
      />
      <input
        className='mx-4 p-1'
        type='text'
        onChange={(e) =>
          setFilterOptions({ ...filterOptions, text: e.target.value })
        }
      />
      <button type='submit' className='bg-blue-400 py-1 px-4 rounded-md'>
        Search
      </button>
    </form>
  )
}

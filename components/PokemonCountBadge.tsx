import { ReactElement } from 'react'

interface PokemonCountBadgeProps {
  count: number
}

export default function PokemonCountBadge({
  count,
}: PokemonCountBadgeProps): ReactElement {
  return (
    <div className='bg-gray-200 flex w-56 shadow-md absolute left-2 top-2 rounded-md'>
      <h2 className='m-1 p-1 font-semibold'>Unique Pokemon:</h2>
      <span className='m-1 ml-2 p-1' data-testid='PokemonCount'>
        {count}
      </span>
    </div>
  )
}

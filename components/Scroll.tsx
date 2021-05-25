import { ReactElement, ReactNode } from 'react'

interface ScrollProps {
  children: ReactNode
}

export default function Scroll({ children }: ScrollProps): ReactElement {
  return (
    <div className='overflow-y-scroll h-screen/1.5 shadow-md border-gray-500 no-scrollbar'>
      {children}
    </div>
  )
}

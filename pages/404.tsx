import React, { ReactElement } from 'react'
import Link from 'next/link'

export default function PageNotFound(): ReactElement {
  return (
    <div className='bg-gray-300 h-screen'>
      <div className='text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <h1 className='text-2xl'>Uh oh! No Pokemon here</h1>
        <ul>
          <li>
            <Link href='/'>
              <a>Go back to home to see more Pokemon!</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

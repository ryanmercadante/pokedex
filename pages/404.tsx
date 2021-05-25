import React, { ReactElement } from 'react'
import Link from 'next/link'

export default function PageNotFound(): ReactElement {
  return (
    <div className='bg-gray-300 h-screen'>
      <div className='text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <h1 className='text-2xl mb-4'>Uh oh! No Pokemon here</h1>
        <Link href='/'>
          <a className='p-2 bg-blue-400 rounded-md text-white px-4'>
            Go back home
          </a>
        </Link>
      </div>
    </div>
  )
}

import Head from 'next/head'
import React from 'react'

export default function Layout({ title, children }) {
  return (
    <div className='bg-gray-300'>
      <Head>
        <title className='capitalize'>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-auto max-w-4xl pt-8 min-h-screen'>
        {children}
      </main>
    </div>
  )
}

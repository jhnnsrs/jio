import { Link } from 'react-router-dom'

import { forage } from '@tauri-apps/tauri-forage'
import { useEffect, useState } from 'react'
import { useStorage } from '../storage/storage-context'

export const Home: React.FC<{}> = (props) => {
  const { apps } = useStorage()

  return (
    <div className='h-screen w-full'>
      This feels like home{' '}
      <div className='grid gap-0 p-3'>
        {apps.map((app) => (
          <div className='border rounded border-gray-300 p-5'>
            <Link to={`/dashboard/${app.name}`}>Dashboard for {app.name}</Link>
          </div>
        ))}
      </div>
      <nav>
        <Link to='/setup'>Setup new App</Link>
      </nav>
    </div>
  )
}

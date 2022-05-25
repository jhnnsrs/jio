import { Link } from 'react-router-dom'

import { forage } from '@tauri-apps/tauri-forage'
import { useEffect, useState } from 'react'
import { useStorage } from '../storage/storage-context'

export const Home: React.FC<{}> = (props) => {
  const { apps } = useStorage()

  return (
    <div className='h-screen w-full p-6'>
      <div className='flex flex-col items-center'>
        <div className='text-center'>Welcome to</div>
        <div className='text-center text-5xl font-light mb-6'>Arkitekt</div>
        <div>
          {apps.length > 0 ? (
            <div className='flex flex-col items-center'>
              <div className='font-light text-center w-full'>
                Available apps
              </div>
              <div className='grid grid-cols-2 gap-2 p-3'>
                {apps.map((app) => (
                  <div className='border rounded border-gray-300 p-5'>
                    <Link to={`/dashboard/${app.name}`}>
                      Dashboard for {app.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='text-center'>No apps found yet</div>
          )}
        </div>
        <Link
          to='/setup'
          className='border rounded p-3 border-gray-400 font-light'
        >
          Setup new App
        </Link>
      </div>
    </div>
  )
}

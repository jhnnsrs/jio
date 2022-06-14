import { useField } from 'formik'
import React from 'react'

export type App = {
  name: string
  long: string
  description: string
  client_id: string
  client_secret: string
  client_type: string
  grant_type: string
  redirect_uri: string[]
  image: string
}

export const available_apps: App[] = [
  {
    name: 'wasser',
    description: 'Enables the website wasser to be using the platform',
    long: 'Wasser is a website that allows you to manage your lab. Nobody but you sees your data (purely a client)',
    client_id: 'PsdU71PlUYeC4hP4aDf8pTdm2Hv9xYKdrxCFI5RO',
    client_type: 'public',
    client_secret:
      '8jXSNhrH7fllN8cGjxg7y2Jl1INb22wlDSmUBepb9aRDGV3al5pfNzswS85MPEvpN5vnfrPkrIERQ6kcMHLiISr4HcYirivdtrnyMjFMlzKGvlCrwfkNJmtQgCLZmH4X',
    grant_type: 'authorization-code',
    redirect_uri: ['http://localhost:3000/'],
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'vault',
    description:
      'Enables our documentation nad playground website to be using your data',
    long: 'This allows you to play around with your own data on the developer documentation. This app will not be able to modify your data',
    client_id: 'Zvc8fwLMMINjcAxoaTBG2L6ATlV746D3Zc4T4Wiu',
    client_type: 'public',
    client_secret:
      'bPDJKpvrZkhqsIvytwJuuLv8SEKeybPaPeMVpIRtdByLUERtyES2v18Dm38PUbVO0myUFAwLzwyWjo4jk91Yrhlfn51DPXN7MxYCIRedXSaNabvINv8EKv3kcWSY8Wos',
    grant_type: 'authorization-code',
    redirect_uri: ['http://localhost:3001/'],
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'mikroJ',
    description: 'Use Fiji with the platform',
    long: 'Enables support for ImageJ and its makros',
    client_id: 'hmtwKgUO092bYBOvHngL5HVikS2q5aWbS7V1ofdU',
    client_type: 'public',
    client_secret:
      'V0RqJveg5391edG9EQ30n8JqQev1GI1CxhbHYMG6oJer5nxllpwPyjy9yfETemESzrysPUnqwAVAJSa0wHv2AdrUFGOzjwR2kBrscIHWrVRRYK4soFBYY4rTujpWiyWP',
    grant_type: 'authorization-code',
    redirect_uri: ['http://localhost:6767/'],
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'napari',
    description: 'Use Fiji with the platform',
    long: 'Enables Napari',
    client_id: 'go8CAE78FDf4eLsOSk4wkR4usYbsamcq0yTYqBiY',
    client_type: 'public',
    client_secret:
      'oO4eJgvv41Nkr9EaNAmZ5YI4WGgfJznUMW5ReGIcI6NsSXZiud3w3y2yGxdMf2WhEMdUKD6MMalLv1rlM8d6h5Q6vJR9vLbaKSHj2V5RpDrNVUWnJ1s2OmxiPSR6qoNH',
    grant_type: 'authorization-code',
    redirect_uri: ['http://localhost:6767/'],
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
]

export const AppSelectionField = ({ ...props }: any) => {
  const [field, meta, helpers] = useField(props)

  const toggleValue = async (item: App) => {
    if (field.value) {
      if (field.value.find((i: App) => i === item)) {
        helpers.setValue(field.value.filter((i: App) => i !== item))
      } else {
        helpers.setValue([...field.value, item])
      }
    } else {
      helpers.setValue([item])
    }
    console.log(field.value)
  }

  return (
    <>
      <div className='grid grid-cols-3 gap-2 mt-2'>
        {available_apps.map((app, i) => (
          <div
            className={`col-span-1 border rounded border-gray-400 cursor-pointer ${
              field.value &&
              field.value.find((i: App) => i === app) &&
              'bg-green-300 border-green-600 shadow-xl shadow-green-300/40'
            }`}
            key={i}
            onClick={() => toggleValue(app)}
          >
            <div className='flex flex-col items-center justify-center h-full p-6'>
              <div className='font-bold text-center'>{app.name}</div>
              <div className='font-light text-center'>{app.description}</div>
              <div className='text-sm'>{app.long}</div>
            </div>
          </div>
        ))}
      </div>

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  )
}

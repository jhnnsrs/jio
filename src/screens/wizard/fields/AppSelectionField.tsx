import { useField } from 'formik'
import React from 'react'

export type App = {
  name: string
  long: string
  description: string
  image: string
}

export const available_apps: App[] = [
  {
    name: 'wasser',
    description: 'Enables the website wasser to be using the platform',
    long: 'Wasser is a website that allows you to manage your lab. Nobody but you sees your data (purely a client)',
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'vault',
    description:
      'Enables our documentation nad playground website to be using your data',
    long: 'This allows you to play around with your own data on the developer documentation. This app will not be able to modify your data',
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'mikroJ',
    description: 'Use Fiji with the platform',
    long: 'Enables support for ImageJ and its makros',
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'napari',
    description: 'The workhorse',
    long: 'Use the napari plugin to visualize your data',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
]

export const AppSelectionField = ({ ...props }: any) => {
  const [field, meta, helpers] = useField(props)

  const toggleValue = async (item: string) => {
    if (field.value) {
      if (field.value.find((i: string) => i === item)) {
        helpers.setValue(field.value.filter((i: string) => i !== item))
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
              field.value.find((i: string) => i === app.name) &&
              'bg-green-300 border-green-600 shadow-xl shadow-green-300/40'
            }`}
            key={i}
            onClick={() => toggleValue(app.name)}
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

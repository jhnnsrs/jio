import { useField } from 'formik'
import React from 'react'

export type Service = {
  name: string
  long: string
  description: string
  image: string
}

export const available_services: Service[] = [
  {
    name: 'herre',
    description: 'The core of the platform',
    long: 'This includes authorization, authentificaiton, config management, and more',
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'mikro',
    description: 'The datalayer',
    long: 'Enables you to store, organize and monitor microscopy data',
    image:
      'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
  },
  {
    name: 'arkitekt',
    description: 'The workhorse',
    long: 'Communicates with every app in your lab, and keeps track on what is happening in the lab',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
  {
    name: 'fluss',
    description: 'Orchestrate your workflows',
    long: 'Allows you to design and run your workflows',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
  {
    name: 'port',
    description: 'Virtualize your nodes',
    long: 'Enables docker based virtualization of complex environments (helpful for Deep Learning)',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
  {
    name: 'hub',
    description: 'A full blown juypterhub',
    long: 'Access your computer resources from anywhere in nice juypter notebooks',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
  {
    name: 'vscode',
    description: 'A full blown vscode in the cloud',
    long: 'Access your computer resources and data from anywhere in nice vscode environemnts (uses third party)',
    image: 'https://logowik.com/content/uploads/images/coder1889.jpg',
  },
]

export const ServiceSelectionField = ({ ...props }: any) => {
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
        {available_services.map((app, i) => (
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

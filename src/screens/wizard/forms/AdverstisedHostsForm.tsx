import React from 'react'
import type { StepProps } from '../types'

export const AdverstisedHostsForm: React.FC<StepProps> = (props) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-9xl'> Hello!</div>
      <div className='font-light text-3xl mt-4'>
        Lets install the framework together
      </div>
      <div className=''>
        We will ask you to set up a few steps and then we can if everything is
        settled
      </div>
    </div>
  )
}

import { ErrorMessage, Field, FieldArray } from 'formik'
import React from 'react'
import type { StepProps } from '../types'

export const AdverstisedHostsForm: React.FC<StepProps> = ({ values }) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-6xl'> Allowed Hosts</div>
      <div className='font-light text-3xl mt-4'>
        {' '}
        The platform will be hosted on this associated adresses. Make sure these
        addresses point to this computer.
      </div>
      <div className='mt-4'>
        <FieldArray
          name='hosts'
          render={(arrayHelpers) => (
            <>
              <div
                className={`grid grid-cols-${Math.max(
                  values.hosts.length,
                  5
                )} gap-2 p-2 text-center w-1/2 m-auto`}
              >
                {values.hosts && values.hosts.length > 0 ? (
                  values.hosts.map((host: any, index: number) => (
                    <div
                      key={index}
                      className='border rounded border-gray-700 p-5 flex flex-col overflow-hidden'
                    >
                      <div className='flex-0 flex-row flex'>
                        <div className='flex-inital font-semibold'>
                          Host: {host}{' '}
                          {host == 'localhost' && (
                            <span className='text-green-500'>(local)</span>
                          )}
                        </div>
                        <div className='flex-grow'></div>
                        <div className='flex-initial'>
                          <button
                            type='button'
                            className='text-red-500 p-1'
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            X
                          </button>
                        </div>
                      </div>
                      <div className='flex-0 flex-row gap-2'>
                        <div className='flex-row flex gap-2 mt-1'>
                          <div className='font-light mr-3'> Address </div>
                          <Field
                            name={`hosts.${index}`}
                            className='border p-1 rounded border-gray-400'
                          />
                          <ErrorMessage name={`hosts.${index}`}>
                            {(msg) => <div className='bg-red-700'>{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='border rounded border-gray-700 p-5 flex flex-col col-span-6'>
                    {/* show this when user has removed all friends from the list */}
                    No hostname added. Needs to happen in the admin account
                  </div>
                )}
              </div>

              <button
                type='button'
                className='border cursor-pointer p-2  rounded shadow-xl shadow-green-400/20 border-green-500  disabled:invisible'
                onClick={() => arrayHelpers.push('')} // insert an empty string at a position
              >
                Add New Host
              </button>
            </>
          )}
        />
      </div>
    </div>
  )
}

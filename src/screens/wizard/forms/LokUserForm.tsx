import { ErrorMessage, Field, FieldArray, validateYupSchema } from 'formik'
import React from 'react'
import type { StepProps } from '../types'

export const LokUsersForm: React.FC<StepProps> = ({ errors, values }) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>About Loks.</div>
      <div className='font-light text-1xl mt-4'>
        <div className='font-light mt-5'>
          This should be the users that are allowed to sign into your platform.
          They will be able to sign in to the platform and use the features of
          the platform. They will however <b className='font-bold'>not</b> be
          able to access the administrative features of the platform.
        </div>
      </div>
      <div className='my-4 justify-center'>
        <FieldArray
          name='loks'
          render={(arrayHelpers) => (
            <>
              <div
                className={`grid grid-cols-${Math.max(
                  values.loks.length,
                  5
                )} gap-2 p-2 text-center w-1/2 m-auto`}
              >
                {values.loks && values.loks.length > 0 ? (
                  values.loks.map((loks: any, index: number) => (
                    <div
                      key={index}
                      className='border rounded border-gray-700 p-5 flex flex-col overflow-hidden'
                    >
                      <div className='flex-0 flex-row flex'>
                        <div className='flex-inital font-semibold'>
                          User: {loks.name} @{loks.username}
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
                          <div className='font-light mr-3'> Name </div>
                          <Field
                            name={`loks.${index}.name`}
                            className='border p-1 rounded border-gray-400'
                          />
                          <ErrorMessage name={`loks.${index}.name`}>
                            {(msg) => <div className='bg-red-700'>{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className='flex-row flex gap-2 mt-1'>
                          <div className='font-light mr-3'> Username</div>
                          <Field
                            name={`loks.${index}.username`}
                            className='border p-1 rounded border-gray-400'
                          />
                          <ErrorMessage name={`loks.${index}.username`}>
                            {(msg) => <div className='bg-red-700'>{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className='flex-row flex mt-1 '>
                          <div className='font-light mr-3'> Email</div>
                          <Field
                            name={`loks.${index}.email`}
                            type='email'
                            className='border p-1 rounded border-gray-400'
                          />
                          <ErrorMessage name={`loks.${index}.email`}>
                            {(msg) => <div className='bg-red-700'>{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className='flex-row flex mt-1'>
                          <div className='font-light mr-3'> Password</div>
                          <Field
                            name={`loks.${index}.password`}
                            type='password'
                            className='border p-1 rounded border-gray-400'
                          />
                          <ErrorMessage name={`loks.${index}.password`}>
                            {(msg) => <div className='bg-red-700'>{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className='flex-row flex mt-1'>
                          <div className='font-light mr-3'>
                            {' '}
                            Repeat Password
                          </div>
                          <Field
                            name={`loks.${index}.password_repeat`}
                            type='password'
                            className='border p-1 rounded border-gray-400'
                          />
                          <ErrorMessage name={`loks.${index}.password_repeat`}>
                            {(msg) => <div className='bg-red-700'>{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='border rounded border-gray-700 p-5 flex flex-col col-span-6'>
                    {/* show this when user has removed all friends from the list */}
                    No additional users added. Needs to happen in the admin
                    account
                  </div>
                )}
              </div>

              <button
                type='button'
                className='border cursor-pointer p-2  rounded shadow-xl shadow-green-400/20 border-green-500  disabled:invisible'
                onClick={() => arrayHelpers.push({})} // insert an empty string at a position
              >
                Add New User
              </button>
            </>
          )}
        />
      </div>
    </div>
  )
}

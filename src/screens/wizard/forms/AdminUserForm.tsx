import { ErrorMessage, Field } from 'formik'
import React from 'react'
import type { StepProps } from '../types'

export const AdminUserForm: React.FC<StepProps> = ({ errors }) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>About Superuser.</div>
      <div className='font-light text-1xl mt-4'>
        <div className='font-bold mt-5'>
          We recommend you to not login with this user account if you are not
          doing administrative work.
        </div>
      </div>
      <div className='my-4 text-center'>
        <div className='my-4'>
          <div className='font-light text-2xl my-1'>Super username?</div>
          <Field
            name='admin_username'
            className='text-center border border-gray-400 rounded p-2'
          />
          <ErrorMessage name='admin_username'>
            {(msg) => <div className='bg-red-700'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div className='font-light text-2xl my-1'>Super email address?</div>
        <Field
          type='email'
          name='admin_email'
          className='text-center border border-gray-400 rounded p-2'
        />
        <ErrorMessage name='admin_email'>
          {(msg) => <div className='bg-red-700'>{msg}</div>}
        </ErrorMessage>
        <div className='font-light text-2xl my-1'>Super password?</div>
        <Field
          type='password'
          name='admin_password'
          className='text-center border border-gray-400 rounded p-2'
        />
        <ErrorMessage name='admin_password'>
          {(msg) => <div className='bg-red-700'>{msg}</div>}
        </ErrorMessage>
      </div>
    </div>
  )
}

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikHandlers,
  FormikValues,
} from 'formik'
import { FormikWizard, RenderProps } from 'formik-wizard-form'
import React, { useEffect, useState } from 'react'
import { useCommunication } from '../communication/communication-context'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

export enum DockerConnectionStrategy {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}

export type DockerConfig = {
  strategy: DockerConnectionStrategy
  addr?: string
}

export type DockerStatus = {
  version: string
  memory: number
}

type StepProps = {
  errors: FormikErrors<FormikValues>
  values: FormikValues
  handleChange: FormikHandlers['handleChange']
}

export const AdminUserForm: React.FC<StepProps> = ({ errors }) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>About You!</div>
      <div className='font-light text-1xl mt-4'>
        This platform needs a superuser. This superuser is you! A superuser is a{' '}
        <b>complete</b> administator of the platform, and has full access to all
        the data. They will be be able to create new users, and manage all the
        users. Also they will have complete access to every users private data.
        <br />
        <br />
        In theory you can create as many superusers as you want, but one is
        required!
        <br />
        <div className='font-bold mt-5'>
          We recommend you to not login with this user account if you are not
          doing administrative work.
        </div>
      </div>
      <div className='my-4'>
        <div className='my-4'>
          <div className='font-light text-2xl my-1'>Super username?</div>
          <Field name='name' />
          <ErrorMessage name='name'>
            {(msg) => <div className='bg-red-700'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div className='font-light text-2xl my-1'>Super email address?</div>
        <Field type='email' name='email' />
        <ErrorMessage name='email'>
          {(msg) => <div className='bg-red-700'>{msg}</div>}
        </ErrorMessage>
        <div className='font-light text-2xl my-1'>Super password?</div>
        <Field type='password' name='password' />
        <ErrorMessage name='password'>
          {(msg) => <div className='bg-red-700'>{msg}</div>}
        </ErrorMessage>
      </div>
    </div>
  )
}

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

export const Greeting: React.FC<StepProps> = (props) => {
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

export const CheckDocker: React.FC<StepProps> = (props) => {
  const { call } = useCommunication()
  const [dockerStatus, setDockerStatus] = useState<DockerStatus | null>(null)
  const [advertise, setAdvertise] = useState<boolean>(false)

  useEffect(() => {
    call<DockerConfig, DockerStatus>('test_docker', {
      strategy: DockerConnectionStrategy.LOCAL,
    }).then((res) => setDockerStatus(res))
  }, [])

  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>
        Lets see if we can find docker..
      </div>
      <div className=''>
        {dockerStatus ? (
          <div className='text-center mt-6'>
            <div className='text-7xl mb-6'>🎉</div>
            Beautiful, we found docker on your system! <br></br>Your docker
            version is {dockerStatus.version}
          </div>
        ) : (
          <div className='text-center mt-6'>
            <div className='text-7xl mb-6'>😩</div>
            Docker seems to be not installed on your system. This won't work!
            Please make sure docker is installed and running on your system.
          </div>
        )}
      </div>
    </div>
  )
}

export const Setup: React.FC<{}> = (props) => {
  const { call } = useCommunication()

  const [finalValues, setFinalValues] = React.useState({})

  return (
    <FormikWizard
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        employerName: '',
        designation: '',
        totalExperience: '',
        city: '',
      }}
      onSubmit={(values: any) => {
        setFinalValues(values)
      }}
      validateOnNext
      activeStepIndex={0}
      steps={[
        {
          component: Greeting,
        },
        {
          component: CheckDocker,
        },
        {
          component: AdminUserForm,
          validationSchema: Yup.object().shape({
            email: Yup.string().email().required('First name is required'),
            name: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
          }),
        },
        {
          component: AdverstisedHostsForm,
          validationSchema: Yup.object().shape({
            host: Yup.string().required('Email is required'),
          }),
        },
      ]}
    >
      {({
        currentStepIndex,
        renderComponent,
        handlePrev,
        handleNext,
        isNextDisabled,
        isPrevDisabled,
      }: RenderProps) => {
        return (
          <div className='flex h-screen flex-col p-5'>
            <nav className='flex-none'></nav>
            <div className='w-full flex flex-grow'>
              <div className='flex-none'></div>
              <div className='grow'>{renderComponent()}</div>
              <div className='flex-initial'></div>
            </div>
            <div className='bg-red flex-initial text-center pb-3 gap-2 grid grid-cols-2'>
              <button
                disabled={isPrevDisabled}
                className='border rounded shadow-xl shadow-cyan-400/20 border-cyan-500 p-1 disabled:invisible'
                onClick={handlePrev}
              >
                Prev
              </button>
              <button
                disabled={isNextDisabled}
                className='border rounded shadow-xl shadow-green-400/20 border-green-500 p-1 disabled:invisible'
                onClick={handleNext}
              >
                {currentStepIndex === 2 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        )
      }}
    </FormikWizard>
  )
}

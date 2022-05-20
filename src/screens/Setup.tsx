import { Field, FormikErrors, FormikHandlers, FormikValues } from 'formik'
import { FormikWizard, RenderProps } from 'formik-wizard-form'
import React, { useEffect, useState } from 'react'
import { useCommunication } from '../communication/communication-context'
import * as Yup from 'yup'

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

export const AdminUserForm: React.FC<StepProps> = (props) => {
  return (
    <div>
      <Field type='email' name='email' placeholder='Email' />
      <Field as='select' name='color'>
        <option value='red'>Red</option>
        <option value='green'>Green</option>
        <option value='blue'>Blue</option>
      </Field>
    </div>
  )
}

export const AdverstisedHostsForm: React.FC<StepProps> = (props) => {
  return (
    <div>
      <Field name='host' placeholder='Host' />
    </div>
  )
}

export const Setup: React.FC<{}> = (props) => {
  const { call } = useCommunication()

  const [finalValues, setFinalValues] = React.useState({})

  return (
    <div className='bg-green-200 h-full w-full'>
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
            component: AdminUserForm,
            validationSchema: Yup.object().shape({
              email: Yup.string().required('First name is required'),
              color: Yup.string().required('Username is required'),
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
            <div className='bg-'>
              {renderComponent()}
              <div className='bg-red'>
                <button
                  disabled={isPrevDisabled}
                  className='bg-slate-600'
                  onClick={handlePrev}
                >
                  Previous
                </button>
                <button
                  disabled={isNextDisabled}
                  className='bg-slate-600'
                  onClick={handleNext}
                >
                  {currentStepIndex === 2 ? 'Finish' : 'Next'}
                </button>
              </div>
              <pre>{JSON.stringify(finalValues, null, 2)}</pre>
            </div>
          )
        }}
      </FormikWizard>
    </div>
  )
}

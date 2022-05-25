import {
  ErrorMessage,
  Field,
  FieldProps,
  FormikErrors,
  FormikHandlers,
  FormikValues,
  useField,
} from 'formik'
import { FormikWizard, RenderProps } from 'formik-wizard-form'
import React, { useEffect, useState } from 'react'
import { useCommunication } from '../communication/communication-context'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { open } from '@tauri-apps/api/dialog'
import { stringify } from 'yaml'
import { useStorage } from '../storage/storage-context'

export enum DockerConnectionStrategy {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}

export type DockerConfig = {
  strategy: DockerConnectionStrategy
  addr?: string
}

export type DockerApiStatus = {
  version: string
  memory: number
}

export type DockerInterfaceStatus = {
  ok: string
  error: string
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

export const AttentionSuperuser: React.FC<StepProps> = (props) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-9xl'>🔥</div>
      <div className='font-light text-3xl mt-8'>About the superuser!</div>
      <div className='mt-3'>
        This platform needs a superuser. And you will get to decide who that is!
        A superuser is a <b>complete</b> administator of the platform, and has
        full access to all the data. They will be be able to create new users,
        and manage all the users. Also they will have complete access to every
        users private data.
        <br />
        <div className='font-bold mt-5'>MAKE SURE THE PASSWORD IS SAFE</div>
        <div className='mt-2'>Understood?</div>
        <div>
          <Field type='checkbox' name='attention' className='h-10' />
        </div>
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

export const FileField = ({ ...props }: any) => {
  const [field, meta, helpers] = useField(props)

  const chooseFile = async () => {
    const res = await open({
      directory: true,
      title: 'Choose an App directory',
    })
    helpers.setValue(res)
  }

  return (
    <>
      <label>
        {field.value && <div className='font-light my-2'>{field.value}</div>}
        <button
          className='border shadow-xl shadow-gray-300/20 rounded border-gray-400 p-1'
          onClick={() => chooseFile()}
        >
          Choose File{' '}
        </button>
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  )
}

export type Service = {
  name: string
  long: string
  description: string
  image: string
}

export const available_services: Service[] = [
  {
    name: 'core',
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
    long: 'Enables docker based virtualization of your deep learning tasks',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
  {
    name: 'hub',
    description: 'A full blown juypterhub',
    long: 'Access your computer resources from anywhere in nice juypter notebooks',
    image: 'http://localhost:8090/static/images/arkitekt.png',
  },
  {
    name: 'hub',
    description: 'A full blown vscode in the cloud',
    long: 'Access your computer resources and data from anywhere in nice vscode environemnts (uses third party)',
    image: 'https://logowik.com/content/uploads/images/coder1889.jpg',
  },
]

const ServiceSelectionField = ({ ...props }: any) => {
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

const AppSelectionField = ({ ...props }: any) => {
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

export const AppStorage: React.FC<StepProps> = (props) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>
        Lets see if we can find a folder to store everything..
      </div>
      <div>
        <FileField name='appPath' />
      </div>
      <div className='text-center mt-6'>
        This folder will be used to store all of the data and the configuration
        of the platform. So make sure its big.. like really big
      </div>
    </div>
  )
}

export const ServiceSelection: React.FC<StepProps> = (props) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>
        Which services do you want to install
      </div>
      <div className='text-center mt-6'>
        Arkitekt is build around services that provide specific functionality.
        If you want the fully working example you will need to install every
        app.
      </div>
      <div className=''>
        <ServiceSelectionField name='services' />
      </div>
    </div>
  )
}

export const AppSelection: React.FC<StepProps> = (props) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>
        Which apps should be automatically configured to be able connect to the
        platform
      </div>
      <div className='text-center mt-6'>
        Arkitekt is build around apps that provide specific functionality. But
        because we care about data safety, apps need to fully authenticate
        themselves with the platform and negotiate access rights. You can
        already enable some of the standard apps that Arkitekt provides here, so
        that there is no need for configuration.
      </div>
      <div className=''>
        <AppSelectionField name='apps' />
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

export const Done: React.FC<StepProps> = (props) => {
  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-9xl'> Almost Done!</div>
      <div className='font-light text-3xl mt-4'>
        Please make sure your computer is connected to the internet and all
        unnecessary apps are closed. If you click next the app will be
        installed. Get a coffee ready... ☕
      </div>
    </div>
  )
}

export const CheckDocker: React.FC<StepProps> = (props) => {
  const { call } = useCommunication()
  const [showVersion, setShowVersion] = useState(false)
  const [dockerApiStatus, setDockerApiStatus] =
    useState<DockerApiStatus | null>(null)
  const [dockerInterfaceStatus, setDockerInterfaceStatus] =
    useState<DockerInterfaceStatus | null>(null)
  const [advertise, setAdvertise] = useState<boolean>(false)

  useEffect(() => {
    call<DockerConfig, DockerApiStatus>('test_docker', {
      strategy: DockerConnectionStrategy.LOCAL,
    }).then((res) => setDockerApiStatus(res))
  }, [])

  useEffect(() => {
    call<DockerConfig, DockerInterfaceStatus>('docker_version_cmd', {
      strategy: DockerConnectionStrategy.LOCAL,
    }).then((res) => setDockerInterfaceStatus(res))
  }, [])

  return (
    <div className='text-center h-full my-7'>
      <div className='font-light text-3xl mt-4'>
        Lets see if we can find docker..
      </div>
      <div className=''>
        {dockerInterfaceStatus ? (
          <div className='text-center mt-6'>
            <div className='text-7xl mb-6'>🎉</div>
            Beautfiul, we found docker on your system! <br></br>
            <button
              onClick={() => setShowVersion(!showVersion)}
              className='border rounded border-gray-700 p-1'
            >
              {showVersion ? 'Hide' : 'Show'} Version{' '}
            </button>
            <p className='font-light text-sm mt-6'>
              {showVersion && dockerInterfaceStatus.ok}
            </p>
            <div className='mt-6'>
              {dockerApiStatus ? (
                <>You also have access to monitor docker! Great!!!!</>
              ) : (
                <>
                  It appears docker is not running locally. We can monitor the
                  api for now
                </>
              )}
            </div>
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
  const { installApp } = useStorage()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    if (values.appPath) {
      let res = await call<any, { ok: string; error: string }>(
        'directory_init_cmd',
        {
          dirpath: values.appPath,
          yaml: stringify(values),
        }
      )

      let app = {
        name: 'arkitekt',
        dirpath: values.appPath,
      }

      if (res.ok) {
        installApp(app)
        navigate('/')
      }
    }
  }

  return (
    <FormikWizard
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        attention: false,
        apps: ['wasser'],
        services: ['core', 'mikro', 'arkitekt'],
        addressLine1: '',
        addressLine2: '',
        employerName: '',
        designation: '',
        totalExperience: '',
        appPath: '',
      }}
      onSubmit={handleSubmit}
      validateOnNext
      validateOnBlur
      activeStepIndex={0}
      steps={[
        {
          component: Greeting,
        },
        {
          component: CheckDocker,
        },

        {
          component: ServiceSelection,
          validationSchema: Yup.object().shape({
            services: Yup.array(Yup.string()).required(
              'Desired Modules Required'
            ),
          }),
        },
        {
          component: AppStorage,
          validationSchema: Yup.object().shape({
            appPath: Yup.string().required('App path is required'),
          }),
        },
        {
          component: AppSelection,
          validationSchema: Yup.object().shape({
            apps: Yup.array(Yup.string()).required('Desired Modules Required'),
          }),
        },
        {
          component: AttentionSuperuser,
          validationSchema: Yup.object().shape({
            attention: Yup.bool()
              .isTrue()
              .required('You need to understand this'),
          }),
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
          component: Done,
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
                {'Next'}
              </button>
            </div>
          </div>
        )
      }}
    </FormikWizard>
  )
}

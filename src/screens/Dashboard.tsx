import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHealth } from '../health/health-context'
import { ResponsiveGrid } from '../layout/ResponsiveGrid'
import { useCommunication } from '../communication/communication-context'

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

export const ServiceHealth = (props: { service: any }) => {
  return (
    <ResponsiveGrid>
      {props?.service?.ok &&
        Object.keys(props?.service?.ok).map((key) => (
          <div className='border rounded bg-green-200 border-green-600 bg-white p-3 shadow-xl'>
            <div className='font-light'>{key}</div>
            {JSON.stringify((props?.service?.ok as any)[key])}
          </div>
        ))}
      {props?.service?.error &&
        Object.keys(props?.service?.error).map((key) => (
          <div className='border rounded bg-red-200 border-red-600 bg-white p-3 shadow-xl'>
            <div className='font-light'>{key}</div>
            {JSON.stringify((props?.service?.error as any)[key])}
          </div>
        ))}
    </ResponsiveGrid>
  )
}

export const Dashboard: React.FC<{}> = (props) => {
  const { call } = useCommunication()
  const [dockerStatus, setDockerStatus] = useState<DockerStatus | null>(null)
  const [advertise, setAdvertise] = useState<boolean>(false)
  const { service } = useHealth()

  useEffect(() => {
    call<DockerConfig, DockerStatus>('test_docker', {
      strategy: DockerConnectionStrategy.LOCAL,
    }).then((res) => setDockerStatus(res))
  }, [])

  const advertiseEndpoint = () => {
    call('advertise_endpoint', {
      docker_addr: 'ssss',
    }).then((res) => console.log(res))
  }

  useEffect(() => {
    if (advertise) {
      advertiseEndpoint()
      const interval = setInterval(() => {
        advertiseEndpoint()
      }, 2000 || 3000)
      return () => clearInterval(interval)
    }
    return () => {}
  }, [advertise])

  return (
    <div className='h-full w-full p-3'>
      <div className='text-xl'>
        <Link to='/'>{'< Status'}</Link>
      </div>
      <div className='font-light mt-2'>Docker Status</div>
      {!!dockerStatus && (
        <div className='font-light text-sm mt-2'>
          DockerVersion: {dockerStatus.version}
          <br />
          Memory Usage: {dockerStatus.memory}
        </div>
      )}
      <div className='font-light mt-2'>Beacon Status</div>
      <button
        onClick={() => setAdvertise(!advertise)}
        className={`border rounded border-gray-300 shadow-xl p-2 mt-2 ${
          advertise ? 'bg-green-300' : 'bg-red-300'
        }`}
      >
        {advertise ? 'Active' : 'Not Active'}
      </button>
      <div className='font-light mt-2'>Arkitekt Status</div>
      <ServiceHealth service={service?.arkitekt} />
      <div className='font-light mt-2'>Mikro Status</div>
      <ServiceHealth service={service?.elements} />
      <div className='font-light mt-2'>Port Status</div>
      <ServiceHealth service={service?.port} />
      <div className='font-light mt-2'>Fluss Status</div>
      <ServiceHealth service={service?.fluss} />
    </div>
  )
}

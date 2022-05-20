import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

export const Dashboard: React.FC<{}> = (props) => {
  const { call } = useCommunication()
  const [dockerStatus, setDockerStatus] = useState<DockerStatus | null>(null)
  const [advertise, setAdvertise] = useState<boolean>(false)

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
    <div className='bg-green-200 h-full w-full'>
      Hallo darkness my old friend!!! React is working bitches
      {!!dockerStatus && (
        <p>
          DockerVersion: {dockerStatus.version}
          <br />
          Memory Usage: {dockerStatus.memory}
        </p>
      )}
      <button onClick={() => setAdvertise(!advertise)}>
        {advertise ? 'Stop' : 'Start'}
      </button>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>
  )
}

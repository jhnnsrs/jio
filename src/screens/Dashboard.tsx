import React, { useEffect, useState } from 'react'
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
    advertiseEndpoint()
    const interval = setInterval(() => {
      advertiseEndpoint()
    }, 2000 || 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='bg-green-200 h-full w-full'>
      Hallo darkness my old friend!!! React is working bitches
      {!!dockerStatus && (
        <p style={{ position: 'absolute' }}>
          DockerVersion: {dockerStatus.version}
          <br />
          Memory Usage: {dockerStatus.memory}
        </p>
      )}
    </div>
  )
}

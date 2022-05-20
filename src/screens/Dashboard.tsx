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

  return (
    <div className='bg-green-200 h-full w-full'>
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

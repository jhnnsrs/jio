import React, { useState } from 'react'
import { CommunicationProvider } from './communication/communication-provider'
import { HealthProvider } from './health/health-provider'
import { Dashboard } from './screens/Dashboard'
import { Setup } from './screens/Setup'

function App() {
  return (
    <CommunicationProvider>
      <HealthProvider>
        <Setup />
      </HealthProvider>
    </CommunicationProvider>
  )
}

export default App

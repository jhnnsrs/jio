import React, { useState } from 'react'
import { CommunicationProvider } from './communication/communication-provider'
import { HealthProvider } from './health/health-provider'
import { Dashboard } from './screens/Dashboard'

function App() {
  return (
    <CommunicationProvider>
      <HealthProvider>
        <Dashboard />
      </HealthProvider>
    </CommunicationProvider>
  )
}

export default App

import React, { useState } from 'react'
import { CommunicationProvider } from './communication/communication-provider'
import { Dashboard } from './screens/Dashboard'

function App() {
  return (
    <CommunicationProvider>
      <Dashboard />
    </CommunicationProvider>
  )
}

export default App

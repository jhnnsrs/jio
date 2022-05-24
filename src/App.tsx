import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CommunicationProvider } from './communication/communication-provider'
import { HealthProvider } from './health/health-provider'
import { Dashboard } from './screens/Dashboard'
import { Home } from './screens/Home'
import { Setup } from './screens/Setup'
import { StorageProvider } from './storage/storage-provider'

function App() {
  return (
    <CommunicationProvider>
      <HealthProvider>
        <StorageProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/setup' element={<Setup />} />
            <Route path='/dashboard/:id' element={<Dashboard />} />
          </Routes>
        </StorageProvider>
      </HealthProvider>
    </CommunicationProvider>
  )
}

export default App

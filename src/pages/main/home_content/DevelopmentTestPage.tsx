

import { Route, Routes} from 'react-router-dom';

import React from 'react'

import ColorPage from '../../colors/ColorPage';

export default function DevelopmentTestPage() {
  return (
    <Routes>
      <Route path='/color' element={<ColorPage />} />
    </Routes>
  )
}

import { Route, Routes, Link } from 'react-router-dom';

import React from 'react';

import ColorPage from '../../colors/ColorPage';

export default function DevelopmentTestPage() {
  return (
    <div>
      <div>
        <Link to="color">Go To Color Page</Link>
      </div>
      <Routes>
        <Route path="color" element={<ColorPage />} />
      </Routes>
    </div>
  );
}

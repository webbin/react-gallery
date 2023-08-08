import React from 'react';

import StationView from './StationView';

export default function StationPage() {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <StationView name="Station1" position={{ left: 100, top: 100 }} />
    </div>
  );
}

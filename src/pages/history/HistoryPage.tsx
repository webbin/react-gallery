import React from 'react';
import { Button } from '@mui/material';

export default function HistoryPage() {
  return (
    <div>
      <p>HistoryPage</p>
      <Button
        onClick={() => {
          window.history.pushState(null, '', '');
        }}
      >
        push state
      </Button>
    </div>
  );
}

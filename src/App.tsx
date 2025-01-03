import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const supabase = createClient("https://qcmoxylqpfgizlknsnop.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbW94eWxxcGZnaXpsa25zbm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1Mjk5NDYsImV4cCI6MjA1MTEwNTk0Nn0.IXax6J7ncbEgisfUoR_IS0vYsbUyfG8lpf0iK5uF5Lk")

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

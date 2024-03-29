// App.jsx

import React from 'react';
import MiApi from './components/MiApi.jsx';
import './App.css';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1 }}>
        <MiApi />
      </main>
      <footer className="text-center py-5">
        <p>&copy; 2024 Daniel Allendes</p>
      </footer>
    </div>
  );
};

export default App;

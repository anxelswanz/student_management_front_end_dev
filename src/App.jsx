import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App () {
  return (

    <div className='mainbox'>
      <Outlet />
    </div>
  );
}
export default App;

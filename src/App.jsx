/**
 * Component Name: App.jsx
 * Description: This is the main layout component for the application. It serves as the primary structure that contains the Outlet component where nested route components will be rendered.
 * Author: Yu Han
 * Created Date: 2024-04-05
 */

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

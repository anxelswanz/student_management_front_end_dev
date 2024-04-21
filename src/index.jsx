import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Programme from './page/programme/index'
import Modules from './page/modules/index'
import CourseWork from './page/coursework/index'
import Exam from './page/exam/index'
import Absence from './page/absence/index'
import Mytutor from './page/mytutor/index'
import Myprograme from './page/myprograme/index'

ReactDOM.render(

  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Programme />} />
        <Route path="/Programme" element={<Programme />} />
        <Route path="/Modules" element={<Modules />} />
        <Route path="/CourseWork" element={<CourseWork />} />
        <Route path="/Exam" element={<Exam />} />
        <Route path="/Absence" element={<Absence />} />
        <Route path="/Mytutor" element={<Mytutor />} />
        <Route path="/Myprograme" element={<Myprograme />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There&apos;s nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </HashRouter>
  ,
  document.getElementById('root'),
);

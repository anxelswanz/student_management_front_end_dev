/**
 * Component Name: Index.jsx
 * Description: Used to configure and manage all page routes.
 * Author: Yu Han
 * Created Date: 2024-04-11
 */

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
import AcademicHistory from './page/academichistory/index'
import Login from './page/Login/Login'
import Register from './page/Register/Register'
import MyTimetable from './page/mytabletime/index';
import AdminManagement from "./page/staff/management";
import AllWork from "./page/staff/allwork";
import StaffExam from "./page/staff/exam";
import StaffCoursework from "./page/staff/coursework";
import AbsenceHistory from "./page/staff/absencehistory";
import AssignStudent from "./page/staff/assignstudent";
import StudentAcademicHistoryDetail from "./page/staff/academichistorydetail";
import StudentAcademicHistory from "./page/staff/academichistory";
import AllTimetable from "./page/staff/alltimetable";
import StaffMyTimetable from "./page/staff/mytimetable";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        
        <Route path="/" element={<Login />} />

        <Route path="/Programme" element={<Programme />} />
        <Route path="/Modules" element={<Modules />} />
        <Route path="/CourseWork" element={<CourseWork />} />
        <Route path="/Exam" element={<Exam />} />
        <Route path="/Absence" element={<Absence />} />
        <Route path="/Mytutor" element={<Mytutor />} />
        <Route path="/AcademicHistory" element={<AcademicHistory />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MyTimetable" element={<MyTimetable />} />
        <Route path="/StudentAcademicHistory" element={<StudentAcademicHistory />} />
        <Route path={"/StudentAcademicHistory/:studentId"} element={<StudentAcademicHistoryDetail />} />
        <Route path={"/AssignStudent"} element={<AssignStudent />} />
        <Route path={"/AbsenceHistory"} element={<AbsenceHistory />} />
        <Route path={"/StaffCourseWork"} element={<StaffCoursework />} />
        <Route path={"/StaffExam"} element={<StaffExam />} />
        <Route path={"/AllWork"} element={<AllWork />} />
        <Route path={"/Management"} element={<AdminManagement />} />
        <Route path="/AllTimetable" element={<AllTimetable />} />
        <Route path="/StaffMyTimetable" element={<StaffMyTimetable />} />
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

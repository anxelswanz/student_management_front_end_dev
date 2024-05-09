import axios from "axios";

export const host = 'http://localhost:8080/';
export const moduleIdList = `${host}api/student/moduleIdList`;
export const moduleTime = `${host}api/student/moduleTime`;
export const programmeName = `${host}api/student/programmeName`;
export const programmeDes = `${host}api/student/programmeDes`;
export const updateProgrammeStatus = `${host}api/student/updateProgrammeStatus`;
export const moduleIdInfo = `${host}api/student/moduleIdInfo`;
export const moduleCredits = `${host}api/student/moduleCredits`;
export const moduleOverview = `${host}api/student/moduleOverview`;
export const studentId = `${host}api/student/studentId`;
export const moduleName = `${host}api/student/moduleName`;
export const courseworkMark = `${host}api/student/courseworkMark`;
export const courseworkDes = `${host}api/student/courseworkDes`;
export const courseworkTime = `${host}api/student/courseworkTime`;
export const uploadCoursework = `${host}/api/student/uploadCoursework`;
export const moduleExamInfo = `${host}api/student/moduleExamInfo`;
export const submitExam = `${host}api/student/submitExam`;
export const examMark = `${host}api/student/examMark`;
export const findEmail = `${host}api/student/findEmail`;
export const sendEmail = `${host}api/student/sendEmail`;
export const tutorInfo = `${host}api/student/tutorInfo`;
export const studyRecord = `${host}api/student/getMyAcademicHistory`;
export const uploadAbsence = `${host}/api/student/uploadAbsence`; // Submission of Absence data
export const absenceRecord = `${host}/api/student/absenceRecord`; 
export const choseProgramme = `${host}/api/student/choseProgramme`;
export const loginRequest = (id, password) => {
    return axios.post('http://localhost:3000/api/user/login', {
        name: id,
        password: password
    })
}
export const registerRequest = (url, formData) => {
    return axios.post(url, formData);
}
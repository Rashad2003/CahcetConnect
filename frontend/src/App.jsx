import { Routes, Route } from "react-router-dom";
import Student_Dashboard from "./pages/students/Student_Dashboard";
import ProtectedRoute from "../routes/ProtectedRoute";
import Announcements from "./pages/faculty/Announcements";
import Timetables from "./pages/faculty/Timetables"
import Results from "./pages/faculty/Results";
import StudyMaterials from "./pages/faculty/StudyMaterials";
import Attendance from "./pages/faculty/Attendance";
import SAttendance from "./pages/students/SAttendance";
import SStudyMaterials from "./pages/students/SStudyMaterials";
import SResults from "./pages/students/SResults";
import STimetables from "./pages/students/STimetables";
import SAnnouncements from "./pages/students/SAnnouncements"
import Navbar from "./components/Navbar";
import { SwitchPage } from "./pages/SwitchPage";
import Faculty_Dashboard from "./pages/faculty/Faculty_Dashboard";
import Student_Login from "./pages/students/Student_Login";
import Faculty_Login from "./pages/faculty/Faculty_Login";
import Faculty_Signup from "./pages/faculty/Faculty_Signup";
import Student_Signup from "./pages/students/Student_Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
const App = () => {
  const {setToken} = useContext(AuthContext);
  return (
    <>
      <Navbar/>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<SwitchPage />} />
        <Route path="/student/login" element={<Student_Login setToken={setToken}/>} />
        <Route path="/faculty/login" element={<Faculty_Login setToken={setToken}/>} />
        <Route path="/student/signup" element={<Student_Signup setToken={setToken}/>} />
        <Route path="/faculty/signup" element={<Faculty_Signup setToken={setToken}/>} />
        <Route path="/student/dashboard" element={<ProtectedRoute role="student"><Student_Dashboard /></ProtectedRoute>} />
        <Route path="/faculty/dashboard" element={<ProtectedRoute role="faculty"><Faculty_Dashboard /></ProtectedRoute>} />

        <Route path="/faculty/announcements" element={<ProtectedRoute role="faculty"><Announcements /></ProtectedRoute>} />
        <Route path="/faculty/timetables" element={<ProtectedRoute role="faculty"><Timetables /></ProtectedRoute>} />
        <Route path="/faculty/results" element={<ProtectedRoute role="faculty"><Results/></ProtectedRoute>} />
        <Route path="/faculty/study-materials" element={<ProtectedRoute role="faculty"><StudyMaterials/></ProtectedRoute>} />
        <Route path="/faculty/attendance" element={<ProtectedRoute role="faculty"><Attendance /></ProtectedRoute>} />

        <Route path="/student/announcements" element={<ProtectedRoute role="student"><SAnnouncements /></ProtectedRoute>} />
        <Route path="/student/timetables" element={<ProtectedRoute role="student"><STimetables /></ProtectedRoute>} />
        <Route path="/student/results" element={<ProtectedRoute role="student"><SResults/></ProtectedRoute>} />
        <Route path="/student/study-materials" element={<ProtectedRoute role="student"><SStudyMaterials/></ProtectedRoute>} />
        <Route path="/student/attendance" element={<ProtectedRoute role="student"><SAttendance /></ProtectedRoute>} />

      </Routes>
    </>
  );
};

export default App;
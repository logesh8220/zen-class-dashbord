
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Class from './Components/Class';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Sidbar from './Components/Sidbar';
import Signup from './Components/Signup';


function App() {
  return (
    <BrowserRouter>
      <Sidbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="login" element={<Login/>} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='class' element={<Class />}></Route>
          <Route path='admin' element={<AdminDashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

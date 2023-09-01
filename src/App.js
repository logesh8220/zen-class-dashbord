
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Class from './Components/Class';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Sidbar from './Components/Sidbar';
import Signup from './Components/Signup';
import { MyContextProvider } from './Components/MyContext';


function App() {
  return (
    <MyContextProvider>

    <BrowserRouter>
      <Sidbar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='class' element={<Class />}></Route>
          <Route path='admin' element={<AdminDashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;

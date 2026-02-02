import {Navigate, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import AppLayout from './components/AppLayout.jsx';
import Logout from './pages/Logout.jsx';
import UserLayout from './components/UserLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const [userdetails, setUserdetails] = useState(null);
  const[loading, setLoading] = useState(true);

  const isuserLoggedIn = async () => {
    try {
      const config = { withCredentials: true };
      const res = await axios.post('http://localhost:5001/auth/is-user-logged-in',{}, config);
      setUserdetails(res.data.user);
    } catch (error) {
      setUserdetails(null);
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isuserLoggedIn();
  }, []);

if (loading) {
  <div className="flex justify-center items-center h-screen">
    <h2 className="text-2xl font-bold">Loading...</h2>
  </div>
}
  
  
  return (
    <>
      <Routes>
        <Route path='/' element={
          userdetails ? 
          ( <Navigate to="/dashboard" /> ) :
           (<AppLayout>
          <Home/>
          </AppLayout>)
        }/>

        <Route path='/login' element={
          userdetails ? ( <Navigate to="/dashboard" /> ) :

          (<AppLayout>
          <Login setUserdetails={setUserdetails}/>
          </AppLayout>)
        }/>

        <Route path='/dashboard' element={
          userdetails ? 
          ( <UserLayout>
            <Dashboard userdetails={userdetails}/>
            </UserLayout> ) :
           ( <Navigate to="/login" /> )
        }/>
         
        <Route path='/logout' element={
          userdetails ? 
          ( <Logout setUserdetails={setUserdetails}/> ) :
           ( <Navigate to="/login" /> )
        }/>

         
      </Routes>



    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import ComplaintRegister from './Pages/ComplaintRegister'
import MyComplaints from './Pages/MyComplaints'
import AdminDashboard from './Pages/AdminDashboard'
import ComplaintDetails from './Pages/ComplaintDetails'
import ComplaintsAdmin from './Pages/ComplaintsAdmin'
import UserManagement from './Pages/UserManagement'
import { Toaster } from 'react-hot-toast'
import AdminUserView from './Pages/AdminUserView'

import Reports from './Pages/Reports'


function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id?' element={<Profile />} />
          <Route path='/complaint' element={<ComplaintRegister />} />
          <Route path='/mycomplaints' element={<MyComplaints />} />
          <Route path='/viewcomplaint/:id' element={<ComplaintDetails isAdmin={false} />} />
          
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/complaints' element={<ComplaintsAdmin />} />
          <Route path='/admin/viewcomplaint/:id' element={<ComplaintDetails isAdmin={true} />} />
          <Route path='/admin/users' element={<UserManagement />} />
          <Route path='/admin/users/:id' element={<AdminUserView/>}/>
          <Route path = '/admin/reports' element={<Reports/>}/>
          {/* </Route>
           <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="complaints" element={<ComplaintsAdmin />} />
            <Route path="viewcomplaint/:id" element={<ComplaintDetails isAdmin={true} />} />
            <Route path="users" element={<UserManagement />} />
          </Route> */}
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserContext from './UserContext'
import ApplicationsContext from './ApplicationsContext.jsx'
import JoblyApi from './api'
import './app.css'
import CompaniesList from './CompaniesList.jsx'
import CompanyDetail from './CompanyDetails.jsx'
import JobPage from './JobPage.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Profile from './Profile.jsx'
import Home from './Home.jsx'
import UserRoute from './UserRoute.jsx'
import AnonRoute from './AnonRoute.jsx'
import JoblyNav from './JoblyNav.jsx'

function App() {
  const [user, setUser] = useState(undefined)
  const [apps, setApps] = useState([])
  useEffect(() => {
    console.log('checking local storage')
    if(localStorage.user && localStorage.token){
      setUser(localStorage.user)
      JoblyApi.token = localStorage.token
      console.log('user set')
    }
  }, [])
  useEffect(() => {
    console.log('populating apps')
    if(JoblyApi.token!==undefined && user!==undefined){
      console.log(JoblyApi.token)
      console.log('user found')
      JoblyApi.getProfile(user).then(res => {
        setApps(res.user.applications)
      })
    }
  }, [user])
  const appsSet = new Set(apps)
  return (
    <UserContext.Provider value={[user, setUser]}>
      <ApplicationsContext.Provider value={[appsSet, setApps]}>
        <JoblyNav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route element={<UserRoute />}>
            <Route path="/companies" element={<CompaniesList/>} />
            <Route path="/companies/:handle" element={<CompanyDetail/>} />
            <Route path="/jobs" element={<JobPage/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route element={<AnonRoute />}>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Register/>} />
          </Route>
        </Routes>
      </ApplicationsContext.Provider>
    </UserContext.Provider>
  )
}

export default App

import { useContext } from "react";
import UserContext from "./UserContext";
import { Outlet, Route, Navigate } from "react-router-dom";

function AnonRoute({component: Component, path}){
  const [user, setUser] = useContext(UserContext)
  return(
    (user===undefined) ? <Outlet/> : <Navigate to='/' />
  )
}

export default AnonRoute
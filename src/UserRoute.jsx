import { useContext } from "react";
import UserContext from "./UserContext";
import { Outlet, Navigate } from "react-router-dom";

function UserRoute(){
  const [user, setUser] = useContext(UserContext)
  return(
    user ? <Outlet/> : <Navigate to='/' />
  )
}

export default UserRoute
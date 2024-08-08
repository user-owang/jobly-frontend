import { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

function Home(){
  const [user, setUser] = useContext(UserContext)
  let content = (
    <div>
      <Link to="/login" className="btn btn-primary">Log in</Link>
      <Link to='/signup' className="btn btn-primary">Sign up</Link>
    </div>
  )
  if(user){
    content = (<h2>Welcome back, {user}</h2>)
  }
  return(
    <>
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      {content}
    </>
  )
}

export default Home
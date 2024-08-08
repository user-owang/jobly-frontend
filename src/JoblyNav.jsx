import { useContext } from "react";
import UserContext from "./UserContext";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import JoblyApi from "./api";

function JoblyNav(){
  const [user, setUser] = useContext(UserContext)
  function handleLogout(){
    setUser(undefined)
    JoblyApi.token = undefined
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  let links = (
    <Nav>
      <NavItem>
        <NavLink
         tag={RRNavLink}
          to='/login'
        >
          Login
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RRNavLink}
          to='/signup'
        >
          Sign Up
        </NavLink>
      </NavItem>
    </Nav>
  )
  if (user){
    links = (
      <Nav>
      <NavItem>
        <NavLink
          to='/companies'
          tag={RRNavLink}
        >
          Companies
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to='/jobs'
          tag={RRNavLink}
        >
          Jobs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
         tag={RRNavLink}
          to='/profile'
        >
          Profile
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to='/'
          onClick={handleLogout}
        >
          Log out {user}
        </NavLink>
      </NavItem>
    </Nav>
    )
  }
  return(
    <Navbar container='fluid'>
      <NavbarBrand href='/'>
          Jobly
      </NavbarBrand>
      {links}
    </Navbar>
  )
}

export default JoblyNav
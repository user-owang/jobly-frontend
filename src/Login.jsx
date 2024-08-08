import {useState, useContext} from 'react'
import JoblyApi from './api'
import UserContext from './UserContext'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

function Login(){
  const [user, setUser] = useContext(UserContext)
  const [formData, setFormData] = useState({username:"",password:""})
  const navigate = useNavigate()
  function handleChange(evt){
    const {name,value} = evt.target
    setFormData((prev) => ({...prev, [name]: value}))
  }
  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await JoblyApi.login(formData)
      console.log(res)
      JoblyApi.token = res
      localStorage.token = res
      setUser(formData.username)
      localStorage.user = formData.username
      navigate('')
    } catch(err){
      console.log('incorrect login')
      setUser(undefined)
      alert(err.message)
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="username">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button color="primary">Login</Button>
    </Form>
  )
}

export default Login
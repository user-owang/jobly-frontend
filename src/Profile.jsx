import {useState, useEffect, useContext} from 'react'
import JoblyApi from './api'
import UserContext from './UserContext'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'

function Profile(){
  const [user, setUser] = useContext(UserContext)
  const [formData, setFormData] = useState({username:"", firstName:"", lastName:"", email:""})
  useEffect(() => {
    const res = JoblyApi.getProfile(user).then(res =>{
      delete res.user.isAdmin
      delete res.user.applications
      console.log(res.user)
      setFormData(res.user)
    })
  }, [])
  function handleChange(evt){
    const {name,value} = evt.target
    setFormData((prev) => ({...prev, [name]: value}))
  }
  function handleSubmit(e){
    e.preventDefault()
    try{
      let data = {firstName:formData.firstName, lastName: formData.lastName, email:formData.email}
      const res = JoblyApi.updateUser(formData.username, data)
      if(res.error){
        return alert(res.error)
      }
      alert('Profile updated')
    } catch(err){
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
          disabled={true}
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">
          First name
        </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">
          Last name
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>
      <Button color="primary">Save Changes</Button>
    </Form>
  )
}

export default Profile
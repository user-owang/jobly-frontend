import { useState, useContext } from "react";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handlePassword(evt) {
    setPassword2(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== password2) {
      return alert("Please ensure passwords match.");
    }
    try {
      const res = JoblyApi.registerUser(formData);
      JoblyApi.token = res.token;
      localStorage.token = res.token;
      setUser(formData.username);
      localStorage.user = formData.username;
      navigate("");
    } catch (err) {
      setUser(undefined);
      alert(err.message);
    }
  }

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm password</Label>
          <Input
            id="password2"
            name="password2"
            type="password"
            value={password2}
            onChange={handlePassword}
          />
        </FormGroup>
        <Button color="primary">Register</Button>
      </Form>
    </div>
  );
}

export default Register;

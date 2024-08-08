import { Link } from "react-router-dom"
import React, {useState, useEffect, useContext} from "react"
import ApplicationsContext from "./ApplicationsContext"
import UserContext from "./UserContext"
import {Button, Card, CardBody, CardTitle} from "reactstrap"
import JoblyApi from "./api"

function JobCard({job}){
  const [applied, setApplied] = useState(false)
  const [apps, setApps] = useContext(ApplicationsContext)
  const [user, setUser] = useContext(UserContext)
  useEffect(() => {
    if(apps.has(job.id)){
      setApplied(true)
    }
  },[])
  function applyHandler(){
    JoblyApi.applyJob(user,job.id).then(res =>{
      if(res.applied === job.id){
        setApplied(true)
        setApps([...apps, job.id])
      }
    })
  }

  let button = (
    <Button color="danger" onClick={applyHandler}>APPLY</Button>
  )
  if(applied){
    button = (
      <Button outline disabled color="danger">APPLIED</Button>
    )
  }
  if(job.company===undefined){
    return(
      <Card key={job.id}>
        <CardBody>
          <CardTitle>
            {job.title}
          </CardTitle>
          <p></p>
          <div>
            <small>{`Salary: ${job.salary}`}</small>
          </div>
          <div>
            <small>{`Equity: ${job.equity}`}</small>
          </div>
          {button}
        </CardBody>
      </Card>
    )
  } else{
    return(
      <Card key={job.id}>
        <CardBody>
          <CardTitle>
            {job.title}
          </CardTitle>
          <p>{job.company.name}</p>
          <div>
            <small>{`Salary: ${job.salary}`}</small>
          </div>
          <div>
            <small>{`Equity: ${job.equity}`}</small>
          </div>
          {button}
        </CardBody>
      </Card>
    )
  }
}
export default JobCard
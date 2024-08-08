import { Link } from "react-router-dom"
import React from "react"
import {Card, CardBody, CardTitle} from "reactstrap"

function CompanyCard({company}){
  return(
    <Link to={`/companies/${company.handle}`} key={company.handle}>
      <Card key={company.handle}>
        <CardBody>
          <CardTitle>
            {company.name}
          </CardTitle>
          <p>
            {company.description}
          </p>
        </CardBody>
      </Card>
    </Link>
  )
}
export default CompanyCard
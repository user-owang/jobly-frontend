import { useState } from "react";
import { Form, Row, Col, Label, Input, Button } from "reactstrap";
import JoblyApi from "./api.js";

function SearchBar({ searchTarget, changeState }) {
  const [query, setQuery] = useState();
  async function submitHandler(e) {
    e.preventDefault();
    if (searchTarget === "companies") {
      const companies = await JoblyApi.getCompanies(query);
      changeState(companies);
    }
    if (searchTarget === "jobs") {
      const jobs = await JoblyApi.getJobs(query);
      changeState(jobs);
    }
  }
  function changeHandler(e) {
    setQuery(e.target.value);
  }
  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col>
          <Label className="visually-hidden" for="query">
            Enter search term
          </Label>
          <Input
            id="query"
            name="query"
            placeholder="Enter search term..."
            type="text"
            value={query}
            onChange={changeHandler}
          />
        </Col>
        <Col>
          <Button>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;

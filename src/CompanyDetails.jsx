import JobsList from "./JobsList.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api.js";

function CompanyDetail() {
  const params = useParams();
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const res = JoblyApi.getCompany(params.handle).then((res) => {
        setCompany(res);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  if (loading) {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="container">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobsList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;

import JobsList from "./JobsList.jsx";
import SearchBar from "./SearchBar.jsx";
import { useEffect, useState } from "react";
import JoblyApi from "./api.js";

function JobPage() {
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      JoblyApi.getJobs().then((res) => {
        setJobs(res);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
      setLoading(false);
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
      <SearchBar searchTarget="jobs" changeState={setJobs} />
      <JobsList jobs={jobs} />
    </div>
  );
}

export default JobPage;

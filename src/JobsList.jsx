import JobCard from './JobCard.jsx'
import {useState} from 'react'

function JobsList({jobs}){
  const jobcards = jobs.map((job) => <JobCard key={job.id} job={job} />)
  return(
    <div className='job-list'>
      {jobcards}
    </div>    
  )
}

export default JobsList
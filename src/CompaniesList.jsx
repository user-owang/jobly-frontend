import { useEffect, useState } from 'react'
import SearchBar from "./SearchBar.jsx"
import CompanyCard from "./CompanyCard.jsx"
import JoblyApi from './api.js'

function CompaniesList(){
  const [companies, setCompanies] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    try{
      const res = JoblyApi.getCompanies().then(res => {
        setCompanies(res)
        setLoading(false)
      })
    } catch(err){
      setError(err)
      setLoading(false)
    }
  },[])
  if(loading){
    return(<div className="lds-facebook"><div></div><div></div><div></div></div>)
  }
  if(error){
    return(<p>{error.message}</p>)
  }
  const compCards = companies.map((comp) => <CompanyCard company={comp} />)
  return(
    <div>
      <SearchBar searchTarget="companies" changeState={setCompanies}/>
      {compCards}
    </div>
  )
}
export default CompaniesList
import { query, collection, where, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { db } from '../../config/firebase'

function Problems({complexity}) {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true)
      setData(null)
      const q = query(collection(db,'problems'), where('complexity','==',complexity))
      const data = await getDocs(q)
      const dt = data.docs.map((e)=>({...e.data(),id: e.id}))
      if(dt.length) setData(dt)
      setLoading(false)
    }
    if(complexity) fetchData()
  },[complexity])

  if(loading){
    return <h3>Loading...</h3>
  }

  if(!data){
    return <h3>No Data Found</h3>
  }
  return (
    <>
      <div className="row">
      {
        data.map((dt)=>{
          return <div key={dt.id} className="col-lg-3 col-md-4 col-sm-6">
            <Card
              header={dt.complexity}
              title={dt.title}
              buttonText="Solve"
              to={`problems/${dt.id}/solve`}
            />
          </div>
        })
      }
      </div>
    </>
  )
}

export default Problems
 
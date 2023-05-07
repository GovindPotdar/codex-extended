import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Description from './Description';
import Editor from './Editor';
import TestCaseContainer from './TestCaseContainer';


function Solve() {

  const { problemId } = useParams();
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showTestCases, setShowTestCases] = useState(false)
  const [submitedCode, setSubmitedCode] = useState('')

  useEffect(()=>{
    const fetchProblem = async()=>{
      setLoading(true)
      try{
        const problemData = await getDoc(doc(db, 'problems', problemId))
        const pb = problemData.data()
        if(pb) setProblem(pb)
      }catch(e){
        alert(e.message)
      }
      setLoading(false)
    }
    if(problemId) fetchProblem()
  },[])

  const handleRun = (code)=>{
    if(code.length === 0) return
    setSubmitedCode(code)
    setShowTestCases(true)
  }

  return (
    <>
     <div className="container-fluid">
      <div className='row mt-2'>
          <div className="col-lg-6 col-md-6 col-sm-12">
            {
              loading && <h3>Loading...</h3>
            }
            {
              !loading && problem && <Description {...problem} />
            }
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Editor problemId={problemId} handleRun={handleRun} />
          </div>
          {showTestCases && <TestCaseContainer handleClose={()=>setShowTestCases(false)} problemId={problemId} code={submitedCode}/>}
        </div>
     </div>
    </>
  )
}

export default Solve

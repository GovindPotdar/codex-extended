import React, { useEffect, useState, useRef} from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import TestCase from './TestCase'
import EventEmitter from 'eventemitter3'

function TestCaseContainer({problemId, handleClose, code}) {
  // console.log('container')
  // console.log(code)
  const [testCases, setTestCases] = useState([])
  const [loading, setLoading] = useState(false)
  const event = new EventEmitter()

  useEffect(()=>{
    const fetchTestCases = async()=>{
      setLoading(true)
      const q = query(collection(db, 'testCases'), where('problemId', '==', problemId))
      const testCasesData = await getDocs(q)
      const prepareTestCases = testCasesData.docs.map((test)=>({id: test.id, ...test.data()}))
      setTestCases(prepareTestCases)
      setLoading(false)
    }
    if(problemId) fetchTestCases()
  },[])

  return (
    <div className="offcanvas offcanvas-bottom show d-block" tabIndex="-1" aria-labelledby="offcanvasBottomLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Test Cases (*click on test case to see details)</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
      </div>
      <div className="offcanvas-body p-2" style={{height: '200px'}}>
        <div className='overflow-auto'>
          {
            loading && <h3>Loading Test Cases...</h3>
          }
          {
            !loading && testCases.map((test, index)=>{
              return <TestCase test={test} index={index} event={event} code={code} key={test.id} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TestCaseContainer

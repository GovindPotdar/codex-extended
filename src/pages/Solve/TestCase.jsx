import React, { useEffect, useRef, useState } from 'react'
import Spinner from '../../components/Spinner'
import axios from 'axios'
import qs from 'qs'
import TestCaseDetail from './TestCaseDetail'

function TestCase({test, code, index, event}) {
  // console.log(code)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('Not Started Yet')
  const [error, setError] = useState('')
  const [executedOutput, setExecutedOutput] = useState(null)
  const [showDetail, setShowDetail] = useState(false)


  const removeNewlineCharFromEnd = (str)=>{
    if (str.endsWith("\n")) {
      str = str.slice(0, -1);
    }
    return str
  }

  const checkOutput = (expectedOutput, output)=>{
    return removeNewlineCharFromEnd(expectedOutput) == removeNewlineCharFromEnd(output)
  }

  const checkTestCase = async()=>{
    setLoading(true)
    setStatus('Checking')
    try{
      let data = qs.stringify({
        'code': code,
        'language': 'py',
        'input': test.inputValue
      });
      let config = {
          method: 'post',
          url: 'https://api.codex.jaagrav.in',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
      };
      const outputData = await axios(config);
      const output = outputData.data
      if(output.error.length === 0 && checkOutput(test.outputValue, output.output)){
        setStatus('Success')
        setError('')
      }else{
        setStatus('Failure')
        setError(output.error)
      }
      setExecutedOutput(output.output)
    }catch(e){
      setError(e.message)
      setStatus('Request Failure')
    }
    setLoading(false)
    event.emit(`run-next-testcase-${index+1}`)
  }

  useEffect(()=>{
    let unSubSetTime = null
    event.once(`run-next-testcase-${index}`,()=>{
      checkTestCase()
    })

    if(index === 0){
      unSubSetTime = setTimeout(()=>{
        checkTestCase()
      },500)
    }
    return ()=>{
      if(index === 0) clearTimeout(unSubSetTime)
    }
  },[code])


  const color = ()=>{
    switch(status){
      case 'Checking':
        return 'secondary';
      case 'Failure':
        return 'danger';
      case 'Request Failure':
        return 'warning'
      case 'Success':
        return 'success';
      default:
        return 'secondary'
    }
  }

  const text = ()=>{
    switch(status){
      case 'Checking':
        return 'Test Case';
      case 'Failure':
        return 'Failed';
      case 'Request Failure':
        return 'Failed'
      case 'Success':
        return 'Passed';
      default:
        return 'Test Case'
    }
  }

  return (
    <>
      <button type="button" onClick={()=>setShowDetail(true)} disabled={status==='Checking' || status === 'Not Started Yet' } className={`btn btn-${color()} btn-sm m-1`}>{loading && <Spinner/>} {text()}</button>
      {showDetail && <TestCaseDetail color={color} status={status} executedOutput={executedOutput} error={error} test={test} handleClose={()=>setShowDetail(false)}/>}
    </>
  )
}

export default TestCase

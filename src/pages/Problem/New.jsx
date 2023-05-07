import React, { useState } from 'react'
import Form from './Form'
import {db} from '../../config/firebase'
import { setDoc, doc, updateDoc,addDoc, collection } from 'firebase/firestore'
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

function New() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const createProblem = async({title, complexity, description})=>{
    try{
      const data = await addDoc(collection(db, 'problems'),{
        title,
        complexity,
        description,
        isValid: true
      })
      return data
    }catch(e){
      alert(e.message)
    }
  }
  const updateProblem = async(problemId, fields)=>{
    await updateDoc(doc(db, 'problems', problemId),{...fields})
  }

  const createLanguageCode = async({code, problemId})=>{
    try{
      await setDoc(doc(db, 'languageCodes', v4()),{
        landCode: 'py',
        code,
        problemId
      })
    }catch(e){
      await updateProblem({isValid: false})
      alert(e.message)
    }
  }

  const createTestCases = async({input, output, problemId})=>{
    for(let index = 0; index < input.length; index++){
      try{
        await setDoc(doc(db, 'testCases', v4()),{
          inputValue: input[index],
          outputValue: output[index],
          problemId
        })
      }catch(e){
        await updateProblem({isValid: false})
        alert(e.message)
      }
    }
  }

  const handleNewProblemSubmit = async (data)=>{
    console.log(data)
    setLoading(true)
    const problem = await createProblem({...data})
    if(problem){
      const problemId = problem.id
      await createLanguageCode({code: data.code, problemId: problemId})
      await createTestCases({input: data.input, output: data.output, problemId: problemId})
      navigate('/')
    }
    setLoading(false)
  }


  return (
    <div className='container mt-3'>
      <Form loading={loading} handleNewProblemSubmit={handleNewProblemSubmit}/>
    </div>
  )
}

export default New

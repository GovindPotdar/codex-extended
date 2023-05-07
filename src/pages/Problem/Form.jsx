import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from 'react-hook-form';
import Spinner from '../../components/Spinner';

function Form({ loading, handleNewProblemSubmit }) {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [numOfTestCaseFields, setNumOfTestCaseFields] = useState(1);

  useEffect(() => {
    register('description', { required: true })
  })

  const error = (fieldName)=>{
    // if(fieldName == 'input') console.log(errors)
    const errorType = errors[fieldName]
    if(errorType){
      switch (errorType.type) {
        case 'required':
          return `${fieldName} is required.`;
        default:
          return 'unkown error.';
      }
    }
  }

  return (
    <div className='p-2 mb-3'>
      <form onSubmit={handleSubmit(handleNewProblemSubmit)}>
        <button type='submit' disabled={loading} className='btn btn-primary'> {loading && <Spinner />} Save</button>
        <hr />
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" {...register('title', { required: true })} className="form-control" placeholder="title" />
          <span className='error'>{error('title')}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Complexity</label>
          <select className="form-select" {...register('complexity', { required: true })} aria-label="Default select example">
            <option value=''>Choice Complexity</option>
            <option value="easy">Easy</option>
            <option value="mideam">Mideam</option>
            <option value="hard">Hard</option>
          </select>
          <span className='error'>{error('complexity')}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Discription</label>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              setValue('description', data)
              // trigger('input')
            }}
          />
          <span className='error'>{error('description')}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Demo code ( Python )</label>
          <textarea className="form-control" {...register('code', { required: true })} rows="5"></textarea>
          <span className='error'>{error('code')}</span>
        </div>
        <div>
          <h2 className="form-label">Test Cases</h2>
          {
            [...Array(numOfTestCaseFields)].map((e, i) => {
              return <div className='row' key={i}>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Input</label>
                    <textarea className="form-control" {...register(`input.${i}`, { required: true })} rows="3"></textarea>
                    {/* <span className='error'>{error(`input`)}</span> */}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Expected Output</label>
                    <textarea className="form-control" {...register(`output.${i}`, { required: true })} rows="3"></textarea>
                    {/* <span className='error'>{error(`output`)}</span> */}
                  </div>
                </div>
              </div>
            })
          }
          <span className='btn btn-primary btn-sm rounded-pill' onClick={() => setNumOfTestCaseFields((num) => num + 1)}> Add more test case</span>
        </div>
        <hr />
        <button type='submit' disabled={loading} className='btn btn-primary'> {loading && <Spinner />} Save</button>
      </form>
    </div>
  )
}

export default Form

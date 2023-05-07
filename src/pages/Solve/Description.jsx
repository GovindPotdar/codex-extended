import React from 'react'

function Description({title, description, isValid, complexity}) {
  return (
    <div className='ms-2 overflow-auto' style={{height: '90vh'}}>
      <h4>{title}</h4>
      <span className="badge text-bg-primary">{complexity}</span>
      <hr/>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  )
}

export default Description

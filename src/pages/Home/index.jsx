import React, { useContext, useEffect, useState } from 'react'
import Card from '../../components/Card'
import UserContext from '../../contexts/UserContext'
import Problems from './Problems'

function Home() {
  const user = useContext(UserContext)
  const [complexity, setComplexity] = useState('easy')

  return (
    <>
      <div className="container mt-2">
        {user.isAdmin && < Card
          header="Add Problem"
          title='Add problem here'
          buttonText="+ Add"
          to='/problems/new'
        />}
        <hr />
        <nav className="nav nav-pills flex-column flex-sm-row mb-2">
          <span type='button' className={`border border-primary-subtle flex-sm-fill text-sm-center nav-link ${complexity === 'easy' ? 'active':''}`} onClick={()=>setComplexity('easy')}>Easy</span>
          <span type='button' className={`border border-primary-subtle flex-sm-fill text-sm-center nav-link ${complexity === 'mideam' ? 'active':''}`} onClick={()=>setComplexity('mideam')}>Mideam</span>
          <span type='button' className={`border border-primary-subtle flex-sm-fill text-sm-center nav-link ${complexity === 'hard' ? 'active':''}`} onClick={()=>setComplexity('hard')}>Hard</span>
        </nav>
        <Problems complexity={complexity} />
      </div>
    </>
  )
}

export default Home

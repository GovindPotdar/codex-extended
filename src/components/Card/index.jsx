import React from 'react'
import { Link } from 'react-router-dom'

function Card({header, title, buttonText, to}) {
  return (
    <div className="card border-info mb-3" style={{'maxWidth': '18rem'}}>
      <div className="card-header">{header}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link to={to} className="btn btn-sm btn-primary">{buttonText}</Link>
      </div>
    </div>
  )
}

export default Card

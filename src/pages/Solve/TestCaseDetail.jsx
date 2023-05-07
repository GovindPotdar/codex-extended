import React from 'react'

function TestCaseDetail({status, error, test, executedOutput, color, handleClose}) {
  return (
    <div className={`modal d-block bg-${color()} bg-opacity-50`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content bg-${color()}`}>
          <div className="modal-header">
            <h5 className="modal-title">{status}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {error.length !== 0 && <div className="col-12 p-2 mb-1 bg-light border rounded">
                <p>Error : </p>
                <pre>{error}</pre>
              </div>}
              <div className="col-12 p-2 mb-1 bg-light border rounded">
                <p>Input : </p>
                <pre>{test.inputValue}</pre>
              </div>
              <div className="col-6 bg-light mb-1 border rounded">
                <p>Expected Output : </p>
                <pre>{test.outputValue}</pre>
              </div>
              <div className="col-6 bg-light mb-1 border rounded">
                <p>Your Output : </p>
                <pre>{executedOutput}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestCaseDetail

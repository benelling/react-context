import React from 'react'

const ErrorBanner = ({ message }) => {
  
  let errorMessage = message || 'Something went wrong'
  return (
    <div style={{ backgroundColor: 'orange', display: 'inline-block' }}>{errorMessage}</div>
  )
}

export default ErrorBanner
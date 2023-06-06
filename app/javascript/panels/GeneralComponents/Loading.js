import { CSpinner } from '@coreui/react-pro'
import React from 'react'

const Loading = () => {
  return (
    <div>
      <strong> Cargando ...</strong>
      <CSpinner color="info" />
    </div>
  )
}

export default Loading
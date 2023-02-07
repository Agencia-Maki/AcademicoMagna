import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
        Académico
        </a>
        <span className="ms-1">&copy; { new Date().getFullYear() } Hefziba.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Desarrollado por la </span>
        <a href="https://agenciamaki.com" target="_blank" rel="noopener noreferrer">
          Agencia Maki
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGift,
  faLaptopFile
  } from '@fortawesome/free-solid-svg-icons'

import { CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav =  [
  {
    component: CNavTitle,
    name: 'Gestionar mis Cursos',
  },
  {
    component: CNavItem,
    name: 'Mis Programas',
    to: '/programas',
    icon: <FontAwesomeIcon icon={faLaptopFile} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Cursos Bonus',
    to: '/programas/bonus',
    icon: <FontAwesomeIcon icon={faGift} inverse className="me-4 ms-1" size='lg'/>,
  }
]

export default _nav
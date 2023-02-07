// import administrador from './custom_navs/administrador'

// const current_user_rol = JSON.parse(localStorage.getItem('current_user')).roleable_type

// const _nav = [
// ]

// // console.log(current_user_rol)

// if (current_user_rol === undefined) {
//   // _nav.push(asesor_comercial)
// }else {
//   switch (current_user_rol) {
//     case "System":
//       _nav.push(...root)
//       break
//     case "Admin":
//       _nav.push(...administrador)
//       break
//     case "Teacher":
//       _nav.push(...administrador)
//       break
//     case "Student":
//       _nav.push(...administrador)
//       break
//     default:
//       break
//   }
// }

// export default _nav


import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGaugeHigh, 
  faFileSignature, 
  faUserAstronaut, 
  faMeteor,
  faUsersViewfinder,
  faHeadSideVirus,
  faPeopleGroup
  } from '@fortawesome/free-solid-svg-icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav =  [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    }
  },
  {
    component: CNavTitle,
    name: 'Aula Virtual',
  },
  {
    component: CNavItem,
    name: 'Programas',
    to: '/programas',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Profesores',
    to: '/profesores',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Alumnos',
    to: '/alumnos',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Matriculas',
    to: '/matriculas',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavTitle,
    name: 'Area Administrativa',
  },
  {
    component: CNavItem,
    name: 'Gestionar Administrativos',
    to: '/roles',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Roles y Permisos',
    to: '/roles',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Reportes',
    to: '/reportes',
    icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  } 
]

export default _nav
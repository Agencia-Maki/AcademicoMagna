import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGaugeHigh, 
  faFileSignature, 
  faPersonChalkboard,
  faUserGraduate,
  faLaptopFile,
  faIdCard
  } from '@fortawesome/free-solid-svg-icons'

import { CNavItem, CNavTitle } from '@coreui/react-pro'

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
    icon: <FontAwesomeIcon icon={faLaptopFile} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Profesores',
    to: '/profesores',
    icon: <FontAwesomeIcon icon={faPersonChalkboard} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Alumnos',
    to: '/alumnos',
    icon: <FontAwesomeIcon icon={faUserGraduate} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavItem,
    name: 'Matriculas',
    to: '/matriculas',
    icon: <FontAwesomeIcon icon={faFileSignature} inverse className="me-4 ms-1" size='lg'/>,
  },
  {
    component: CNavTitle,
    name: 'Area Administrativa',
  },
  {
    component: CNavItem,
    name: 'Fichas de Alumnos',
    to: '/fichas-alumnos',
    icon: <FontAwesomeIcon icon={faIdCard} inverse className="me-4 ms-1" size='lg'/>,
  },
  // {
  //   component: CNavItem,
  //   name: 'Roles y Permisos',
  //   to: '/roles',
  //   icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Reportes',
  //   to: '/reportes',
  //   icon: <FontAwesomeIcon icon={faGaugeHigh} inverse className="me-4 ms-1" size='lg'/>,
  // } 
]

export default _nav
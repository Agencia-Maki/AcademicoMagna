import React from 'react';

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))

const Professors = React.lazy(() => import('./components/Professors/Professors'))
const NewProfessor = React.lazy(() => import('./components/Professors/NewProfessor'))

const Students = React.lazy(() => import('./components/Students/Students'))
const NewStudent = React.lazy(() => import('./components/Students/NewStudent'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },

  { path: '/profesores', exact: true, name: 'Docentes', element: Professors },
  { path: '/profesores/nuevo', exact: true, name: 'Nuevo', element: NewProfessor },

  { path: '/profesores/editar/:id', exact: true, name: 'Editar', element: Dashboard },
  { path: '/profesores/ver/:id', exact: true, name: 'Ver', element: Dashboard },

  { path: '/alumnos', exact: true, name: 'Estudiantes', element: Students },  
  { path: '/alumnos/nuevo', exact: true, name: 'Nuevo', element: NewStudent },

  { path: '/alumnos/editar/:id', exact: true, name: 'Editar', element: Dashboard },  
  { path: '/alumnos/ver/:id', exact: true, name: 'Ver', element: Dashboard },

];

export default routes;
  
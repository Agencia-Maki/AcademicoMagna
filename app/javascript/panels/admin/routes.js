import React from 'react';

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))

const Professors = React.lazy(() => import('./components/Professors/Professors'))
const NewProfessor = React.lazy(() => import('./components/Professors/NewProfessor'))
const ShowProfessor = React.lazy(() => import('./components/Professors/ShowProfessor'))
const EditProfessor = React.lazy(() => import('./components/Professors/EditProfessor'))

const Students = React.lazy(() => import('./components/Students/Students'))
const NewStudent = React.lazy(() => import('./components/Students/NewStudent'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },

  { path: '/profesores', exact: true, name: 'Docentes', element: Professors },
  { path: '/profesores/nuevo', exact: true, name: 'Nuevo', element: NewProfessor },
  { path: '/profesores/ver/:id_professor', exact: true, name: 'Ver', element: ShowProfessor },
  { path: '/profesores/editar/:id_professor', exact: true, name: 'Editar', element: EditProfessor },

  { path: '/alumnos', exact: true, name: 'Estudiantes', element: Students },  
  { path: '/alumnos/nuevo', exact: true, name: 'Nuevo', element: NewStudent },

  { path: '/alumnos/ver/:id', exact: true, name: 'Ver', element: Dashboard },


  { path: '/alumnos/editar/:id', exact: true, name: 'Editar', element: Dashboard },  

];

export default routes;
  
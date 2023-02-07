import React from 'react';

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))

const Professors = React.lazy(() => import('./components/Professors/Professors'))
const NewProfessor = React.lazy(() => import('./components/Professors/NewProfessor'))
const ShowProfessor = React.lazy(() => import('./components/Professors/ShowProfessor'))
const EditProfessor = React.lazy(() => import('./components/Professors/EditProfessor'))

const Students = React.lazy(() => import('./components/Students/Students'))
const NewStudent = React.lazy(() => import('./components/Students/NewStudent'))
const ShowStudent = React.lazy(() => import('./components/Students/ShowStudent'))
const EditStudent = React.lazy(() => import('./components/Students/EditStudent'))


const Inscriptions = React.lazy(() => import('./components/Inscriptions/Inscriptions'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },

  { path: '/profesores', exact: true, name: 'Docentes', element: Professors },
  { path: '/profesores/nuevo', exact: true, name: 'Nuevo', element: NewProfessor },
  { path: '/profesores/ver/:id_professor', exact: true, name: 'Ver', element: ShowProfessor },
  { path: '/profesores/editar/:id_professor', exact: true, name: 'Editar', element: EditProfessor },

  { path: '/alumnos', exact: true, name: 'Estudiantes', element: Students },  
  { path: '/alumnos/nuevo', exact: true, name: 'Nuevo', element: NewStudent },
  { path: '/alumnos/ver/:id_student', exact: true, name: 'Ver', element: ShowStudent },
  { path: '/alumnos/editar/:id_student', exact: true, name: 'Editar', element: EditStudent },

  { path: '/matriculas', exact: true, name: 'Matriculas', element: Inscriptions }

];

export default routes;
  
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

const Programs = React.lazy(() => import('./components/Programs/Programs'))
const NewProgram = React.lazy(() => import('./components/Programs/NewProgram'))


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

  { path: '/programas', exact: true, name: 'Programas', element: Programs },  
  { path: '/programas/nuevo', exact: true, name: 'Nuevo', element: NewProgram },

  { path: '/programas/editar/:id', exact: true, name: 'Editar', element: Dashboard },
  { path: '/programas/ver/:id', exact: true, name: 'Ver', element: Dashboard },
  { path: '/programas/:id/modulos', exact: true, name: 'Modulos', element: Dashboard },

  { path: '/matriculas', exact: true, name: 'Matrículas', element: Inscriptions }

];

export default routes;
  
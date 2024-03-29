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

const StudentRecords = React.lazy(() => import('./components/StudentRecords'))

const Programs = React.lazy(() => import('./components/Programs/Programs'))
const NewProgram = React.lazy(() => import('./components/Programs/NewProgram'))
const ShowProgram = React.lazy(() => import('./components/Programs/ShowProgram'))
const EditProgram = React.lazy(() => import('./components/Programs/EditProgram'))
const CourseChapters = React.lazy(() => import('./components/Programs/Chapters'))

const Exams = React.lazy(() => import('./components/Exams/Exams'))
const NewExam = React.lazy(() => import('./components/Exams/NewExam'))
const EditExam = React.lazy(() => import('./components/Exams/EditExam'))
const ShowScores = React.lazy(() => import('./components/Exams/ShowScores'))

const Inscriptions = React.lazy(() => import('./components/Inscriptions/Inscriptions'))

const Certifications = React.lazy(() => import('./components/Certifications/Certifications'))


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

  { path: '/fichas-alumnos', exact: true, name: 'Fichas de Alumnos', element: StudentRecords },

  { path: '/programas', exact: true, name: 'Programas', element: Programs },  
  { path: '/programas/nuevo', exact: true, name: 'Nuevo', element: NewProgram },
  { path: '/programas/ver/:id_program', exact: true, name: 'Ver', element: ShowProgram },
  { path: '/programas/editar/:id_program', exact: true, name: 'Editar', element: EditProgram },
  { path: '/programas/:id_program/modulos', exact: true, name: 'Modulos', element: CourseChapters },

  { path: '/programas/:id_program/evaluaciones', exact: true, name: 'Evaluaciones', element: Exams },
  { path: '/programas/:id_program/evaluaciones/nuevo', exact: true, name: 'Nuevo', element: NewExam },
  { path: '/programas/:id_program/evaluaciones/:exam_id/editar', exact: true, name: 'Editar', element: EditExam },
  { path: '/programas/:course_id/evaluaciones/:exam_id/notas', exact: true, name: 'Notas', element: ShowScores },

  { path: '/matriculas', exact: true, name: 'Matrículas', element: Inscriptions },
  { path: '/certificaciones', exact: true, name: 'Certificaciones', element: Certifications }

];

export default routes;
  
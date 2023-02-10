import React from 'react';

const Courses = React.lazy(() => import('./components/Courses/Courses'))
const ShowCourse = React.lazy(() => import('./components/Courses/ShowCourse'))
const Exams = React.lazy(() => import('./components/Exams/Exams'))
const NewExam = React.lazy(() => import('./components/Exams/NewExam'))
const EditExam = React.lazy(() => import('./components/Exams/EditExam'))

const routes = [
  { path: '/', exact: true, name: 'Magna', element: Courses },
  { path: '/programas', exact: true, name: 'Mis Programas', element: Courses },
  { path: '/programas/ver/:program_id', exact: true, name: 'Ver Programa', element: ShowCourse },
  { path: '/programas/:program_id/evaluaciones/', exact: true, name: 'Evaluaciones', element: Exams },  
  { path: '/programas/:program_id/evaluaciones/nuevo', exact: true, name: 'Nueva Evaluación', element: NewExam },
  { path: '/programas/:program_id/evaluaciones/:exam_id/editar', exact: true, name: 'Editar', element: EditExam },

  { path: '/programas/:program_id/evaluaciones/:exam_id/entregas', exact: true, name: 'Calificar Evaluación', element: Courses },
  { path: '/programas/:program_id/evaluaciones/:exam_id/detalles', exact: true, name: 'Detalles de Evaluación', element: Courses },
  { path: '/programas/:course_id/evaluaciones/consolidado_notas', exact: true, name: 'Consolidado de Notas', element: Courses }
];

export default routes;

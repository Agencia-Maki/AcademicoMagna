import React from 'react';

const Courses = React.lazy(() => import('./components/Courses/Courses'))
const Bonus = React.lazy(() => import('./components/Courses/Bonus'))
const ShowCourse = React.lazy(() => import('./components/Courses/ShowCourse'))
const Exams = React.lazy(() => import('./components/Exams/Exams'))
const Answer = React.lazy(() => import('./components/Answer/Answer'))
const ShowCalification = React.lazy(() => import('./components/Exams/components/ShowCalification'))

const routes = [
  { path: '/', exact: true, name: 'Magna', element: Courses },
  { path: '/programas', exact: true, name: 'Mis Programas', element: Courses },
  { path: '/programas/bonus', exact: true, name: 'Bonus', element: Bonus },
  { path: '/programas/ver/:program_id', exact: true, name: 'Ver', element: ShowCourse },
  { path: '/programas/:program_id/evaluaciones', exact: true, name: 'Evaluaciones', element: Exams },  
  { path: '/programas/:program_id/evaluaciones/:exam_id/resolver', exact: true, name: 'Resolver', element: Answer },
  { path: '/programas/:program_id/evaluaciones/:exam_id/mis_notas', exact: true, name: 'Calificar', element: ShowCalification },
];

export default routes;

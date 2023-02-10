import React from 'react';

const Courses = React.lazy(() => import('./components/Courses/Courses'))
// const ShowCourse = React.lazy(() => import('./components/Courses/ShowCourse'))
// const Exams = React.lazy(() => import('./components/Exams/Exams'))
// const Answer = React.lazy(() => import('./components/Answer/Answer'))
// const ShowCalification = React.lazy(() => import('./components/Exams/extras/ShowCalification'))

const routes = [
  { path: '/', exact: true, name: 'Magna', element: Courses },
  { path: '/programas', exact: true, name: 'Mis Programas', element: Courses },
  { path: '/programas/ver/:id', exact: true, name: 'Ver', element: Courses },
  { path: '/programas/:id/evaluaciones', exact: true, name: 'Evaluaciones', element: Courses },
  { path: '/programas/:course_id/evaluaciones/:exam_id/resolver', exact: true, name: 'Resolver', element: Courses },
  { path: '/programas/:course_id/evaluaciones/:exam_id/mis_notas', exact: true, name: 'Calificar', element: Courses },
];

export default routes;

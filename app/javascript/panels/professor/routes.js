import React from 'react';

const Courses = React.lazy(() => import('./components/Courses/Courses'))
const ShowCourse = React.lazy(() => import('./components/Courses/ShowCourse'))


const routes = [
  { path: '/', exact: true, name: 'Magna', element: Courses },
  { path: '/programas', exact: true, name: 'Mis Programas', element: Courses },
  { path: '/programas/ver/:program_id', exact: true, name: 'Ver Programa', element: ShowCourse },
  { path: '/programas/:id/evaluaciones/', exact: true, name: 'Evaluaciones', element: Courses },
  
  { path: '/programas/:id/evaluaciones/nuevo', exact: true, name: 'Nueva Evaluación', element: Courses },
  { path: '/programas/:id/evaluaciones/:id/editar', exact: true, name: 'Editar', element: Courses },
  { path: '/programas/:id/evaluaciones/:exam_id/entregas', exact: true, name: 'Calificar Evaluación', element: Courses },
  { path: '/programas/:id/evaluaciones/:id/detalles', exact: true, name: 'Detalles de Evaluación', element: Courses },
  { path: '/programas/:course_id/evaluaciones/consolidado_notas', exact: true, name: 'Consolidado de Notas', element: Courses }
];

export default routes;

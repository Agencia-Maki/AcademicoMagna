import React, { useState, useEffect } from 'react'

import {
  CRow
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'
import CourseCard from './components/CourseCard'

const slowPayer = {
  name: 'Problemas con el pago :(',
  description: 'Al parecer tienes una deuda pendiente, si crees que esto es un error comunicate con la administracion al 958286668.',
  cover: {
    url: 'https://toyotireslatino.com/wp-content/uploads/2020/11/error-no-es-fracaso.jpg'
  },
  start_date: Date.now(),
  chapters: []
}

const Courses = () => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  const { getModelData: getCourses } = useCrud("")

  const [courses, setCourses] = useState([])

  const loadData = async () => {
    const coursesData = await getCourses(`/panel/student/${currentUser.id}/courses`)
    setCourses(coursesData.data)
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <CRow>
      {
        currentUser.status !== 'slow_payer' ?
          currentUser && courses.length > 0 ?
            courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
              >

              </CourseCard>
            )) : '' : <CourseCard course={slowPayer} typeCourse="slow_payer" />
      }

    </CRow>
  )
}

export default Courses;
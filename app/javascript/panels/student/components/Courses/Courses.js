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
  start_date: Date.now()
  // chapters: []
}

const Courses = () => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  const { getModelData: getPaidCourses, getModelData: getFreeCourses } = useCrud("")

  const [courses, setCourses] = useState([])
  const [freeCourses, setFreeCourses] = useState([])

  const loadData = async () => {
    const { data: paidcourses } = await getPaidCourses(`/panel/student/${currentUser.id}/courses`)
    setCourses(paidcourses)
    const { data: freecourses } = await getFreeCourses(`/panel/student/${currentUser.id}/free_courses`)
    setFreeCourses(freecourses)
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <CRow>
      {
        currentUser.status !== 'slow_payer' ?
          currentUser && courses.length > 0 ?
            courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              >

              </CourseCard>
            )) : '' : <CourseCard course={slowPayer} typeCourse="slow_payer" />
      }

      <hr />

      {
        currentUser.status !== 'slow_payer' && freeCourses.length > 0 &&
          freeCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))
      }

    </CRow>
  )
}

export default Courses;
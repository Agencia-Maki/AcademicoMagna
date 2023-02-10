import React, { useState, useEffect } from 'react'
import { CRow } from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'
import CourseCard from './components/CourseCard'

const Courses = () => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  const { getModelData: getCourses } = useCrud("")

  const [courses, setCourses] = useState([])

  const loadData = async () => {
    const coursesData = await getCourses(`/panel/professor/${currentUser.id}/courses`)
    setCourses(coursesData.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <CRow>
        {
          courses.length > 0 ? courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          )) : ''
        }
      </CRow>
    </>
  )
}

export default Courses
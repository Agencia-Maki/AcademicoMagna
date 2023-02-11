import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'

import Table from './components/Table';

import useCrud from '../../../../hooks/useCrud'

const Exams = () => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))

  const { 
    getModelData: getExams, 
    getModelData: getCourse
  } = useCrud("")

  const { program_id } = useParams()
  const [exams, setExams] = useState([])
  const [course, setCourse] = useState({})
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const examsDataQuery = await getExams(`/panel/student/courses/${program_id}/all_data_exams`)
    setExams(examsDataQuery.data.data)
    const courseDataQuery = await getCourse(`/panel/student/course/${program_id}`)
    setCourse(courseDataQuery.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      { exams && 
        <Table 
          course={course}
          exams={exams}
          currentUser={currentUser}
        />
      }
    </>
  )
}

export default Exams;
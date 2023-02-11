import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import useCrud from '../../../../hooks/useCrud'

import Table from './components/Table';
import { CSpinner } from '@coreui/react-pro'

const Exams = () => {
  const { getModelData: getExams, getModelData: getCourse,
    insertModelData: calificateExam
  } = useCrud("")
  const { program_id } = useParams()

  const [exams, setExams] = useState({})
  const [course, setCourse] = useState({})
  const [loading, setLoading] = useState(false)

  const handleCalificateExam = (exam) => {
    let current_date = new Date()
    let exam_date = new Date(exam.end)
    if (current_date > exam_date) {
      calificateExam({}, `/panel/professor/exams/${exam.id}/revise_exam`).then(response => {
        // if (response.data.status === 'ok') {
        //   toast.success(response.data.message, {theme: "dark"})
        //   setTimeout(() => { location.reload() }, 500)
        // } else {
        //   toast.error(response.data.message, {theme: "dark"})
        // }        
      }).catch(error => {
        console.log(error)
      })
    } else {
      alert("no se puede calificar aun falta para el examen")
    }
  }

  const handleModifyExamTime = (_exam, newEnd) => {
    let exam = { ..._exam }
    exam.end = newEnd

    if (newEnd > new Date()) {
      exam.status = 'on_hold'
    } else if (newEnd < new Date()) {
      exam.status = 'ungraded'
    }

    axios.put(`/panel/exams/${exam.id}/update_date_exam`, exam).then(response => {
      if (response.data.data.status === 'ok') {
        toast.success(response.data.data.message, { theme: "dark" })
        setTimeout(() => { location.reload() }, 500)
      } else {
        toast.error(response.data.data.message, { theme: "dark" })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const loadData = async () => {
    setLoading(true)
    const examsDataQuery = await getExams(`/panel/professor/courses/${program_id}/exams`)
    setExams(examsDataQuery.data)
    const courseDataQuery = await getCourse(`/panel/professor/course/${program_id}`)
    setCourse(courseDataQuery.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      {
        loading ? <CSpinner /> :
          <Table
            course={course}
            exams={exams}
            handleCalificateExam={handleCalificateExam}
            handleModifyExamTime={handleModifyExamTime}
          />
      }
    </>
  )
}

export default Exams
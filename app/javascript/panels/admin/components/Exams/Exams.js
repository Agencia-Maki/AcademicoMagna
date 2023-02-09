import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import useCrud from '../../../../hooks/useCrud'
import Table from './extras/Table'
import { passCsrfToken } from '../../../../helpers/csrftoken'
import axios from 'axios'

const url_ep = '/panel/admin/courses/:course_id/exams/'

const Exams = () => {
  const { id_program } = useParams();

  const [exams, setExams] = useState([])
  const [course, setCourse] = useState({})

  const url = url_ep.replace(':course_id', id_program)

  const { getModel } = useCrud(url)

  const handleCalificateExam = (exam) => {
    let current_date = new Date()
    let exam_date = new Date(exam.end)
    if (current_date > exam_date) {
      axios.post(`/panel/admin/exams/${exam.id}/revise_exam`, {}).then(response => {
        getModel(setExams, url)
        getModel(setCourse, `/panel/admin/courses/${id_program}`)
        if (response.data.status === 'ok') {
          toast.success(response.data.message, { theme: "dark" })
        } else {
          toast.error(response.data.message, { theme: "dark" })
        }
      }).catch(error => {
        console.log(error)
      })
    } else {
      alert("no se puede calificar aun falta para el examen")
    }
  }

  const handleEnableSetAnswers = (exam) => {
    axios.put(`/panel/admin/exams/${exam.id}/enable_set_answers`, {}).then(response => {
      getModel(setExams, url)
      getModel(setCourse, `/panel/admin/courses/${id_program}`)
      if (response.data.status === 'ok') {
        toast.success(response.data.message, { theme: "dark" })
      } else {
        toast.error(response.data.message, { theme: "dark" })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getModel(setExams, url)
    getModel(setCourse, `/panel/admin/courses/${id_program}`)
    passCsrfToken(document, axios)
  }, [])

  return (
    <>
      {exams.data && course &&
        <Table
          course={course}
          exams={exams}
          handleCalificateExam={handleCalificateExam}
          handleEnableSetAnswers={handleEnableSetAnswers}
        />
      }
    </>
  )
}

export default Exams
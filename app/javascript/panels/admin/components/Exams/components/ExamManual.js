import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormLabel, CFormInput
} from '@coreui/react-pro'

import axios from 'axios';
import { toast } from 'react-toastify';
import { passCsrfToken } from '../../../../../helpers/csrftoken'
import useChange from '../../../../../hooks/useChange'

const manualExamPrototype = {
  course_id: 0,
  name: '',
  file: '',
  type_exam: 'manual',
  start: '',
  end: '',
  percent: 0,
  exam_questions_attributes: []
}

const singleFile = {
  url: ''
}

const url = '/panel/admin/exams/'

const ExamManual = (props) => {
  const [file, setFile] = useState(singleFile)
  const { handleChangeFile } = useChange(manualExamPrototype)

  const handleSubmit = async (_exam) => {
    const formData = new FormData()
    formData.append('course_id', _exam.course_id)
    formData.append('name', _exam.name)
    formData.append('file', file)
    formData.append('type_exam', _exam.type_exam)
    formData.append('start', _exam.start)
    formData.append('end', _exam.end)
    formData.append('student_visibility', _exam.student_visibility)
    formData.append('percent', _exam.percent)

    await axios.post(url, formData).then(response => {
      setToast(response.data)
      setTimeout(() => {
        location.replace('/admins/dashboard/index#/programas/' + String(props.exam.course_id) + '/evaluaciones')
      }, 500)
    }).catch(error => {
      console.log(error)
    })
  }

  // PONERLO EN UN HELPER ADICIONAL MAS ADELANTE (REFACTORING)
  const setToast = (_data) => {
    if (_data.status === 'ok') {
      toast.success(_data.message, { theme: "dark" })
    } else {
      _data.message.map(message => {
        toast.error(message, { theme: "dark" })
      })
    }
  }

  useEffect(() => {
    passCsrfToken(document, axios)
  }, [])

  return (
    <CCol md={12}>
      <CCard>
        <CCardHeader>
          Examen con Calificacion Manual
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CFormLabel htmlFor="file">Archivo</CFormLabel>
            <CFormInput
              type="file"
              id="file"
              name="file"
              accept="*"
              multiple={false}
              onChange={(e) => handleChangeFile(e, setFile)}
            />
          </CRow>
          <CRow>
            <CCol>
              <CButton 
                color="success"
                size="sm"
                onClick={() => handleSubmit(props.exam)}
                className="float-end mt-3"
              >
                Registrar
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default ExamManual

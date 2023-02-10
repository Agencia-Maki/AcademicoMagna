import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react-pro'

import EditExamAuto from './components/EditExamAuto'
import EditExamManual from './components/EditExamManual'

const EditExam = () => {
  const { exam_id } = useParams()
  const [data, setData] = useState({})

  const getData = async () => {
    await axios.get(`/panel/professor/exams/${exam_id}`, {}).then(response => {
      setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <strong>Editar evaluacion</strong>
          </CCardHeader>
          <CCardBody>
            {data.exam && data.exam.type_exam === 'automatic' ?
              data.exam && <EditExamAuto exam={data.exam} /> :
              data.exam && <EditExamManual data={data} />}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditExam

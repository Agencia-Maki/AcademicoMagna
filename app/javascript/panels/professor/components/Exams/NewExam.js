import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm, CFormLabel, CFormInput, CFormSelect, CFormText
} from '@coreui/react-pro'


import ExamAuto from './components/ExamAuto'
import ExamManual from './components/ExamManual'

const initialPrototype = {
  course_id: 0,
  name: '',
  file: '',
  type_exam: '',
  student_visibility: '',
  start: '',
  end: '',
  percent: 0,
  exam_questions_attributes: [
    {
      score: 0,
      enunciate: '',
      feedback: '',
      question_options_attributes: [
        {
          enunciate: '',
          score: 0,
          status: 'incorrect'
        }
      ]
    }
  ]
}

const NewExam = () => {
  const [exam, setExam] = useState(initialPrototype)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { name, status, duration, percent, attempt, student_visibility } = exam;

  const { program_id } = useParams()

  const handleChange = e => {
    setExam({ ...exam, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setExam(
      {
        ...exam,
        start: startDate,
        end: endDate,
        course_id: parseInt(program_id)
      }
    )
  }, [startDate, endDate])

  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <strong>Nueva Evaluación</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs="12" md="3">
                  <CFormLabel htmlFor="type_exam">Tipo de Examen</CFormLabel>
                  <CFormSelect custom name="type_exam" id="type_exam" value={exam.type_exam} onChange={handleChange}>
                    <option value="">Sin Asignar</option>
                    <option value="manual"> Manual </option>
                    <option value="automatic"> Autoevaluado </option>
                  </CFormSelect>
                </CCol>
              </CRow>
              {exam.type_exam !== '' &&
                <>
                  <CRow className="mt-3">
                    <CCol md="8">
                      <CFormLabel htmlFor="name" className="text-primary text-bold">Nombre de evaluacion</CFormLabel>
                      <CFormInput id="name" name="name" className="form-horizontal" value={name} onChange={handleChange} />
                      <CFormText>Es necesario ingresar el nombre de la evaluacion.</CFormText>
                    </CCol>
                    <CCol md="4">
                      <CFormLabel htmlFor="status" className="text-primary text-bold">Estado del Examen</CFormLabel>
                      <CFormSelect custom name="status" id="status" value={status} onChange={handleChange}>
                        <option value="">Sin Asignar</option>
                        <option value="graded"> CALIFICADO - entregas deshabilitadas </option>
                        <option value="ungraded"> SIN CALIFICAR - entregas deshabilitadas </option>
                        <option value="on_hold"> EN ESPERA - entregas habilitadas </option>
                      </CFormSelect>
                      <CFormText>Es necesario seleccionar el estado de la evaluacion.</CFormText>
                    </CCol>
                  </CRow>

                  <CRow className="mt-3">
                    <CCol xs="12" md="4">
                      <CFormLabel htmlFor="percent" className="text-primary text-bold">Valor del Examen (porcentaje)</CFormLabel>
                      <CFormInput id="percent" name="percent" className="form-horizontal" value={percent} onChange={handleChange} />
                      <CFormText>Es necesario ingresar el valor de la evaluacion (valor numerico).</CFormText>
                    </CCol>
                    { exam.type_exam === 'automatic' && <CCol xs="12" md="4">
                      <CFormLabel htmlFor="duration" className="text-primary text-bold">Duracion del Examen</CFormLabel>
                      <CFormInput id="duration" name="duration" className="form-horizontal" value={duration ? duration : 0} onChange={handleChange} />
                      <CFormText>Es necesario ingresar la duracion (valor numerico).</CFormText>
                    </CCol> }
                    { exam.type_exam === 'automatic' && <CCol xs="12" md="4">
                      <CFormLabel htmlFor="attempt" className="text-primary text-bold">Numero de Intentos</CFormLabel>
                      <CFormInput id="attempt" name="attempt" className="form-horizontal" value={attempt ? attempt : 0} onChange={handleChange} />
                      <CFormText>Es necesario ingresar numero de intentos (valor numerico).</CFormText>
                    </CCol> }
                  </CRow>

                  <CRow className="mt-3">
                    <CCol xs="12" md="4">
                      <CFormLabel htmlFor="start" className="text-primary text-bold">Inicio de la evaluacion</CFormLabel>
                      <DateTimePicker className="form-control" onChange={setStartDate} value={startDate} format="dd/MM/y hh:mm a" />
                    </CCol>
                    <CCol xs="12" md="4">
                      <CFormLabel htmlFor="end" className="text-primary text-bold">Final de la evaluacion</CFormLabel>
                      <DateTimePicker className="form-control" onChange={setEndDate} value={endDate} format="dd/MM/y hh:mm a" />
                    </CCol>
                    <CCol md="4">
                      <CFormLabel htmlFor="student_visibility" className="text-primary text-bold">Estado del Examen</CFormLabel>
                      <CFormSelect custom name="student_visibility" id="student_visibility" value={student_visibility} onChange={handleChange}>
                        <option value="">Sin Asignar</option>
                        <option value="show_exam"> MOSTRAR - disponible para los alumnos </option>
                        <option value="hidden_exam"> OCULTAR - no disponible para los alumnos </option>
                      </CFormSelect>
                      <CFormText>Es necesario seleccionar el estado de la evaluacion.</CFormText>
                    </CCol>
                  </CRow>
                </>
              }
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      {exam.type_exam === 'automatic' && <ExamAuto exam={exam} setExam={setExam} />}
      {exam.type_exam === 'manual' && <ExamManual exam={exam} setExam={setExam} />}
    </CRow>
  )
}

export default NewExam
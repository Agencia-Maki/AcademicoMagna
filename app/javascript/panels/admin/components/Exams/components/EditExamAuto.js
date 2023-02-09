import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';

import { passCsrfToken } from '../../../../../helpers/csrftoken'
import useChange from '../../../../../hooks/useChange'
import useNotification from '../../../../../hooks/useNotification';

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CFormLabel, CFormInput, CFormSelect, CFormTextarea, CFormText
} from '@coreui/react-pro'

const EditExamAuto = (props) => {
  const currentExam = {
    ...props.exam,
    _destroy: null
  }
  const [exam, setExam] = useState(currentExam)
  const [startDate, setStartDate] = useState(new Date(exam.start))
  const [endDate, setEndDate] = useState(new Date(exam.end))

  const { data, handleChange } = useChange(exam)
  const { setToast } = useNotification()
  const { name, status, percent, duration, attempt, student_visibility } = data

  const addQuestion = (e) => {
    let temp = { ...exam };
    temp.exam_questions_attributes.push(
      {
        score: 0,
        enunciate: '',
        feedback: '',
        _destroy: null,
        question_options_attributes: []
      }
    );
    setExam(temp);
  };

  const addOption = (e, i) => {
    let temp = { ...exam };
    temp.exam_questions_attributes[i].question_options_attributes.push(
      {
        enunciate: '',
        score: 0,
        status: 'incorrect',
        _destroy: null
      },
    );
    setExam(temp);
  };

  const deleteQuestion = (e, i) => {
    let temp = { ...exam }
    // temp.exam_questions_attributes.splice(i, 1)
    temp.exam_questions_attributes[i]._destroy = "1"
    setExam(temp)
  }

  const deleteOption = (e, i, j) => {
    let temp = { ...exam }
    temp.exam_questions_attributes[i].score -= exam.exam_questions_attributes[i].question_options_attributes[j].score
    // temp.exam_questions_attributes[i].question_options_attributes.splice(j, 1)
    temp.exam_questions_attributes[i].question_options_attributes[j]._destroy = "1"
    setExam(temp)
  }

  const handleQuestionChange = (e, i) => {
    let temp = { ...exam }
    temp.exam_questions_attributes[i][e.target.name] = e.target.value
    setExam(temp)
  }

  const updateScoreByQuestion = (e, i) => {
    let result = 0
    exam.exam_questions_attributes[i].question_options_attributes.forEach(option => {
      result = option.status === 'correct' ? result += parseFloat(option.score) : result
    })
    result = result < 0 ? 0 : result

    let temp = { ...exam }
    temp.exam_questions_attributes[i].score = result
    setExam(temp)
  }

  const handleOptionChange = (e, i, j) => {
    let temp = { ...exam }
    temp.exam_questions_attributes[i].question_options_attributes[j][e.target.name] = e.target.value
    if (temp.exam_questions_attributes[i].question_options_attributes[j].status === 'incorrect') {
      temp.exam_questions_attributes[i].question_options_attributes[j].score = 0
    }
    // updateScoreByQuestion(e, i)
    setExam(temp)
  }

  const handleSubmit = async () => {
    let temp = {
      ...exam,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      attempt: data.attempt,
      name: data.name,
      duration: data.duration,
      percent: data.percent,
      status: data.status,
      student_visibility: data.student_visibility
    }

    // temp.exam_questions_attributes.forEach(question => {
    //   question.question_options_attributes.splice(0, 1)
    // })
    await axios.put(`/panel/admin/exams/${exam.id}`, temp).then(response => {
      goBack()
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const goBack = () => {
    location.replace(`/admins/dashboard/index#/programas/${exam.course_id}/evaluaciones`)
  }

  useEffect(() => {
    passCsrfToken(document, axios)
  }, [])


  return (
    <CCol md={12}>
      <CCard>
        <CCardBody>
          <CRow className='mt-3'>
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

          <CRow className='mt-3'>
            <CCol xs="12" md="4">
              <CFormLabel htmlFor="percent" className="text-primary text-bold">Valor del Examen (porcentaje)</CFormLabel>
              <CFormInput id="percent" name="percent" className="form-horizontal" value={percent} onChange={handleChange} />
              <CFormText>Es necesario ingresar el valor de la evaluacion (valor numerico).</CFormText>
            </CCol>
            <CCol xs="12" md="4">
              <CFormLabel htmlFor="duration" className="text-primary text-bold">Duracion del Examen</CFormLabel>
              <CFormInput id="duration" name="duration" className="form-horizontal" value={duration ? duration : 0} onChange={handleChange} />
              <CFormText>Es necesario ingresar la duracion (valor numerico).</CFormText>
            </CCol>
            <CCol xs="12" md="4">
              <CFormLabel htmlFor="attempt" className="text-primary text-bold">Numero de Intentos</CFormLabel>
              <CFormInput id="attempt" name="attempt" className="form-horizontal" value={attempt ? attempt : 0} onChange={handleChange} />
              <CFormText>Es necesario ingresar numero de intentos (valor numerico).</CFormText>
            </CCol>
          </CRow>

          <CRow className='mt-3'>
            <CCol xs="12" md="4">
              <CFormLabel htmlFor="start" className="text-primary text-bold">Inicio de la evaluacion</CFormLabel>
              <DateTimePicker onChange={setStartDate} value={startDate} format="dd/MM/y hh:mm a" />
            </CCol>
            <CCol xs="12" md="4">
              <CFormLabel htmlFor="end" className="text-primary text-bold">Final de la evaluacion</CFormLabel>
              <DateTimePicker onChange={setEndDate} value={endDate} format="dd/MM/y hh:mm a" />
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
          <>
            {
              exam && exam.exam_questions_attributes.map((question, i) => (
                !question._destroy && <CRow key={i} className="mt-3">
                  <CCol xs="12" md="12">
                    {/* <CFormLabel> Pregunta {i + 1} </CFormLabel> <h4 className="float-end">Puntaje: {question.score}</h4> */}
                    <CFormInput type="text" name="enunciate" onChange={e => handleQuestionChange(e, i)} value={exam.exam_questions_attributes[i].enunciate} />
                  </CCol>
                  <CCol xs="12" md="12">
                    <CButton size='sm' className="float-end mt-2" color='success' onClick={e => addOption(e, i)}>Agregar Opcion</CButton>
                  </CCol>

                  {
                    question.question_options_attributes.map((option, j) => (
                      <CRow key={j}>
                        {j >= 0 && !option._destroy && (
                          <>
                            <CCol xs="12" md="10" className="ml-5 mt-2">
                              <CFormLabel> Opcion {j + 1} </CFormLabel>
                              <CFormInput type="text" name="enunciate" onChange={e => handleOptionChange(e, i, j)}
                                value={exam.exam_questions_attributes[i].question_options_attributes[j].enunciate} />
                            </CCol>
                            <CCol xs="12" md="5" className="ml-5 mt-2">
                              <CFormLabel> Puntaje </CFormLabel>

                              {
                                exam.exam_questions_attributes[i].question_options_attributes[j].status === 'correct' ?
                                  <CFormInput type='text' name='score' placeholder='Puntaje'
                                    onChange={e => handleOptionChange(e, i, j)}
                                    value={exam.exam_questions_attributes[i].question_options_attributes[j].score}
                                  /> :
                                  <CFormInput disabled name='score' placeholder='Puntaje'
                                    onChange={e => handleOptionChange(e, i, j)}
                                    value={exam.exam_questions_attributes[i].question_options_attributes[j].score}
                                  />
                              }
                            </CCol>
                            <CCol xs="12" md="5" className=" mt-2">
                              <CFormLabel> Es correcta? </CFormLabel>

                              <CFormSelect custom name="status" id="status" value={exam.exam_questions_attributes[i].question_options_attributes[j].status} onChange={e => handleOptionChange(e, i, j)}>
                                <option value="incorrect"> Incorrecta </option>
                                <option value="correct"> Correcta </option>
                              </CFormSelect>
                            </CCol>

                            <CCol xs="12" md="10" className="ml-5 mt-2">
                              <CButton size='sm' color='danger'
                                onClick={e => deleteOption(e, i, j)}
                              >Borrar Opcion</CButton>
                              <CButton size='sm' className="float-end" color='success' onClick={e => addOption(e, i)}>Agregar Opcion</CButton>
                            </CCol>
                          </>
                        )}
                      </CRow>

                    ))
                  }
                  <CCol xs="12" md="12" className="mt-2">
                    <CFormLabel> Mensaje de Retro-Alimentacion </CFormLabel>
                    <CFormTextarea rows={4} name="feedback" onChange={e => handleQuestionChange(e, i)} value={exam.exam_questions_attributes[i].feedback} />
                  </CCol>

                  <CCol xs="12" md="12" className="mt-2">
                    <CButton color='primary' size='sm' onClick={e => addQuestion(e)}>Agregar Pregunta</CButton>
                    <CButton className="float-end" color='danger' size='sm'
                      onClick={e => deleteQuestion(e, i)}
                    >Borrar Pregunta</CButton>
                  </CCol>
                </CRow>
              ))
            }
            {exam.exam_questions_attributes.length < 1 && (
              <CButton className="me-5" color='primary' size='sm' onClick={e => addQuestion(e)}>Agregar Pregunta</CButton>
            )}
            <CButton color='success' className="me-4 mt-3" size='sm' onClick={() => handleSubmit()}>Guardar Examen</CButton>
            <CButton color='danger' className="mt-3" size='sm' onClick={() => goBack()}>Cancelar</CButton>
          </>
        </CCardBody>
      </CCard >
    </CCol >
  )
}

export default EditExamAuto

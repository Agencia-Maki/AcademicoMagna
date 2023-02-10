import React, { useEffect } from 'react';
import axios from 'axios';
import { passCsrfToken } from '../../../../../helpers/csrftoken'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormLabel, CFormInput, CFormSelect, CFormTextarea
} from '@coreui/react-pro'

const url = '/panel/professor/exams/'

const NewExam = (props) => {
  const { exam, setExam } = props

  const addQuestion = (e) => {
    let temp = { ...exam };
    temp.exam_questions_attributes.push(
      {
        score: 0,
        enunciate: '',
        feedback: '',
        question_options_attributes: [{}]
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
        status: 'incorrect'
      },
    );
    setExam(temp);
  };

  const deleteQuestion = (e, i) => {
    let temp = { ...exam }
    temp.exam_questions_attributes.splice(i, 1)
    setExam(temp)
  }

  const deleteOption = (e, i, j) => {
    let temp = { ...exam }
    temp.exam_questions_attributes[i].score -= exam.exam_questions_attributes[i].question_options_attributes[j].score
    temp.exam_questions_attributes[i].question_options_attributes.splice(j, 1)
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
    updateScoreByQuestion(e, i)
    setExam(temp)
  }

  const handleSubmit = async () => {
    let temp = { ...exam }
    temp.exam_questions_attributes.forEach(question => {
      question.question_options_attributes.splice(0, 1)
    })
    await axios.post(url, temp).then(response => {
      setTimeout(() => {
        location.replace('/professors/dashboard/index#/programas/' + String(props.exam.course_id) + '/evaluaciones')
      }, 300)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    passCsrfToken(document, axios)
  }, [])

  return (
    <CCol md={12}>
      <CCard>
        <CCardHeader>
          Examen con Calificacion Automatica
        </CCardHeader>
        <CCardBody>
          <>
            {
              exam.exam_questions_attributes.map((question, i) => (
                <CRow key={i}>
                  <CCol xs="12" md="12">
                    <CFormLabel> Pregunta {i + 1} </CFormLabel> <h4 className="float-end">Puntaje: {question.score}</h4>
                    <CFormInput type="text" name="enunciate" onChange={e => handleQuestionChange(e, i)} value={exam.exam_questions_attributes[i].enunciate} />
                  </CCol>
                  <CCol xs="12" md="12">
                    <CButton size='sm' className="float-end mt-2" color='success' onClick={e => addOption(e, i)}>Agregar Opcion</CButton>
                  </CCol>

                  {
                    question.question_options_attributes.map((option, j) => (
                      <CRow key={j}>
                        {j > 0 && (
                          <>
                            <CCol xs="12" md="10" className="ms-5 mt-2">
                              <CFormLabel> Opcion {j} </CFormLabel>
                              <CFormInput type="text" name="enunciate" onChange={e => handleOptionChange(e, i, j)}
                                value={exam.exam_questions_attributes[i].question_options_attributes[j].enunciate} />
                            </CCol>
                            <CCol xs="12" md="5" className="ms-5 mt-2">
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

                            <CCol xs="12" md="10" className="ms-5 mt-2">
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
            <CButton color='success' size='sm' className='mt-2' onClick={() => handleSubmit()}>Crear Examen</CButton>
          </>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default NewExam;
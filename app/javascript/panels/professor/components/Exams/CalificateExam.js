import React, { useState, useEffect } from 'react';
import { saveAs } from "file-saver"
import axios from 'axios';
import { toast } from 'react-toastify';
import SweetAlert2 from 'react-sweetalert2'

import { useParams } from 'react-router-dom'

import { passCsrfToken } from '../../../../helpers/csrftoken'
import useChange from '../../../../hooks/useChange'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
  CForm, CFormTextarea, CFormInput, CFormLabel,  
  CCol,
  CRow,
  CTooltip,
  CBadge,
  CButton
} from '@coreui/react-pro'
import { normalizeDateWithHour } from '../../../../helpers/normalizes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckToSlot,
  faCloudDownload,
  faPen,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons'

const url = "/panel/professor/exams/:exam_id/answers"
const url_answers_calification = "/panel/professor/answers/:answer_id/set_manual_score"
const url_get_exam = "/panel/professor/exams/:exam_id"

const initialScorePrototype = { feedback: "", score: 0 }

//id que viene por el props params = course_id

const CalificateExam = (props) => {
  const [answers, setAnswers] = useState({})
  const [students, setStudents] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState({})
  const [exam, setExam] = useState({})
  const [swalProps, setSwalProps] = useState({})
  const [typeModal, setTypeModal] = useState("")

  const { program_id, exam_id } = useParams()

  const { data, handleChange, resetData } = useChange(initialScorePrototype)

  const normalizeStatusEvaluation = (status) => {
    if (status === 'Sin presentar') {
      return <CBadge color="danger">Sin Presentar</CBadge>
    } else if (status === 'graded') {
      return <CBadge color="success">Calificado</CBadge>
    } else if (status === 'ungraded') {
      return <CBadge color="warning">Sin Calificar</CBadge>
    }
  }

  const getAnswers = async () => {
    const response = await axios.get(url.replace(':exam_id', exam_id))
    setAnswers(response.data.data)
  }

  const getListStudents = async () => {
    const response = await axios.get(`/panel/professor/courses/${program_id}/students`)
    setStudents(response.data.data)
  }

  const getExam = async () => {
    const response = await axios.get(url_get_exam.replace(':exam_id', exam_id))
    setExam(response.data.exam)
  }

  const saveFile = (_student_answer, _student) => {
    const file = _student_answer.file.url.split('.')
    saveAs(
      _student_answer.file.url,
      "entrega_" + _student.student_name + "." + file[file.length - 1]
    );
  }

  const getAnswerByStudent = (student) => {
    let finalAnswer = {
      student_id: student.student_id,
      status: "Sin presentar",
      updated_at: "Sin presentar",
      score: 0
    }

    answers.length > 0 && answers.forEach(answer => {
      if (answer.student_id === student.student_id) {
        finalAnswer = answer
        return finalAnswer
      }
    });
    return finalAnswer
  }

  const calificateIndividualAnswer = async () => {
    if (typeModal === 'normalCalificate') {
      const response = await axios.post(url_answers_calification.replace(':exam_id', currentAnswer.answer_id), {
        student_id: currentAnswer.student_id,
        student_answer_id: currentAnswer.answer_id,
        feedback: data.feedback,
        score: data.score,
        status: "graded",
        percent: exam.percent
      })
      if (response.data.status === "ok") {
        toast.success(response.data.message, { theme: "dark" })
        getAnswers()
        handleOpenModal(false)
      } else {
        toast.error(response.data.message, { theme: "dark" })
      }
    } else if (typeModal === 'setScore') {
      let finalData = {
        student_id: currentAnswer.student_id,
        exam_id: exam.id,
        percent: exam.percent,
        score: data.score,
        feedback: data.feedback
      }

      const response = await axios.post(`/panel/professor/exams/${finalData.exam_id}/set_special_score`, finalData)
      if (response.data.status === "ok") {
        toast.success(response.data.message, { theme: "dark" })
        getAnswers()
        handleOpenModal(false)
      } else {
        toast.error(response.data.message, { theme: "dark" })
      }
    }

  }

  // /exams/:exam_id/change_status
  const handleCloseCalifications = async () => {
    const response = await axios.post(`/panel/professor/exams/${exam_id}/revise_exam`, {})
    // axios.post(`/panel/professor/exams/${exam.id}/revise_exam`, {}).then(response => {
    if (response.data.status === "ok") {
      toast.success(response.data.message, { theme: "dark" })
      getAnswers()
      handleOpenModal(false)
      location.reload()
    } else {
      toast.error(response.data.message, { theme: "dark" })
    }
    setModalStatus(false)
    resetData()

  }

  const resetAllData = () => {
    setCurrentAnswer({})
    resetData()
  }

  const handleOpenModal = (action) => {
    if (action === false) {
      setModalStatus(action)
      resetAllData()
    } else {
      setModalStatus(action)
    }
  }

  const validateDateNowWithDateExam = (_exam) => {
    const dateNow = new Date()
    const dateEndExam = new Date(_exam.end)
    return dateNow >= dateEndExam && exam.status === "on_hold" ? <CButton
      color="danger"
      className="float-right mb-3"
      onClick={() => handleShowCloseCalifications()}
    >
      Cerrar Calificaciones
    </CButton> : null
  }

  function handleShowCloseCalifications() {
    setSwalProps({
      show: true,
      title: 'Estas seguro(a)?',
      text: 'cerrar las calificaciones de este examen?, recuerda que no podras volver a abrirlas',
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "red",
    });
  }

  const calculateWithPercent = (score) => {
    return parseFloat((score * exam.percent) / 100).toFixed(2)
  }

  const setButtonCalificateAnswer = (_answer) => {
    if (exam.status === "on_hold" && _answer.status === "ungraded") {
      return <CTooltip content="Calificar" placement="top-start">
        <CButton
          color="primary"
          size="sm"
          className="m-1"
          onClick={() => { handleOpenModal(true); setCurrentAnswer(_answer); setTypeModal('normalCalificate') }}
        >
          <FontAwesomeIcon icon={faCheckToSlot} size="lg" inverse />
        </CButton>
      </CTooltip>
    } else if (exam.status === "on_hold" && _answer.status === "graded") {
      return <CTooltip content="Editar Nota" placement="top-start">
        <CButton
          color="warning"
          size="sm"
          className="m-1"
          onClick={() => { handleOpenModal(true); setCurrentAnswer(_answer); setTypeModal('normalCalificate') }}
        >
          <FontAwesomeIcon icon={faPen} size="lg" inverse />
        </CButton>
      </CTooltip>
    } else if (exam.status === "graded") {
      return <CBadge color="info">Examen finalizado</CBadge>
    } else if (exam.status === "on_hold" && _answer.status === "Sin presentar") {
      return <CTooltip content="Ingresar Nota" placement="top-start">
        <CButton
          color="primary"
          size="sm"
          className="m-1"
          onClick={() => { handleOpenModal(true); setCurrentAnswer(_answer); setTypeModal('setScore') }}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="lg" inverse />
        </CButton>
      </CTooltip >
    }
  }

  useEffect(() => {
    passCsrfToken(document, axios)
    getAnswers()
    getListStudents()
    getExam()
  }, [])
  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              Entrega de los estudiantes:
            </CCardHeader>
            <CCardBody>
              {validateDateNowWithDateExam(exam)}

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className=""> # </th>
                    <th className=""> Nombre </th>
                    <th className="text-center"> Fecha de entrega </th>
                    <th className="text-center"> Estado </th>
                    <th className="text-center"> Archivo </th>
                    <th className="text-center"> Notas </th>
                    <th className="text-center"> Valor en el Curso </th>
                    <th className="text-center"> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students.length > 0 && students.map((student, index) => (
                      <tr key={student.student_id}>
                        <td> {index + 1} </td>
                        <td className=""> {student.student_name} </td>
                        {getAnswerByStudent(student).updated_at === "Sin presentar" ?
                          <td className="text-center"> <CBadge color="danger">Sin Presentar</CBadge> </td> :
                          <td className="text-center"> {normalizeDateWithHour(getAnswerByStudent(student).updated_at)} </td>}

                        <td className="text-center"> {normalizeStatusEvaluation(getAnswerByStudent(student).status)} </td>
                        {
                          exam.type_exam === 'manual' ?
                            getAnswerByStudent(student).file ?
                              <td className="text-center">
                                <CTooltip
                                  placement="top"
                                  content="Descargar entrega"
                                >
                                  <CButton
                                    color="info"
                                    size="sm"
                                    onClick={() => saveFile(getAnswerByStudent(student), student)}
                                  >
                                    <FontAwesomeIcon icon={faCloudDownload} size="lg" inverse />
                                  </CButton>
                                </CTooltip>
                              </td>
                              :
                              <td>
                                <CTooltip
                                  placement="top"
                                  content="No subio entrega"
                                >
                                  <CBadge color="danger">
                                    Sin presentar
                                  </CBadge>
                                </CTooltip>
                              </td>
                            :
                            <td className="text-center">
                              <CTooltip
                                placement="top"
                                content="No se necesita descargar un archivo"
                              >
                                <CBadge color="info">
                                  Examen Automatico
                                </CBadge>
                              </CTooltip>
                            </td>
                        }
                        <td className="text-center"> {getAnswerByStudent(student).score} </td>
                        <td className="text-center"> {calculateWithPercent(getAnswerByStudent(student).score)} </td>
                        <td className="text-center">
                          {setButtonCalificateAnswer(getAnswerByStudent(student))}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" backdrop="static" >
        {
          <div>
            <CModalHeader closeButton>
              <CModalTitle>
                Calificar Entrega de: <b> {currentAnswer && currentAnswer.student_name} </b>
              </CModalTitle>
            </CModalHeader>
            <CForm className="form-horizontal">
              <CModalBody>
                <CRow row>
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-score">Nota</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput
                      name="score"
                      type="number"
                      id="hf-score"
                      onChange={handleChange}
                      value={data.score}
                    />
                  </CCol>
                </CRow>
                <CRow row>
                  <CCol md="3">
                    <CFormLabel htmlFor="cal-feedback">Feedback</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormTextarea
                      name="feedback"
                      rows="4"
                      id="cal-feedback"
                      onChange={handleChange}
                      value={data.feedback}
                    />
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="danger"
                  onClick={
                    () => { handleOpenModal(false) }
                  }
                >
                  Cancelar
                </CButton>
                <CButton color="success"
                  onClick={() => calificateIndividualAnswer()}
                >
                  Registrar
                </CButton>
              </CModalFooter>
            </CForm>
          </div>
        }
      </CModal>

      <SweetAlert2 {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={() => {
          setSwalProps({
            show: false
          });
        }}
        onConfirm={result => {
          handleCloseCalifications()
          // run when clieked in confirm and promise is resolved...
        }}
        onError={error => {
          // run when promise rejected...
        }}
        onResolve={result => {
          // run when promise is resolved...
        }}
      />
    </>
  )
}

export default CalificateExam

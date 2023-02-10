import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CBadge,
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
  CForm, CFormLabel,
  CButton
} from '@coreui/react-pro'
import DateTimePicker from 'react-datetime-picker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckToSlot,
  faClock,
  faEye,
  faPen,
  faSliders
} from '@fortawesome/free-solid-svg-icons'
import { normalizeDateWithHour } from '../../../../../helpers/normalizes'

const Table = (props) => {
  const { course, exams } = props

  const [currentExam, setCurrentExam] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [endDate, setEndDate] = useState(new Date());

  const handleOpenModal = (action, _exam = {}) => {
    setModalStatus(action)
    setCurrentExam(_exam)
  }

  const normalizeStatusEvaluation = (status) => {
    if (status === 'on_hold') {
      return <CBadge color="info">En espera</CBadge>
    } else if (status === 'graded') {
      return <CBadge color="success">Calificado</CBadge>
    } else if (status === 'ungraded') {
      return <CBadge color="danger">Sin Calificar</CBadge>
    }
  }

  const normalizeTypeEvaluation = (type) => {
    if (type === 'automatic') {
      return <CBadge color="primary">Autoevaluado</CBadge>
    }
    else if (type === 'manual') {
      return <CBadge color="primary">Manual</CBadge>
    }
  }

  const setButtonCalification = (_exam) => {
    if ((_exam.status === 'on_hold' && _exam.type_exam === 'manual') || _exam.status === 'ungraded') {
      return (
        <CTooltip content="Empezar a calificar las entregas" placement="top-start">
          <Link to={`/programas/${course.id}/evaluaciones/${_exam.id}/entregas`}>
            <CButton className="m-1 btn btn-primary btn-sm">
              <FontAwesomeIcon icon={faCheckToSlot} size='lg' inverse />
            </CButton>
          </Link>
        </CTooltip>
      )
    } else if (_exam.status === 'on_hold' && _exam.type_exam === 'automatic') {
      return (
        <CTooltip content="Calificar Examen" placement="top-start">
          <CButton
            className="m-1 btn btn-primary btn-sm"
            onClick={() => props.handleCalificateExam(_exam)}
          >
            <FontAwesomeIcon icon={faCheckToSlot} size='lg' inverse />
          </CButton>
        </CTooltip>
      )
    }
  }
  
  return (
    <>
     {course && exams &&
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                EVALUACIONES DEL CURSO: <b> {course.name} </b>
              </CCardHeader>
              <CCardBody>

                <Link
                  className="btn btn-sm btn-success float-end mb-3"
                  to={{
                    pathname: `/programas/${course.id}/evaluaciones/nuevo`
                  }}
                >
                  Registrar Nueva Evaluacion
                </Link>

                <CTooltip content="Ver consolidado de notas" placement="top-start">
                  <Link
                    className="btn btn-sm btn-info float-start mb-3"
                    to={{
                      pathname: `/programas/${course.id}/evaluaciones/consolidado_notas`
                    }}
                  >
                    Ver Consolidado de notas
                  </Link>
                </CTooltip>

                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className=""> # </th>
                      <th className=""> Nombre </th>
                      <th className=""> Inicio </th>
                      <th className=""> Fin </th>
                      <th className=""> Duracion </th>
                      <th className=""> Tipo de evaluacion </th>
                      <th className=""> Estado </th>
                      <th className=""> Acciones </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      exams.length && exams.map((exam, index) => (
                        <tr key={exam.id}>
                          <td> {index + 1} </td>
                          <td className=""> {exam.name} </td>
                          <td className=""> {normalizeDateWithHour(exam.start)} </td>
                          <td className=""> {normalizeDateWithHour(exam.end)} </td>
                          <td> {exam.duration} m </td>
                          <td className=""> {normalizeTypeEvaluation(exam.type_exam)}</td>
                          <td className=""> {normalizeStatusEvaluation(exam.status)}</td>
                          <td className="">

                            {
                              exam.type_exam === 'automatic' &&
                              <CTooltip content="Detalles del Examen" placement="top-start">
                                <Link
                                  className="m-1 btn btn-info btn-sm"
                                  to={{
                                    pathname: `/programas/${course.id}/evaluaciones/${exam.id}/detalles`,
                                    state: {
                                      editStatus: false
                                    },
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEye} size='lg' inverse />
                                </Link>
                              </CTooltip>
                            }

                            {exam.status !== "graded" && <CTooltip content="Editar Examen" placement="top-start">
                              <Link
                                className="m-1 btn btn-warning btn-sm"
                                to={{
                                  pathname: `/programas/${course.id}/evaluaciones/${exam.id}/editar`,
                                }}
                              >
                                <FontAwesomeIcon icon={faPen} size='lg' inverse />
                              </Link>
                            </CTooltip>}

                            {setButtonCalification(exam)}

                            {exam.status === 'graded' && <>
                              <CTooltip content="Ver Notas" placement="top-start">
                                <Link
                                  className="m-1 btn btn-success btn-sm"
                                  to={{
                                    pathname: `/programas/${course.id}/evaluaciones/${exam.id}/entregas`,
                                  }}
                                >
                                  <FontAwesomeIcon icon={faSliders} size='lg' inverse />
                                </Link>
                              </CTooltip>
                            </>
                            }

                            {exam.status !== 'graded' && <CTooltip content="Modificar Tiempo de Entrega" placement="top-start">
                              <CButton
                                className="m-1 btn btn-warning btn-sm"
                                onClick={() => handleOpenModal(true, exam)}
                              >
                                <FontAwesomeIcon icon={faClock} size='lg' />
                              </CButton>
                            </CTooltip>}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      }
      <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" >
        {
          <>
            <CModalHeader closeButton>
              <CModalTitle>
                Calificar Entrega de:
              </CModalTitle>
            </CModalHeader>
            <CForm className="form-horizontal">
              <CModalBody>
                <CRow>
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-score">Nueva fecha de entrega</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <DateTimePicker onChange={setEndDate} value={endDate} format="dd/MM/y hh:mm a" />
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
                  onClick={() => { props.handleModifyExamTime(currentExam, endDate); handleOpenModal(false) }}
                >
                  Registrar
                </CButton>
              </CModalFooter>
            </CForm>
          </>
        }
      </CModal> 
    </>
  )
}

export default Table
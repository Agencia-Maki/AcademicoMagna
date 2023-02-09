import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CBadge,
  CTooltip,
  CButton
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePen,
  faLock,
  faLockOpen,
  faPen,
} from '@fortawesome/free-solid-svg-icons'

import { normalizeDateWithHour } from '../../../../../helpers/normalizes'

const Table = (props) => {
  const { course } = props

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
      return <CBadge color="primary">Autoevaluado</CBadge>} 
    else if (type === 'manual') {
      return <CBadge color="primary">Manual</CBadge>
    }
  }

  return (
    <>
      { props.course && props.exams.data ?
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                EVALUACIONES DEL CURSO: <b> {props.course.name} </b>
              </CCardHeader>
              <CCardBody>
                <Link
                  className="btn btn-sm btn-success mb-3 float-end"
                  to={{
                    pathname: `/programas/${props.course.id}/evaluaciones/nuevo`
                  }}
                >
                  Nueva Evaluacion
                </Link>

                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className=""> # </th>
                      <th className=""> Nombre </th>
                      <th className=""> Inicio </th>
                      <th className=""> Limite </th>
                      <th className=""> Duración </th>
                      <th className=""> Intentos permitidos </th>
                      <th className=""> Tipo de evaluación </th>
                      <th className=""> Estado </th>
                      <th className=""> Acciones </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      props.exams.data.map((exam, index) => (
                        <tr key={exam.id}>
                          <td> {index + 1} </td>
                          <td className=""> { exam.name } </td>
                          <td className=""> { normalizeDateWithHour(exam.start) } </td>
                          <td className=""> { normalizeDateWithHour(exam.end) } </td>
                          <td> { exam.duration } </td>
                          <td> { exam.attempt } </td> 
                          <td className=""> { normalizeTypeEvaluation(exam.type_exam) }</td>
                          <td className=""> { normalizeStatusEvaluation(exam.status) }</td>
                          <td className="">

                            <CTooltip content="Editar Examen" placement="top-start">
                              <Link
                                className="m-1 btn btn-warning btn-sm"
                                to={{
                                  pathname: `/programas/${course.id}/evaluaciones/${exam.id}/editar`,
                                }}
                              >
                                <FontAwesomeIcon icon={faPen} inverse />
                              </Link>
                            </CTooltip>

                            { exam.status === 'graded' && <CTooltip content="Ver Notas" placement="top-start">
                              <Link
                                className="m-1 btn btn-success btn-sm"
                                to={{
                                  pathname: `/programas/${course.id}/evaluaciones/${exam.id}/notas`,
                                }}
                              >
                                <FontAwesomeIcon icon={faFilePen} inverse />
                              </Link>
                            </CTooltip> }

                            { exam.status !== 'graded' && <CTooltip content="Calificar Examen(Cerrar entregas)" placement="top-start">
                              <CButton
                                className="m-1 btn btn-primary btn-sm"
                                onClick={() => props.handleCalificateExam(exam)}
                              >
                                <FontAwesomeIcon icon={faLock} inverse />
                              </CButton>
                            </CTooltip> }

                            { exam.status === 'graded' && <CTooltip content="Habilitar entregas" placement="top-start">
                              <CButton
                                className="m-1 btn btn-info btn-sm"
                                onClick={() => props.handleEnableSetAnswers(exam)}
                              >
                                <FontAwesomeIcon icon={faLockOpen} inverse />
                              </CButton>
                            </CTooltip> }
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
        : <CSpinner color="primary" />
      }
    </>
  )
}

export default Table
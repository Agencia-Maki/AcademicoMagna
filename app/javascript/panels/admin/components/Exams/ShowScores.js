import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CBadge,
  CButton,
  CForm, CFormLabel, CFormInput,
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal
} from '@coreui/react-pro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
} from '@fortawesome/free-solid-svg-icons'

import useCrud from '../../../../hooks/useCrud'
import { normalizeDateWithHour } from '../../../../helpers/normalizes';

const initialScorePrototype = { score: 0 }

const url_answers_calification = "/panel/admin/answers/:answer_id/set_manual_score"
const ShowScores = () => {
  // destructuring data from props

  // const course_id = props.match.params.course_id
  const { exam_id, course_id } = useParams()
  // end point get scores
  const epg_scores = `/panel/admin/exams/${exam_id}/scores`
  const { getModel, updateModel } = useCrud(epg_scores)

  const [data, setData] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const [currentScore, setCurrentScore] = useState(initialScorePrototype)

  // open and close modal
  const handleOpenModal = (_status) => {
    setModalStatus(_status)
  }

  const handleChange = (e) => {
    setCurrentScore({
      ...currentScore,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (_data) => {
    updateModel(_data, url_answers_calification.replace(':answer_id', _data.id))
    setModalStatus(false)
    getModel(setData)
    setTimeout(() => {
      location.reload()
    }, 700)
  }

  // graded ungraded

  const set_badge_by_status = (_status) => {
    if (_status === "on_hold") {
      return <CBadge color="danger"> No presento </CBadge>
    } else if (_status === "graded") {
      return <CBadge color="success"> Calificado </CBadge>
    } else if (_status === "ungraded") {
      return <CBadge color="danger"> Sin Calificar </CBadge>
    } else {
      return <CBadge color="default"> Sin datos </CBadge>
    }
  }

  const set_badge_by_calification = (_score) => {
    if (_score >= 11 && _score <= 14) {
      return <CBadge color="warning"> Aprobado </CBadge>
    } else if (_score >= 14 && _score <= 20) {
      return <CBadge color="success"> Excelente </CBadge>
    } else if (_score <= 11) {
      return <CBadge color="danger"> Desaprobado </CBadge>
    }
  }

  useEffect(() => {
    getModel(setData)
  }, [])

  return (
    <>
      {data.data &&
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                <strong>Listado de Notas:</strong>
              </CCardHeader>
              <CCardBody>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className=""> # </th>
                      <th className=""> Alumno </th>
                      <th className=""> Estado de Entrega </th>
                      <th className=""> Fecha de Calificacion </th>
                      <th className=""> Nota </th>
                      <th className=""> Estado </th>
                      <th className=""> Acciones </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.data.scores.map((score, index) => (
                        <tr key={score.id}>
                          <td> {index + 1} </td>
                          <td> {score.student} </td>
                          <td> {set_badge_by_status(score.status)} </td>
                          <td> {normalizeDateWithHour(score.calificated)} </td>
                          <td> {score.score} </td>
                          <td> {set_badge_by_calification(score.score)} </td>
                          <td>
                            <CTooltip content="Editar Nota" placement="top-start">
                              <CButton
                                className="m-1 btn btn-warning btn-sm"
                                onClick={() => { setModalStatus(true); setCurrentScore(score) }}
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </CButton>
                            </CTooltip>
                          </td>

                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </CCardBody>
              <CRow>
                <CCol>
                  <Link className="float-end btn btn btn-info btn-sm mb-3" to={`/programas/${course_id}/evaluaciones`}>Volver Atras</Link>
                </CCol>
              </CRow>
            </CCard>
          </CCol>
          <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" backdrop="static">
            <CModalHeader >
              <CModalTitle>
                Editar Nota
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CRow>
                  <CFormLabel htmlFor="score">Nota</CFormLabel>
                  <CFormInput id="score"
                    placeholder="Nota"
                    name="score"
                    value={currentScore.score}
                    onChange={handleChange}
                  />
                </CRow>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={() => handleOpenModal(false)}>
                Cancelar
              </CButton>
              <CButton color="success" onClick={() => handleSubmit(currentScore)}>
                Guardar
              </CButton>
            </CModalFooter>
          </CModal>
        </CRow>
      }
    </>
  )
}

export default ShowScores

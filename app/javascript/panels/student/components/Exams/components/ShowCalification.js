import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios'
import { saveAs } from "file-saver"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CFormLabel,
  CButton,
  CCardFooter
} from '@coreui/react-pro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudDownload
} from '@fortawesome/free-solid-svg-icons'

// /panel/exam/28/scores/student/10

const ShowCalification = (props) => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))

  const [calification, setCalification] = useState(null)

  const { exam_id, program_id } = useParams()


  const getCalification = async () => {
    const response = await axios.get(`/panel/exam/${exam_id}/scores/student/${currentUser.id}`)
    setCalification(response.data.data)
  }

  const saveFile = (_answer) => {
    saveAs(
      _answer.file.url,
      "entrega_" + _answer.student
    );
  }

  useEffect(() => {
    getCalification()
  }, [])

  return (
    <>
      {calification ? <>
        <CCard>
          <CCardHeader>
            Calificación
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={3} xs={12} className="mb-4">
                <CFormLabel>
                  <b> Entrega </b>
                </CFormLabel> <br />
                <CTooltip content="Descargar Entrega" placement="top-start">
                  <CButton
                    className="btn btn-primary btn-sm"
                    onClick={() => saveFile(calification)}
                  >
                    <FontAwesomeIcon icon={faCloudDownload} size='lg' inverse />
                  </CButton>
                </CTooltip>
              </CCol>
              <CCol md={3} xs={12} className="mb-4">
                <CFormLabel>
                  <b> Nota :</b>
                </CFormLabel>
                <h1>
                  {calification.score}
                </h1>
              </CCol>
              <CCol md={3} xs={12} className="mb-4">
                <CFormLabel>
                  <b>Valor total en el Curso :</b>
                </CFormLabel>
                <h1>
                  {calification.score * calification.percent / 100}
                </h1>
              </CCol>
              <CCol md={3} xs={12} className="mb-4">
                <CFormLabel>
                  <b> Comentario : </b>
                </CFormLabel>
                <h4>
                  {calification.comment}
                </h4>
              </CCol>
            </CRow>
            {
              calification.type_exam === "automatic" ?
                <CRow>
                  <CCol md={12} xs={12} className="mb-4">
                    <CFormLabel>
                      <h6> <b> Revisión del Examen : </b></h6>
                    </CFormLabel>
                    {calification.exam_all_data.map((item, index) => {
                      return <div key={index}>
                        <h6 style={{color: "#3c4b64"}}><b> Pregunta: </b> {item.enunciate} <br /></h6>

                        <h6 className="text-danger" ><b> Respuesta correcta: </b> </h6>
                        <div className="divider"></div>
                        {item.options.map(option => {
                          return <div key={option.id} style={{marginLeft: "4%"}}>
                            <h6 style={{padding:"4px 0 10px 4px", color: "#3c4b64"}}><b>{option.enunciate}</b></h6>
                            <h6 style={{padding:"4px 0 10px 4px", color: "#3c4b64"}}><b>Puntaje: {option.score}</b></h6>
                          </div>
                        })}
                        <b> <span className="text-danger" >Retroalimentación : </span> </b> <p style={{color: "#3c4b64"}}>{item.feedback}</p> <br />
                        <hr />
                      </div>
                    })
                    }
                  </CCol>
                </CRow>
                : null
            }
          </CCardBody>
          <CCardFooter>
            <Link
              className="m-1 btn btn-success btn-sm"
              to={`/programas/${program_id}/evaluaciones`}
            >
              Volver Atras
            </Link>
          </CCardFooter>
        </CCard>
      </> :
        <CCard>
          <CCardHeader>
            Calificación
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={3} xs={12} className="mb-4">
                <CFormLabel>
                  Nota
                </CFormLabel>
                <h1>
                  0
                </h1>
              </CCol>
              <CCol md={3} xs={12} className="mb-4">
                <CFormLabel>
                  Comentario
                </CFormLabel>
                <h4>
                  No hizo una entrega para este examen
                </h4>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      }
    </>
  )
}

export default ShowCalification

import React from 'react'

import {
  CRow, CCol
} from '@coreui/react-pro'

const Show = (props) => {
  const { currentCertificate } = props


  const catchTag = (tag) => {
    switch (tag) {
      case 'specialist':
        return 'Especialista en:'
      case 'approved':
        return 'Por haber aprobado el:'
      case 'participant':
        return 'Por haber participado en el:'
      case 'auditor':
        return 'Auditor en:'
      default:
        return ''
    }
  }


  return (
    <>
      <CRow>
        <CCol>
          <small className='text-danger'>
            Recuerda que este boceto es como se verá el certificado, si deseas cambiar algo, puedes hacerlo desde el botón de editar.
          </small>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div
            style={
              {
                backgroundImage: "url('https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/certificaciones/bg_principal_certificado.jpg')",
                backgroundSize: "cover",
                margin: "0 auto",
                width: "50%",
                height: "400px",
              }
            }
          >
            <CRow>
              <CCol
                style={{
                  margin: "50px 0px 0px 90px",
                }}
              >
                <p>Otorgado a:</p>
              </CCol>
            </CRow>

            <CRow>
              <CCol
                style={{
                  margin: "-20px 0px 0px 90px",
                  color: "#43b49b",
                  fontWeight: "900",
                }}
              >
                <h2>NOMBRE DEL ALUMNO</h2>
              </CCol>
            </CRow>

            <CRow>
              <CCol
                style={{
                  margin: "-10px 0px 0px 90px",
                  fontWeight: "400",
                }}
              >
                <h6>
                  {currentCertificate.tag ? catchTag(currentCertificate.tag) : null}
                </h6>
              </CCol>
            </CRow>

            <CRow>
              <CCol
                style={{
                  margin: "0px 0px 0px 90px",
                  fontWeight: "900",
                }}
              >
                <h4> {currentCertificate.title ? currentCertificate.title : null} </h4>
              </CCol>
            </CRow>

            <CRow>
              <CCol
                style={{
                  margin: "0px 0px 0px 90px"
                }}
              >
                <small> Desarrollado desde el {currentCertificate.start_at ? currentCertificate.start_at : null} al {currentCertificate.end_at ? currentCertificate.end_at : null} con una duracion de {currentCertificate.hours ? currentCertificate.hours : null} Horas Lectivas </small>
              </CCol>
            </CRow>

            <CRow>
              <CCol
                style={{
                  margin: "10px 0px 0px 90px",
                  fontWeight: "900",
                }}
              >
                <p> Arequipa, 01 de Junio de 2023 </p>
              </CCol>
            </CRow>

          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Show
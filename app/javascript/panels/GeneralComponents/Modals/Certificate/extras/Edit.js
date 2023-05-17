import React from 'react'
import {
  CForm, CFormLabel, CFormSelect, CFormInput,
  CRow, CCol
} from '@coreui/react-pro'

const Edit = (props) => {
  const { currentCertificate, setCurrentCertificate } = props

  const formatDate = (_date) => {
    const date = new Date(_date)

    const formattedDate = date.toISOString().split('T')[0]
    return formattedDate
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let auxData = {...currentCertificate}
    auxData[name] = value
    setCurrentCertificate(auxData)
  }

  return (
    <>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="title">Título</CFormLabel>
            <CFormInput 
              type='text' 
              id="title" 
              name="title" 
              placeholder="Título" 
              value={currentCertificate.title ? currentCertificate.title : ''} 
              onChange={(e) => handleChange(e)}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={6} xs={12} className='mt-3'>
            <CFormLabel htmlFor="certificate_type">Tipo de Certificado</CFormLabel>
            <CFormSelect 
              name="certificate_type" 
              value={currentCertificate.certificate_type ? currentCertificate.certificate_type : ''}
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Seleccione un tipo de certificado</option>
              <option value="general">Certificado por Curso Completo</option>
              <option value="module">Certificado por Módulos del Curso</option>
            </CFormSelect>
          </CCol>

          <CCol sm={6} xs={12} className='mt-3'>
            <CFormLabel htmlFor="tag">Etiqueta</CFormLabel>
            <CFormSelect 
              name="tag" 
              value={currentCertificate.tag ? currentCertificate.tag : ''} 
              onChange={(e) => handleChange(e)}
            >
              <option>Seleccione una etiqueta de certificado</option>
              <option value="specialist">Especialista en</option>
              <option value="approved">Por haber Aprobado</option>
              <option value="participant">Por haber participado</option>
              <option value="auditor">Siendo Auditor en</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={4} xs={12} className='mt-3'>
            <CFormLabel htmlFor="start_at">Empieza</CFormLabel>
            <CFormInput 
              type="date" 
              id="start_at" 
              name="start_at" 
              value={currentCertificate.start_at ? formatDate(currentCertificate.start_at) : ''}
              onChange={(e) => handleChange(e)}
            />
          </CCol>
          <CCol sm={4} xs={12} className='mt-3'>
            <CFormLabel htmlFor="end_at">Finaliza</CFormLabel>
            <CFormInput 
              type="date" 
              id="end_at" 
              name="end_at" 
              value={currentCertificate.end_at ? formatDate(currentCertificate.end_at) : ''} 
              onChange={(e) => handleChange(e)}
            />
          </CCol>
          <CCol sm={4} xs={12} className='mt-3'>
            <CFormLabel htmlFor="hours">Horas Lectivas</CFormLabel>
            <CFormInput 
              type="text" 
              id="hours" 
              name="hours" 
              value={currentCertificate.hours ? currentCertificate.hours : ''} 
              onChange={(e) => handleChange(e)}
            />
          </CCol>
        </CRow>

      </CForm>
    </>
  )
}

export default Edit
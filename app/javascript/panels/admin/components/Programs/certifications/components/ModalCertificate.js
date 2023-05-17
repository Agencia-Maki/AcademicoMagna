import React, { useState, useRef, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel, CFormSelect, CFormInput,
  CForm,
  CRow,
  CCol,
  CSpinner
} from '@coreui/react-pro'

import useCrud from '../../../../../../hooks/useCrud2'

const ModalCertificate = (props) => {
  const { setShowModal, loadData } = props
  const { showModal, program } = props
  const { getModel: getModules } = useCrud(`/panel/admin/courses/${program.id}/chapters`)
  const { insertModel: insertCertificate } = useCrud(`/panel/admin/courses/${program.id}/certificates`)

  const [loading, setLoading] = useState(false)

  const [dataCertificate, setDataCertificate] = useState(
    {
      course_id: program.id,
      certificate_type: '',
      certificates: []
    }
  )

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleChange = async (e) => {
    const { value } = e.target
    if (value === 'module') {
      setLoading(true)
      const { data } = await getModules()
      let auxData = {...dataCertificate}
      auxData.certificates = data.map((module) => ({
        title: module.name,
        tag: '',
        certificate_type: dataCertificate.certificate_type,
        start_at: module.start_date,
        end_at: module.end_date,
        course_id: module.course_id,
        hours: module.duration
      }))
      auxData.certificate_type = "module"
      setDataCertificate(auxData)
      setLoading(false)
    } else if (value === 'general') {
      let auxData = {...dataCertificate}
      auxData.certificates.push({
        title: program.name,
        tag: '',
        certificate_type: 'general',
        start_at: program.start_date,
        end_at: program.end_date,
        course_id: program.id,
        hours: program.duration
      })
      // auxData.certificates = []
      auxData.certificate_type = "general"
      setDataCertificate(auxData)
      setLoading(false)
    } else {
      let auxData = {...dataCertificate}
      auxData.certificates = []
      auxData.certificate_type = ''
      setDataCertificate(auxData)
      setLoading(false)
    }
  }

  const addCertificate = (e) => {
    let temp = {...dataCertificate}
    temp.certificates.push({
      title: '',
      start_at: new Date(),
      end_at: new Date(),
      duration: '',
      certificate_type: dataCertificate.certificate_type,
      tag: ''
    })
    setDataCertificate(temp)
  }

  const deleteCertificate = (e, i) => {
    let temp = { ...dataCertificate }
    temp.certificates.splice(i, 1)
    setDataCertificate(temp)
  }

  const handleCertificateChange = (e, i) => {
    let temp = { ...dataCertificate }
    temp.certificates[i][e.target.name] = e.target.value
    setDataCertificate(temp)
  }

  const formatDate = (_date) => {
    const date = new Date(_date)

    const formattedDate = date.toISOString().split('T')[0]
    return formattedDate
  }

  const layoutCallback = () => {
    loadData()
    handleCloseModal()
  }

  const handleSubmit = async () => {
    await insertCertificate(dataCertificate, `/panel/admin/courses/${program.id}/certificates`, layoutCallback)
  }

  return (
    <>
      <CModal
        visible={showModal}
        onClose={() => handleCloseModal()}
        backdrop="static"
        size='xl'
      >
        <CModalHeader onClose={() => handleCloseModal()}>
          <strong><small> INGRESAR NUEVA CERTIFICACION </small></strong>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormLabel htmlFor="name">Tipo de Certificado</CFormLabel>
              <CFormSelect name="certificate_type" onChange={(e) => handleChange(e)}>
                <option value=''>Seleccione un tipo de certificado</option>
                <option value="general">Certificado por Curso Completo</option>
                <option value="module">Certificado por Módulos del Curso</option>
              </CFormSelect>
            </CCol>
          </CRow>
          {
            dataCertificate.certificate_type === '' ?
              null :
              <CRow>
                <CCol>
                  <CButton color="success" size="sm" className="float-end my-3" onClick={(e) => addCertificate(e)}>
                    <strong><small className='text-white'>Agregar Certificado</small></strong>
                  </CButton>
                </CCol>
              </CRow>
          }
          {
            loading ?
              <CSpinner /> :
              <CForm>
                {
                  dataCertificate.certificates.length ? dataCertificate.certificates.map((certificate, index) => (
                    <div key={index}>
                      <CRow>
                        <CCol className='mt-3'>
                          <CFormLabel htmlFor="title">Titulo</CFormLabel>
                          <CFormInput 
                            name="title" 
                            value={certificate ? certificate.title : '' } 
                            onChange={(e) => handleCertificateChange(e, index) } />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className='mt-1'>
                          <CFormLabel htmlFor="name">Fecha de Inicio</CFormLabel>
                          <CFormInput type="date" name="start_at" value={certificate ? formatDate(certificate.start_at) : ''} onChange={(e) => handleCertificateChange(e, index) } />
                        </CCol>

                        <CCol className='mt-1'>
                          <CFormLabel htmlFor="name">Fecha de Inicio</CFormLabel>
                          <CFormInput type="date" name="end_at" value={certificate ? formatDate(certificate.end_at) : ''} onChange={(e) => handleCertificateChange(e, index) } />
                        </CCol>

                        <CCol className='mt-1'>
                          <CFormLabel htmlFor="name">Horas Lectivas</CFormLabel>
                          <CFormInput name="hours" value={certificate ? certificate.hours : ''} onChange={(e) => handleCertificateChange(e, index) } />
                        </CCol>

                        <CCol className='mt-1'>
                          <CFormLabel htmlFor="tag">Trato del Certificado</CFormLabel>
                          <CFormSelect name="tag" onChange={(e) => handleCertificateChange(e, index) } >
                            <option>Seleccione una etiqueta de certificado</option>
                            <option value="specialist">Especialista en</option>
                            <option value="approved">Por haber Aprobado</option>
                            <option value="participant">Por haber participado</option>
                            <option value="auditor">Siendo Auditor en</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className='mt-1'>
                          <CButton color="danger" size='sm' onClick={(e) => deleteCertificate(e, index)}>
                            <strong><small className='text-white'>Eliminar</small></strong>
                          </CButton>
                        </CCol>
                      </CRow>
                      <hr />
                    </div>
                  )) : null
                }
              </CForm>
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" size='sm' onClick={() => handleCloseModal()}>
            Cerrar
          </CButton>
          <CButton
            color="success"
            size='sm'
            onClick={() => handleSubmit()}
          >
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalCertificate
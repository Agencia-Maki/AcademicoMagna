import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton
} from '@coreui/react-pro'

import TableCertificates from './components/TableCertificates'
import ModalCertificate from './components/ModalCertificate'

import useCrud from '../../../../../hooks/useCrud2'

const initialCertificate = {
  title: '',
  tag: '',
  certificate_type: '',
  hours: ''
}

const Certifications = (props) => {
  const { program } = props
  const { id_program } = useParams()
  const { getModel: getCertificates } = useCrud(`/panel/admin/courses/${id_program}/certificates`)

  const [certificateList, setCertificateList] = useState([])
  const [currentCertificate, setCurrentCertificate] = useState({})

  const [showModal, setShowModal] = useState(false)

  const loadData = async () => {
    const { certificates } = await getCertificates()
    setCertificateList(certificates.map((certificate, index) => ({
      ...certificate,
      index: index + 1
    })
    ))
  }

  const handleNewCertificate = () => {
    setCurrentCertificate(initialCertificate)
    setShowModal(true)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      { console.log(program) }
      <CRow className='mt-3'>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong><small>APARTADO DE CERTIFICACIONES</small></strong>
            </CCardHeader>
            <CCardBody>
              <strong className='text-danger'>Magna te recuerda:</strong>
              <ul>
                <li> 
                  <small className='text-info' > Todos estos certificados se pueden editar y eliminar siempre y cuando el curso este activo y no se haya enviado al módulo de certificación. </small> 
                </li>

                <li> 
                  <small className='text-info' > En caso de visualizar algun error y no poder editar contactar con soporte para editar los campos "erróneos" en este módulo y en el módulo de certificaciones. </small> 
                </li>
              </ul>
              <CButton size="sm" color="success" className='float-end' onClick={() => handleNewCertificate()}>
                <strong><small className='text-white'>Nueva Certificacion</small></strong>
              </CButton>

              <TableCertificates
                certificateList={certificateList}
                loadData={loadData}
                program={program}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {
        showModal &&
        <ModalCertificate
          showModal={showModal}
          setShowModal={setShowModal}
          currentCertificate={currentCertificate}
          setCurrentCertificate={setCurrentCertificate}
          program={program}
          loadData={loadData}
        />
      }
    </>
  )
}

export default Certifications
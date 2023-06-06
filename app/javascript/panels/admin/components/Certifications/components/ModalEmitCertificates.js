import React from 'react'
import {
  CModal, CModalHeader, CModalBody, CModalFooter,
  CButton
} from '@coreui/react-pro'

import TableStudents from './TableStudents'

import Loading from '../../../../GeneralComponents/Loading'


const ModalEmitCertificates = ({ courseSelected: course ,showModalCertificates, setShowModalCertificates, setCourseSelected, loadingStudents }) => {
  const handleClose = () => {
    setShowModalCertificates(false)
    setCourseSelected({})
  }

  return (
    <>
      <CModal
        visible={showModalCertificates}
        onClose={() => handleClose()}
        backdrop="static"
        size='xl'
      >
        <CModalHeader onClose={() => handleClose()}>
          <strong><small> EMITIR CERTIFICADOS PARA EL CURSO: { course.name } </small></strong>
        </CModalHeader>
        <CModalBody>
          {
            loadingStudents ? <Loading /> : 
            <TableStudents 
              students={ course.students } 
              course={ course }
            />
          }
        </CModalBody>
      </CModal>
    </>
  )
}

export default ModalEmitCertificates
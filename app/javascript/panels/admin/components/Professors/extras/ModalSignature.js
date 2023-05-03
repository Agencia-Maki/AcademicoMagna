import React, { useState, useRef } from 'react'

import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel,
  CForm,
  CFormInput
} from '@coreui/react-pro'

import useCrud from '../../../../../hooks/useCrud'

const singleFile = {
  url: ''
}

const ModalSignature = (props) => {
  const { professor, showModal } = props
  const { setShowModal, setProfessor } = props

  const [signatureFile, setSignatureFile] = useState(singleFile)

  const { updateModelWithConfirmation: updateProfessor } = useCrud('')
  
  const handleChangeFile = (e) => {
    setSignatureFile(e.target.files[0])
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setProfessor(null)
  }

  const handleSaveSignature = async () => {
    const finalData = new FormData()
    finalData.append('signature', signatureFile)
    updateProfessor(finalData, `/panel/admin/professors/${professor.id}/set_signature`, handleCloseModal)
    // console.log(finalData)
  }

  return (
    <CModal
      visible={showModal}
      onClose={() => handleCloseModal()}
      backdrop="static"
      size='xl'
    >
      <CModalHeader onClose={() => handleCloseModal()}>
        <small>Insertar firma digital al profesor: &nbsp; </small><strong> {professor.first_name} {professor.last_name} </strong>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormLabel>Inserte la firma digital del profesor</CFormLabel>
          <CFormInput
            accept="image/png"
            type="file"
            onChange={(e) => handleChangeFile(e)}
          />
        </CForm>

      </CModalBody>
      <CModalFooter>
        <CButton color="danger" size="sm" onClick={() => handleCloseModal()}>
          Cancelar
        </CButton>
        <CButton color="success" size="sm" onClick={() => handleSaveSignature()} >Guardar</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalSignature
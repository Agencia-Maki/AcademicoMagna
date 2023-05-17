import React, { useState, useRef, useEffect } from 'react'
import {
  CModal, CModalHeader, CModalBody, CModalFooter,
  CButton
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud2'

import Edit from './extras/Edit'
import Show from './extras/Show'

const CertificateModal = (props) => {
  const { updateModel: updateCertificate } = useCrud(`/panel/admin/certificates/:certificate_id`)

  const { setShowModal, setModalType, setCurrentCertificate, loadData } = props
  const { showModal, modalType, currentCertificate } = props

  const handleClose = () => {
    setCurrentCertificate({})
    setShowModal(false)
    setModalType('')
  }

  const layoutCallback = () => {
    loadData()
    handleClose()
  }

  const handleUpdate = async () => {
    await updateCertificate(currentCertificate, `/panel/admin/certificates/${currentCertificate.id}`, layoutCallback)
  }

  return (
    <>
      <CModal
        visible={showModal}
        onClose={() => handleClose()}
        backdrop="static"
        size='xl'
      >
        <CModalHeader onClose={() => handleClose()}>
          <strong><small> {modalType === "show" && modalType != '' ? "VER" : "EDITAR"} CERTIFICACIÓN </small></strong>
        </CModalHeader>
        <CModalBody>
          {
            modalType === "show" && modalType != '' ?
              <Show
                currentCertificate={currentCertificate}
                setCurrentCertificate={setCurrentCertificate}
              /> :
              <Edit
                currentCertificate={currentCertificate}
                setCurrentCertificate={setCurrentCertificate}
              />
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" size="sm" onClick={() => handleClose()}>
            Cerrar
          </CButton>
          {
            modalType === "edit" ?
              <CButton color="success" size="sm" onClick={() => handleUpdate()}>
                Guardar
              </CButton> : null
          }
        </CModalFooter>
      </CModal>
    </>
  )

}

export default CertificateModal
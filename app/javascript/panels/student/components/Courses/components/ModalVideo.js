import React, { useState, useEffect, useRef } from 'react'
import {
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react-pro'

const ModalVideo = (props) => {
  const { showModal, setShowModal, currentLesson, setCurrentLesson } = props

  function youtube_parser(url) {
    return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1]
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentLesson({})
  }

  return (
    <>
      <CModal
        size="lg"
        visible={showModal}
        onClose={() => handleCloseModal(setShowModal)}
        alignment="center"
      >
        <CModalHeader
          closeButton={false}
        >
          <strong><small className="text-danger"> Viendo la sesion: {currentLesson.name} </small></strong>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol lg={12} md={12} sm={12} xs={12} className="text-center">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${youtube_parser(currentLesson.link_video)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentLesson.name}
              />
              <hr />
              <small>
                Recuerda si no puedes reproducir el video puedes verlo en nuestro canal de youtube en el siguiente :
              </small> <br />
              <a href={currentLesson.link_video} target="_blank" rel="noreferrer">
                <strong> link </strong>
              </a>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" size="sm" onClick={() => handleCloseModal()}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalVideo
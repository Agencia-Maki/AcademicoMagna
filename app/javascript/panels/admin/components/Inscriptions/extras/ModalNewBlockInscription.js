import React, { useState, useRef } from 'react'

import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel
} from '@coreui/react-pro'

import Multiselect from 'multiselect-react-dropdown'

import useCrud from "../../../../../hooks/useCrud"

const ModalNewBlockInscription = (props) => {
  const { currentCourse, showModal, students } = props
  const { setCurrentCourse, setShowModal } = props

  const { insertModelData } = useCrud("")

  const [loading, setLoading] = useState(false)

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentCourse({})
  }

  const multiselectRef = useRef();

  const handleSubmitBlockInscription = async() => {
    setLoading(true)
    const selectedStudents = multiselectRef.current.getSelectedItems().map(student => student.value)
    const finalData = {
      course_id: currentCourse.id,
      student_ids: selectedStudents
    }
    await insertModelData(finalData, `/panel/admin/inscriptions/course/${currentCourse.id}/in_block`)
    setLoading(false)
    handleCloseModal()
  }

  return (
    <CModal
      visible={showModal}
      onClose={() => handleCloseModal()}
      backdrop="static"
      size='xl'
    >
      <CModalHeader onClose={() => handleCloseModal()}>
        <small>Matricular Alumnos al curso: </small><strong> {currentCourse.name} </strong>
      </CModalHeader>
      <CModalBody>
        <CFormLabel htmlFor="students">Selecciona los Alumnos a matricular</CFormLabel>
        <Multiselect
          displayValue="text"
          onKeyPressFn={function noRefCheck() { }}
          onRemove={function noRefCheck() { }}
          onSearch={function noRefCheck() { }}
          onSelect={function noRefCheck() { }}
          options={students}
          placeholder="Seleccionar Alumnos"
          emptyRecordMsg="Sin alumnos disponibles"
          ref={multiselectRef}
          style={{
            chips: {
              background: '#00F6BA',
              color: '#181818'
            },
            optionContainer: {
              background: '#C4C4C4',
              color: '#181818'
            }
          }}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" size='sm' onClick={() => handleCloseModal()}>
          Cerrar
        </CButton>
        <CButton
          color="success"
          size='sm'
          onClick={() => handleSubmitBlockInscription()}
          disabled={loading ? true : false}
        >
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalNewBlockInscription
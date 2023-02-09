import React, { useState, useRef } from 'react'

import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CRow,
  CCol
} from '@coreui/react-pro'

import useCrud from '../../../../../hooks/useCrud'

const ModalCloneCourse = (props) => {
  const { setShowModal, showModal, courses, refreshData } = props

  const { insertModelData: cloneCourse } = useCrud("/panel/admin/courses/:course_id/clone")

  const [loading, setLoading] = useState(false)
  const [newCourseCloned, setNewCourseCloned] = useState({ course_to_clone_id: '', name: '' })

  const handleCloseModal = () => {
    setShowModal(false)
    setNewCourseCloned({ course_to_clone_id: '', name: '' })
  }

  const especialOnchange = (e) => {
    const courseSelected = courses.find(course => course.id === parseInt(e.target.value))
    setNewCourseCloned({ name: courseSelected.name, course_to_clone_id: e.target.value })
  }

  const handleCloneCourse = async() => {
    setLoading(true)
    await cloneCourse(newCourseCloned)
    setLoading(false)
    handleCloseModal()
    refreshData()
  }

  return (
    <CModal
      visible={showModal}
      onClose={() => handleCloseModal()}
      backdrop="static"
      size='lg'
    >
      <CModalHeader onClose={() => handleCloseModal()}>
        <small>Clonar Curso (Modulos y Sesiones): </small>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="students">Selecciona un Curso a Clonar</CFormLabel>
            <CFormSelect value={newCourseCloned.course_to_clone_id} name="course_to_clone_id" onChange={e => {especialOnchange(e)}}>
              <option>Selecciona un Curso</option>
              {
                courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))
              }
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className='mt-3'>
          <CFormLabel htmlFor="students">Ingresa el nombre del Nuevo Curso</CFormLabel>
          <CCol>
            <CFormInput type='text' placeholder='Nombre del Nuevo Curso' value={newCourseCloned.name} name="name" onChange={e => setNewCourseCloned({ ...newCourseCloned, name: e.target.value })} />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" size='sm' onClick={() => handleCloseModal()}>
          Cerrar
        </CButton>
        <CButton
          color="success"
          size='sm'
          onClick={() => handleCloneCourse()}
          disabled={loading ? true : false}
        >
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCloneCourse
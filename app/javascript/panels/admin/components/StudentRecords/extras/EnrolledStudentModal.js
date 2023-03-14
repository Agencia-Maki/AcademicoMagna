import React, { useState, useRef } from 'react'
import {
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel, CFormSelect
} from '@coreui/react-pro'

import useCrud from "../../../../../hooks/useCrud"
import { getBadgeDocumentType, getBadgeStudentRecord } from '../../../../../helpers/auxiliarFuncionts'
import { normalizeDate } from '../../../../../helpers/normalizes'

const EnrolledStudentModal = (props) => {
  const { insertModelWithConfirmation: enrollStudent } = useCrud("")

  const { showModal, currentStudentRecord, courses } = props
  const { setShowModal, setCurrentStudentRecord, refreshData } = props

  const [currentCourse, setCurrentCourse] = useState("")

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentStudentRecord({})
  }

  const layoutCallback = () => {
    handleCloseModal()
    refreshData()
  }

  const handleEnrolledStudent = async () => {
    let finalData = { ...currentStudentRecord, course_id: currentCourse }
    await enrollStudent(finalData, `/panel/admin/student_records/register_and_enrolled`, layoutCallback)
  }

  return (
    <>
      <CModal
        visible={showModal}
        onClose={() => handleCloseModal()}
        backdrop="static"
        size='lg'
      >
        <CModalHeader>
          <strong><small>Matricular alumno: </small></strong>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm={4}>
              <strong><small>Nombres: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{currentStudentRecord.first_name}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Apellidos: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{currentStudentRecord.last_name}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Tipo de Documento: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{getBadgeDocumentType(currentStudentRecord.document_type)}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Número de documento: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{currentStudentRecord.document_number}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Teléfono: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{currentStudentRecord.phone}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Correo electrónico: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{currentStudentRecord.email}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Curso de referencia: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{currentStudentRecord.course_name}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <strong><small>Fecha de Registro: </small></strong>
            </CCol>
            <CCol sm={8}>
              <small>{normalizeDate(currentStudentRecord.updated_at)}</small>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm={4}>
              <CFormLabel htmlFor="course"><strong><small>Fecha de Registro: </small></strong></CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormSelect
                id="course"
                name="course"
                // custom
                value={currentCourse}
                onChange={(e) => setCurrentCourse(e.target.value)}
              >
                <option value="">Seleccione un curso</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" size="sm" onClick={() => handleCloseModal()}>
            Cerrar
          </CButton>
          <CButton color="success" size="sm" onClick={() => handleEnrolledStudent()} disabled={ currentCourse === ""}>
            Enviar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EnrolledStudentModal
import React, { useState, useRef } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel,
  CRow,
  CCol
} from '@coreui/react-pro'

import Multiselect from 'multiselect-react-dropdown'

import useCrud from '../../../../../hooks/useCrud'

const ModalImportCourse = (props) => {
  const { setShowModal, showModal, courses, refreshData, importCourseData } = props

  const { insertModelData: importCourse } = useCrud("/panel/admin/courses/import")

  const [loading, setLoading] = useState(false)

  const multiselectRef = useRef();

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleImportCourseData = async () => {
    setLoading(true)
    let finalData = {...importCourseData, course_from: multiselectRef.current.getSelectedItems()[0].value}
    await importCourse(finalData)
    refreshData()
    handleCloseModal()
    setLoading(false)
  }

  return (
    <>
      { console.log(importCourseData) }
      <CModal
        visible={showModal}
        onClose={() => handleCloseModal()}
        backdrop="static"
        size='lg'
      >
        <CModalHeader onClose={() => handleCloseModal()}>
          <small>Importar datos (Modulos y Sesiones) al curso : {importCourseData.course_name} </small>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormLabel htmlFor="students">Selecciona un curso a importar</CFormLabel>
              <Multiselect
                displayValue="text"
                onKeyPressFn={function noRefCheck() { }}
                onRemove={function noRefCheck() { }}
                onSearch={function noRefCheck() { }}
                onSelect={function noRefCheck() { }}
                singleSelect={true}
                options={courses}
                placeholder="Seleccionar Curso"
                emptyRecordMsg="Sin cursos disponibles"
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
            onClick={() => handleImportCourseData()}
            disabled={loading ? true : false}
          >
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalImportCourse
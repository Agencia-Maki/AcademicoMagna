import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CTooltip,
  CForm, CRow, CFormLabel, CFormInput, CFormText, 
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal
} from '@coreui/react-pro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileDownload, faTrash, faXmark
} from '@fortawesome/free-solid-svg-icons'

import { saveAs } from "file-saver"

import useChange from '../../../../../hooks/useChange'
import useCrud from '../../../../../hooks/useCrud'

const url_aux = '/panel/admin/chapters/:chapter_id/materials'

const initialState = {
  name: '',
}

const singleFile = {
  url: ''
}

const Materials = (props) => {
  const { chapter, materials } = props
  const { setShowLessons } = props

  const [modalStatus, setModalStatus] = useState(false)
  const [file, setFile] = useState(singleFile)

  const url_ep = url_aux.replace(':chapter_id', chapter.id)
  const url_back = '/programas/' + String(chapter.course_id) + '/modulos'

  const { data, handleChange, handleChangeFile, resetData } = useChange(initialState)
  const { insertModel, deleteModel } = useCrud(url_ep, url_back)

  const insertMaterial = async () => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('file', file)
    formData.append('chapter_id', chapter.id)

    await insertModel(formData)
    setModalStatus(false)
    setTimeout(() => {
      location.reload();
    }, 800)
  }

  const removeMaterial = async (_material) => {
    await deleteModel(_material)
    setTimeout(() => {
      location.reload();
    }, 800)
  }

  const handleOpenModal = (action) => {
    if (action === false) {
      setModalStatus(action)
      resetData()
    } else {
      setModalStatus(action)
    }
  }

  const saveFile = (_material) => {
    saveAs(
      _material.file.url,
      _material.name
    );
  };

  useEffect(() => {
  }, [])

  return (
    <CRow className='mt-3'>
      <CCol md={12} sm={12} xs={12}>
        <CCard>
          <CCardHeader>
            <b> MÓDULO: {chapter.name} {chapter.id}</b>
            <FontAwesomeIcon icon={faXmark} style={{ cursor: "pointer" }} className="float-end" onClick={() => props.setShowLessons(false)}/>
          </CCardHeader>
          <CCardBody>
            <CButton
              color="success"
              size="sm"
              className="btn btn-sm btn-success mb-2 float-end"
              onClick={() => {
                handleOpenModal(true);
              }
              }
            >
              Nuevo Material
            </CButton>

            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th> # </th>
                  <th> Nombre de Tema </th>
                  <th> Acciones </th>
                </tr>
              </thead>
              <tbody>
                {
                  materials && materials.data.length > 0 ?
                    materials.data.map((material, index) => (
                      <tr key={material.id}>
                        <td> {index + 1}</td>
                        <td> {material.name} </td>
                        <td>
                          <CTooltip content="Descargar material" placement="top-start">
                            <CButton
                              color="success"
                              size="sm"
                              onClick={() => saveFile(material)}
                              className="m-1"
                            >
                              <FontAwesomeIcon icon={faFileDownload} inverse />
                            </CButton>
                          </CTooltip>
                          
                          <CTooltip content="Eliminar material" placement="top-start">
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => removeMaterial(material)}
                              className="m-1"
                            >
                              <FontAwesomeIcon icon={faTrash} inverse />
                            </CButton>
                          </CTooltip>
                        </td>
                      </tr>
                    )) :
                    <tr>
                      <td>
                        No hay registros para mostrar
                      </td>
                    </tr>
                }
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" backdrop="static">
        {
          <div>
            <CModalHeader closeButton>
              <CModalTitle>
                Agregar Nuevo Material
              </CModalTitle>
            </CModalHeader>
            <CForm action="" method="post" className="form-horizontal">
              <CModalBody>
                <CRow className='mt-3'>
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-email">Nombre de material</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput
                      name="name"
                      type="text"
                      onChange={handleChange}
                      value={data ? data.name : ''}
                    />
                  </CCol>
                </CRow>

                <CRow className='mt-3'>
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-email">Archivo</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput
                      type="file"
                      id="file"
                      name="file"
                      accept="*"
                      multiple={false}
                      onChange={(e) => handleChangeFile(e, setFile)}
                    />
                    <CFormText>Seleccione un archivo menor a 10 MB's.</CFormText>
                  </CCol>
                </CRow>

              </CModalBody>
              <CModalFooter>
                <CButton color="danger"
                  onClick={
                    () => { handleOpenModal(false) }
                  }
                >
                  Cancelar
                </CButton>
                <CButton color="success"
                  onClick={() => insertMaterial()}
                >
                  Registrar
                </CButton>
              </CModalFooter>
            </CForm>
          </div>
        }
      </CModal>
    </CRow>
  )
};

export default Materials;
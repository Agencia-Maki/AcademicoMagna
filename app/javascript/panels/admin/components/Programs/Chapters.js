import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CTooltip,
  CForm, CRow, CFormLabel, CFormInput, CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList,
  faPen, faPhotoFilm, faTrash
} from '@fortawesome/free-solid-svg-icons'

import useChange from '../../../../hooks/useChange'
import useCrud from '../../../../hooks/useCrud'
import { normalizeDate } from '../../../../helpers/normalizes'

import Lessons from './components/Lessons'
import Materials from './components/Materials'

const prototypeChapter = {
  name: '',
  start_date: '',
  end_date: '',
  materials: [],
  course_id: 0 //parseInt(props.id_program)
}

const url_ep = '/panel/admin/courses/:course_id/chapters/'

const Chapters = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [modalType, setModalType] = useState('')

  const { id_program } = useParams()

  const url = url_ep.replace(':course_id', id_program)

  const [chapter, setChapter] = useState(prototypeChapter)

  const [materials, setMaterials] = useState([])
  const [lessons, setLessons] = useState([])

  const [showLessons, setShowLessons] = useState(false)
  const [showMaterials, setShowMaterials] = useState(false)

  const { data, handleChange, resetData, setData } = useChange(prototypeChapter)
  const { modelIndex, deleteModel, insertModel, getModel, updateModelByID } = useCrud(url)


  const setMaterialsFront = async (_chapter) => {
    await getModel(setMaterials, '/panel/admin/chapters/' + String(_chapter.id) + '/materials')
  }

  const setLessonFront = async (_chapter) => {
    await getModel(setLessons, '/panel/admin/chapters/' + String(_chapter.id) + '/lessons')
  }

  const setCourseId = () => {
    data.course_id = parseInt(id_program)
  }

  const handleOpenModal = (action) => {
    if (action && modalType === 'new') {
      setModalStatus(action)
      resetData()
    } else if (action && modalType === 'edit') {
      setModalStatus(action)
    } else {
      setModalStatus(action)
      resetData()
    }
  }

  const removeChapter = async (_chapter) => {
    await deleteModel(_chapter)
  }

  const handleSubmit = async (_data) => {
    if (modalType === 'new') {
      await insertModel(_data)
    } else if (modalType === 'edit') {
      await updateModelByID(_data)
    }
    setModalStatus(false)
    resetData()
  }

  const showMaterialApart = async (_chapter) => {
    setChapter(_chapter)
    await setMaterialsFront(_chapter)
    setShowMaterials(true)
    setShowLessons(false)
  }

  const showLessonsApart = async (_chapter) => {
    setChapter(_chapter)
    await setLessonFront(_chapter)
    setShowMaterials(false)
    setShowLessons(true)
  }

  const chapterForm = (_data) => {
    return (
      <div>
        <CModalHeader closeButton>
          <CModalTitle>
            {modalType === 'new' ? 'Nuevo Módulo' : 'Editar Módulo'}
          </CModalTitle>
        </CModalHeader>
        <CForm action="" method="post" className="form-horizontal">
          <CModalBody>
            <CRow>
              <CCol md="2">
                <CFormLabel htmlFor="hf-email">Nombre del módulo</CFormLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CFormInput
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={_data ? _data.name : ''}
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol md="2">
                <CFormLabel htmlFor="hf-email">Inicio</CFormLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CFormInput
                  name="start_date"
                  type="date"
                  onChange={handleChange}
                  value={_data ? _data.start_date.substr(0, 10) : ''}
                />
              </CCol>

              <CCol md="2">
                <CFormLabel htmlFor="hf-email">Fin</CFormLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CFormInput
                  name="end_date"
                  type="date"
                  onChange={handleChange}
                  value={_data ? _data.end_date.substr(0, 10) : ''}
                />
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
              onClick={() => handleSubmit(data)}
            >
              {modalType === 'new' ? 'Registrar' : 'Actualizar'}
            </CButton>
          </CModalFooter>
        </CForm>
      </div>
    )
  }

  const modalEdit = (_data) => {
    setData(_data)
    setModalType('edit')
    setModalStatus(true)
  }

  const modalNew = () => {
    setModalType('new')
    setModalStatus(true)
  }

  useEffect(() => {
    setCourseId()
  }, [])

  return (
    <CCol lg={12}>
      <CCard>
        <CCardHeader>
          Administrar Módulos
        </CCardHeader>
        <CCardBody>
          <CButton
            color="success"
            size="sm"
            className="btn btn-sm btn-success mb-3 float-end"
            onClick={() => {
              modalNew()
              // handleOpenModal(true, 'new');
              // setChapter
            }
            }
          >
            Nuevo Módulo
          </CButton>

          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th> # </th>
                <th> Nombre </th>
                <th> Inicio </th>
                <th> Fin </th>
                <th> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {
                modelIndex.data && modelIndex.data.length > 0 ?
                  modelIndex.data.map((chapter, index) => (
                    <tr key={chapter.id}>
                      <td> {index + 1}</td>
                      <td> {chapter.name} </td>
                      <td> {normalizeDate(chapter.start_date)} </td>
                      <td> {normalizeDate(chapter.end_date)} </td>
                      <td>
                        <CTooltip content="Gestionar Material" placement="top-start">
                          <CButton
                            color="success"
                            size="sm"
                            onClick={() => showMaterialApart(chapter)}
                            className="m-1"
                          >
                            <FontAwesomeIcon icon={faPhotoFilm} inverse />
                          </CButton>
                        </CTooltip>

                        <CTooltip content="Gestionar Sesiones" placement="top-start">
                          <CButton
                            color="info"
                            size="sm"
                            onClick={() => showLessonsApart(chapter)}
                            className="m-1"
                          >
                            <FontAwesomeIcon icon={faList} inverse />
                          </CButton>
                        </CTooltip>

                        <CTooltip content="Editar Módulo" placement="top-start">
                          <CButton
                            color="warning"
                            size="sm"
                            onClick={() => { modalEdit(chapter) }}
                            className="m-1"
                          >
                            <FontAwesomeIcon icon={faPen} inverse />
                          </CButton>
                        </CTooltip>

                        <CTooltip content="Eliminar módulo" placement="top-start">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => removeChapter(chapter)}
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

          <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" backdrop="static">
            {
              chapterForm(data)
            }
          </CModal>

        </CCardBody>
      </CCard>

      {showLessons ?
        <Lessons
          chapter={chapter}
          lessons={lessons}
          setShowLessons={setShowLessons}
        /> : null
      }

      {showMaterials ?
        <Materials
          chapter={chapter}
          materials={materials}
          setShowLessons={setShowMaterials}
        /> : null
      }
    </CCol >
  )
}

export default Chapters
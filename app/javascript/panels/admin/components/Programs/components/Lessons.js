import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CTooltip,
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
  CForm, CFormLabel, CFormInput
} from '@coreui/react-pro'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import HTMLReactParser from 'html-react-parser'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList,
  faPen, faPhotoFilm, faTrash, faVideo, faXmark
} from '@fortawesome/free-solid-svg-icons'

import useCrud from '../../../../../hooks/useCrud'
import useChange from '../../../../../hooks/useChange';

const url_aux = '/panel/admin/chapters/:chapter_id/lessons'

const initialState = {
  name: '',
  topics: '',
  link_video: '',
  chapter_id: ''
}

const Lessons = (props) => {
  const { chapter } = props
  const { id_program } = useParams()

  const [modalStatus, setModalStatus] = useState(false)
  const [topics, setTopics] = useState('')
  const [modalType, setModalType] = useState('')

  const url_ep = url_aux.replace(':chapter_id', chapter.id)
  const url_back = '/programas/' + String(id_program) + '/modulos'

  const { data, handleChange, resetData, setData } = useChange(initialState)
  const { insertModel, updateModel } = useCrud(url_ep, url_back)

  const handleSetLessonUpdate = async (_lesson) => {
    setData(_lesson)
    setTopics(_lesson.topics)
    setModalType('update')
    handleOpenModal(true)
  }

  const handleSubmit = async (_lesson) => {
    const finalData = {
      name: _lesson.name,
      topics: topics,
      link_video: _lesson.link_video,
      chapter_id: chapter.id
    }
    await updateModel(finalData, `/panel/admin/lessons/${_lesson.id}`)
    handleOpenModal(false)
    setTimeout(() => {
      location.reload();
    }, 500)
  }

  const handleOpenModal = (action) => {
    if (action === false) {
      setModalStatus(action)
      resetData()
      setTopics('')
    } else {
      setModalStatus(action)
    }
  }

  const registerLesson = async (_data) => {
    const finalData = {
      name: _data.name,
      topics: topics,
      link_video: _data.link_video,
      chapter_id: props.chapter.id
    }
    await insertModel(finalData)
    setModalStatus(false)
    setTimeout(() => {
      location.reload();
    }, 500)
  }

  return (
    <CRow className='mt-3'>
      { console.log(url_back) }
      <CCol md={12} sm={12} xs={12}>
        <CCard>
          <CCardHeader>
            <b> MÓDULO: {chapter.name}</b>
            <FontAwesomeIcon icon={faXmark} style={{ cursor: "pointer" }} className="float-end" onClick={() => props.setShowLessons(false)}/>
          </CCardHeader>
          <CCardBody>
            <CButton
              color="success"
              size="sm"
              className="btn btn-sm btn-success mb-2 float-end"
              onClick={() => { handleOpenModal(true); setModalType('new') }}
            >
              Agregar Sesión
            </CButton>

            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th> # </th>
                  <th> Nombre de Sesión </th>
                  <th> Temario </th>
                  <th> Grabación </th>
                  <th> Acciones </th>
                </tr>
              </thead>
              <tbody>
                {
                  props.lessons && props.lessons.data.length > 0 ?
                    props.lessons.data.map((lesson, index) => (
                      <tr key={lesson.id}>
                        <td> {index + 1}</td>
                        <td> {lesson.name} </td>
                        <td> {HTMLReactParser(lesson.topics)} </td>
                        <td>
                          { lesson.link_video !== '' ? <CTooltip content="Ver grabación" placement="top-start">
                            <a href={lesson.link_video} target="_blank">
                              <FontAwesomeIcon icon={faVideo} size="lg" />
                            </a>
                          </CTooltip>: <CBadge color="danger">No tiene grabación </CBadge> }
                        </td>
                        <td>
                          <CTooltip content="Editar Sesión" placement="top-start">
                            <CButton
                              color="warning"
                              size="sm"
                              onClick={() => handleSetLessonUpdate(lesson)}
                              className="mr-2"
                            >
                              <FontAwesomeIcon icon={faPen} inverse />
                            </CButton>
                          </CTooltip>

                          {/* <CTooltip content="Eliminar Sesión" placement="top-start">
                            <CButton
                              color="danger"
                              size="sm"
                              // onClick={() => removeMaterial(material)}
                              className="mr-2"
                            >
                              <CIcon
                                name="cil-trash"
                              />
                            </CButton>
                          </CTooltip> */}
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



      <CModal 
        backdrop="static"
        size='lg'
        visible={modalStatus} 
        onClose={() => handleOpenModal(false)}
      >
        {
          <div>
            <CModalHeader closeButton>
              <CModalTitle>
                { modalType === 'new' ? 'Registrar nueva sesión' : 'Editar Sesión' }
              </CModalTitle>
            </CModalHeader>
            <CForm action="" method="post" className="form-horizontal">
              <CModalBody>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-email">Nombre de la Sesión</CFormLabel>
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

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-email">Link de grabación</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput
                      name="link_video"
                      type="text"
                      onChange={handleChange}
                      value={data ? data.link_video : ''}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-topics">Temas de la Sesión</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <ReactQuill
                      id="hf-topics"
                      theme="snow"
                      value={topics}
                      onChange={setTopics}
                      placeholder="Ingrese los temas a tocar en la sesión"
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
                { modalType === 'new' ?
                  <CButton color="success" onClick={() => { registerLesson(data) }}>
                    Registrar
                  </CButton>
                  :
                  <CButton color="success"
                    onClick={() => handleSubmit(data)}
                  >
                    Actualizar
                  </CButton>}
              </CModalFooter>
            </CForm>
          </div>
        }
      </CModal>
    </CRow>
  )

}

export default Lessons
import React, { useState, useEffect } from 'react'
import { saveAs } from "file-saver"
import {
  CTooltip,
  CCollapse,
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
  CForm, CRow, CFormText,
  CCol,
  CButton,
  CFormLabel, CFormInput
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudDownload,
  faFolderTree
} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import { toast } from 'react-toastify';
import { passCsrfToken } from '../../../../../helpers/csrftoken'
import useChange from '../../../../../hooks/useChange'

const url = '/panel/professor/materials/'
const prototypeMaterial = {
  name: '',
}
const singleFile = {
  url: ''
}

const CollapseMaterials = (props) => {
  const [topics, setTopics] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [file, setFile] = useState(singleFile)

  const { data, handleChange, handleChangeFile} = useChange(prototypeMaterial)

  const setToast = (_data) => {
    if (_data.status === 'ok') {
      toast.success(_data.message, { theme: "dark" })
    } else {
      _data.message.map(message => {
        toast.error(message, { theme: "dark" })
      })
    }
  }

  const handleShowMaterials = (e) => {
    setTopics(!topics);
    e.preventDefault();
  }

  const handleOpenModal = (action) => {
    if (action === false) {
      setModalStatus(action)
      // resetData()
    } else {
      setModalStatus(action)
    }
  }

  // const saveFile = (_material) => {
  //   const file = _material.file.url.split('.')
  //   saveAs(
  //     _material.file.url,
  //     _material.name
  //   );
  // }

  const saveFile = (_material) => {
    const file = _material.file.url.split('.')
    saveAs(
      _material.file.url,
      _material.name + "." + file[file.length - 1]
    );
  };

  const insertModel = async (dataModel, url_to) => {
    await axios.post(url_to, dataModel).then(response => {
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleSubmit = async (_data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('file', file)
    formData.append('chapter_id', _data.id)

    await insertModel(formData, url)
    setModalStatus(false)
    setTimeout(() => {
      location.reload();
    }, 800)
  }

  const getMaterial = (_chapter) => {
    const materials = _chapter.materials.map((material, index) => (
      <div key={index} className="row material-item-container">
        <div className="col-md-10 material-item">
          <span className="text-white" onClick={() => saveFile(material)} >{material.name}</span>
        </div>
        <div className="col-md-2">
          <CTooltip content="Descargar material" placement="top-start">
            <FontAwesomeIcon icon={faCloudDownload} className="float-end icon-download-material" size='lg' inverse onClick={() => saveFile(material)} />
          </CTooltip>
        </div>
      </div>
    ))
    return materials
  }

  useEffect(() => {
    if (props.index === 0) {
      setTopics(true)
    }
    passCsrfToken(document, axios)
  }, [])
  return (
    <>
      <div
        className="chapter-title-apart cursor-pointer"
        onClick={handleShowMaterials}
      >
        {props.chapter.name}
      </div>
      <CCollapse
        visible={topics}
      >
        <>
          <div className="row download-material-title">
            <div className="col-md-10 icon-explayed">
              <FontAwesomeIcon icon={faFolderTree} className="icon-folderl" size='lg' style={{ color: "#03f3bb" }} />
            </div>
          </div>
          {getMaterial(props.chapter)}
        </>
      </CCollapse>


      <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" >
        {
          <div>
            <CModalHeader closeButton>
              <CModalTitle>
                Agregar Nuevo Material
              </CModalTitle>
            </CModalHeader>
            <CForm action="" method="post" className="form-horizontal">
              <CModalBody>
                <CRow>
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

                <CRow className="mt-3">
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
                  onClick={() => handleSubmit(props.chapter)}
                >
                  Registrar
                </CButton>
              </CModalFooter>
            </CForm>
          </div>
        }
      </CModal>

    </>
  );
};

export default CollapseMaterials;
import React, { useState } from 'react'
import { saveAs } from "file-saver"
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SweetAlert2 from 'react-sweetalert2'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTooltip,
  CBadge,
  CButton,
  CModalTitle, CModal, CModalHeader, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormInput, CFormText,
  CRow
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudUpload,
  faFileDownload,
  faFileWaveform,
  faPen
} from '@fortawesome/free-solid-svg-icons'

import useChange from '../../../../../hooks/useChange'
import useCrud from '../../../../../hooks/useCrud'


const singleFile = {
  url: ''
}

const Table = (props) => {
  const { 
          getModelData: checkAnswers,
          insertModelData: sendMyAnswer,        
        } = useCrud("")

  const [file, setFile] = useState(singleFile)
  const [swalProps, setSwalProps] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [data, setData] = useState({})
  const { handleChangeFile } = useChange(singleFile)

  let navigate = useNavigate();

  const { program_id, exam_id } = useParams()

  const setBadgeStatus = (status) => {
    switch (status) {
      case 'on_hold':
        return <CTooltip content="El Docente aun no cierra las entregas por lo que aún puedes resolver el examen, revisa tus intentos"><CBadge color="info">En espera de revisión del docente</CBadge></CTooltip>
      case 'graded':
        return <CBadge color="success">Finalizado</CBadge>
      case 'ungraded':
        return <CBadge color="danger">Sin revisar</CBadge>
      default:
        return <CBadge color="primary">En curso</CBadge>
    }
  }

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (_date) => {
    const date = new Date(_date)
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('/') +
      '  a las ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
      ].join(':')
    );
  }

  const check_send_my_answer = async (exam_id) => {
    navigate(`/programas/${program_id}/evaluaciones/${exam_id}/resolver`)

    checkAnswers(`/panel/student/check_send_answer/${exam_id}`).then(response => {
      if (response.data.status === 200) {
        navigate(`/programas/${program_id}/evaluaciones/${exam_id}/resolver`)
      } else {
        alert("Ya se agotó el tiempo para enviar su respuesta")
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const handleOpenModal = (action) => {
    if (action === false) {
      setModalStatus(action)
      // resetData()
    } else {
      setModalStatus(action)
    }
  }

  const saveFile = (_material) => {
    saveAs(
      _material.file.url,
      _material.file_name
    );
  }

  // SWAL
  function handleSwalConfirmation() {
    setSwalProps({
      show: true,
      title: 'Esta seguro(a) de realizar esta entrega?',
      text: 'Esta accion no puede revertirse.',
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "red",
    });
  }

  const handleSubmitAnswer = async () => {
    const manualAnswer = new FormData()
    manualAnswer.append('file', file)
    manualAnswer.append('exam_id', data.id)
    manualAnswer.append('student_id', props.currentUser.id)
    manualAnswer.append('name', data.name)
    manualAnswer.append('status', "ungraded")
    manualAnswer.append('type_answer', 'manual')

    const resp = await sendMyAnswer(manualAnswer, '/panel/student/student_answers')
    if (resp.data.status === "ok") {
      toast.success(resp.message)
      handleOpenModal(false)
      setTimeout(() => {
        location.replace('/students/dashboard/index#/programas/' + String(program_id) + '/evaluaciones')
      }, 300)
    } else {
      toast.error(resp.message)
    }    
  }

  const showButtonResolveExam = (exam) => {
    if (exam.status === "on_hold" && exam.type_exam === "manual") {
      return (
        <CTooltip content="Subir entrega" placement="top-start">
          <CButton
            className="m-1 btn btn-primary btn-sm"
            onClick={() => { handleOpenModal(true); setData(exam) }}
          >
            <FontAwesomeIcon icon={faCloudUpload} size='lg' inverse />
          </CButton>
        </CTooltip>
      )
    } else if (exam.status === "on_hold" && exam.type_exam === "automatic") {
      return (
        <CTooltip content="Intentar resolver" placement="top-start">
          <CButton
            className="m-1 btn btn-primary btn-sm"
            onClick={() => check_send_my_answer(exam.id)}
          >
            <FontAwesomeIcon icon={faPen} size='lg' inverse />
          </CButton>
        </CTooltip>
      )
    } else if (exam.status === "graded") {
      return (
        <CTooltip content="Ver Calificacion" placement="top-start">
          <Link
            className="m-1 btn btn-info btn-sm"
            to={{
              pathname: `/programas/${program_id}/evaluaciones/${exam.id}/mis_notas`,
            }}
          >
            <FontAwesomeIcon icon={faFileWaveform} size='lg' inverse />
          </Link>
        </CTooltip>
      )
    }
  }

  const getAnswer = (answer, exam) => {
    console.log( exam )

    if (exam.type_exam === "automatic") {
      if (answer === null) {
        return "No se ha realizado ninguna entrega"
      } else {
        return "Ya resolvió el examen 😊"
      }
    }else {
      if (answer === null) {
        return "No se ha realizado ninguna entrega"
      } else if (answer.file.url === null ){
        return "No se ha realizado ninguna entrega (*)"
        
      } else if (answer.file.url) {
        return "Si se ha realizado una entrega"
      }
    }
  }

  return (
    <>
      {props.course && props.exams &&
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                EVALUACIONES DEL CURSO: <b> {props.course.name} </b>
              </CCardHeader>
              <CCardBody>
                <table className="table table-hover table-outline mb-0 d-sm-table ">
                  <thead className="thead-light">
                    <tr>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> # </th>
                      <th className=""> Nombre </th>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> Inicio </th>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> Fin </th>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> Duracion </th>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> Intentos </th>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> Entrega </th>
                      <th className="d-none d-xl-table-cell d-sm-table-cell"> Estado </th>
                      <th className=""> Examen </th>
                      <th className=""> Acciones </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      props.exams.map((exam, index) => (
                        <tr key={exam.id}>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {index + 1} </td>
                          <td className=""> {exam.name} </td>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {formatDate(exam.start)} </td>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {formatDate(exam.end)} </td>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {exam.duration} </td>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {exam.type_exam === 'manual' ? 0 : exam.rest_trys} </td>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {exam.duration} </td>
                          <td className="d-none d-xl-table-cell d-sm-table-cell"> {getAnswer(exam.answer, exam)} </td>
                          <td className=""> {exam.type_exam === "manual" ?
                            <CTooltip content="Descargar Examen" placement="top-start">
                              <CButton
                                className="m-1 btn btn-primary btn-sm"
                                onClick={() => saveFile(exam)}
                              >
                                <FontAwesomeIcon icon={faFileDownload} size='lg' inverse />
                              </CButton>
                            </CTooltip>
                            : null} </td>
                          <td className="">

                            {exam.status !== 'graded' && exam.status !== 'on_hold' && exam.type_exam === 'automatic' && (
                              <CTooltip content="Ver revision de evaluacion" placement="top-start">
                                <Link
                                  className="m-1 btn btn-info btn-sm"
                                  to={{
                                    pathname: `/programas/${props.course.id}/ver/${exam.id}`
                                  }}
                                >
                                  TOUCH APP
                                </Link>
                              </CTooltip>
                            )}

                            {showButtonResolveExam(exam)}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      }

      <CModal visible={modalStatus} onClose={() => handleOpenModal(false)} size="lg" backdrop="static" >
        {
          <div>
            <CModalHeader closeButton>
              <CModalTitle>
                Subir entrega
              </CModalTitle>
            </CModalHeader>
            <CForm action="" method="post" className="form-horizontal">
              <CModalBody>
                <CRow row>
                  <CCol xs="12" md="3">
                    <CFormLabel htmlFor="hf-email">Archivo</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput
                      type='file'
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
                  onClick={() => handleSwalConfirmation()}
                >
                  Registrar
                </CButton>
              </CModalFooter>
            </CForm>
          </div>
        }
      </CModal>

      <SweetAlert2 {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={() => {
          setSwalProps({
            show: false
          });
        }}
        onConfirm={result => {
          handleSubmitAnswer()
          // run when clieked in confirm and promise is resolved...
        }}
        onError={error => {
          // run when promise rejected...
        }}
        onResolve={result => {
          // run when promise is resolved...
        }}
      />
    </>
  )
}

export default Table
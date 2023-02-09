import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { saveAs } from "file-saver"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileArrowDown,
  faFileArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import {
  CCol,
  CRow,
  CButton,
  CForm, CFormLabel, CFormInput, CFormSelect, CFormText, CTooltip
} from '@coreui/react-pro'

import useChange from '../../../../../hooks/useChange'
import useNotification from '../../../../../hooks/useNotification';

const singleFile = {
  url: ''
}

const EditExamManual = (props) => {
  // destructuring props
  const { exam } = props.data
  const [startDate, setStartDate] = useState(new Date(exam.start));
  const [endDate, setEndDate] = useState(new Date(exam.end));
  const [fileExam, setFileExam] = useState(singleFile)

  const { data, handleChange, handleChangeFile } = useChange(exam)
  const { setToast } = useNotification()
  // destructuring data from handlechange
  const { id, course_id, name, status, percent, type_exam, duration, attempt, student_visibility } = data

  const handleUpdateManualExam = async (_data) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('course_id', course_id)
    formData.append('name', name)
    formData.append('status', status)
    formData.append('percent', percent)
    formData.append('start', startDate.toISOString())
    formData.append('end', endDate.toISOString())
    formData.append('duration', duration)
    formData.append('student_visibility', student_visibility)
    formData.append('file', fileExam)
    formData.append('type_exam', type_exam)
    formData.append('attempt', attempt)

    await axios.put(`/panel/admin/exams/${id}`, formData).then(response => {
      goBack()
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const saveFile = () => {
    const file = props.data.exam.file.url.split('.')
    saveAs(
      props.data.exam.file.url,
      "evaluacion_manual_" + props.data.exam.name + "." + file[file.length - 1]
    );
  }

  const goBack = () => {
    location.replace(`/admins/dashboard/index#/programas/${exam.course_id}/evaluaciones`)
  }

  return (
    <>
      <CForm>
        <CRow>
          <CCol md={9}>
            <CRow>
              <CCol md="8">
                <CFormLabel htmlFor="name" className="text-primary text-bold">Nombre de evaluacion</CFormLabel>
                <CFormInput id="name" name="name" className="form-horizontal" value={name} onChange={handleChange} />
                <CFormText>Es necesario ingresar el nombre de la evaluacion.</CFormText>
              </CCol>
              <CCol md="4">
                <CFormLabel htmlFor="status" className="text-primary text-bold">Estado del Examen</CFormLabel>
                <CFormSelect custom name="status" id="status" value={status} onChange={handleChange}>
                  <option value="">Sin Asignar</option>
                  <option value="graded"> CALIFICADO - entregas deshabilitadas </option>
                  <option value="ungraded"> SIN CALIFICAR - entregas deshabilitadas </option>
                  <option value="on_hold"> EN ESPERA - entregas habilitadas </option>
                </CFormSelect>
                <CFormText>Es necesario seleccionar el estado de la evaluacion.</CFormText>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="12" md="4">
                <CFormLabel htmlFor="percent" className="text-primary text-bold">Valor del Examen (porcentaje)</CFormLabel>
                <CFormInput id="percent" name="percent" className="form-horizontal" value={percent} onChange={handleChange} />
                <CFormText>Es necesario ingresar el valor de la evaluacion (valor numerico).</CFormText>
              </CCol>
              <CCol md="4">
                <CFormLabel htmlFor="student_visibility" className="text-primary text-bold">Estado del Examen</CFormLabel>
                <CFormSelect custom name="student_visibility" id="student_visibility" value={student_visibility} onChange={handleChange}>
                  <option value="">Sin Asignar</option>
                  <option value="show_exam"> MOSTRAR AL ALUMNO - entregas habilitadas </option>
                  <option value="hidden_exam"> NO MOSTRAR AL ALUMNO - entregas deshabilitadas </option>
                </CFormSelect>
                <CFormText>Es necesario seleccionar el estado de la evaluacion.</CFormText>
              </CCol>
              <CCol xs="12" md="4">
                <CFormLabel htmlFor="attempt" className="text-primary text-bold">Numero de Intentos</CFormLabel>
                <CFormInput id="attempt" name="attempt" className="form-horizontal" value={attempt ? attempt : 0} onChange={handleChange} disabled />
                <CFormText>No es necesario ingresar el valor de la evaluacion (valor numerico).</CFormText>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="12" md="6">
                <CFormLabel htmlFor="start" className="text-primary text-bold">Inicio de la evaluacion</CFormLabel>
                <DateTimePicker onChange={setStartDate} value={startDate} format="dd/MM/y hh:mm a" />
              </CCol>
              <CCol xs="12" md="6">
                <CFormLabel htmlFor="end" className="text-primary text-bold">Final de la evaluacion</CFormLabel>
                <DateTimePicker onChange={setEndDate} value={endDate} format="dd/MM/y hh:mm a" />
              </CCol>
            </CRow>
          </CCol>

          <CCol md={3}>
            <CRow>
              <CCol md="12">
                <CFormLabel htmlFor="file" className="text-primary text-bold">Archivo del examen</CFormLabel>
                <CRow>
                  <CCol>
                    <CTooltip content="Descargar el examen (archivo)">
                      <FontAwesomeIcon icon={faFileArrowDown} className="fa-8x cursor-pointer" onClick={() => saveFile()} />
                    </CTooltip>
                    <input accept="*" id="icon-button-file"
                      type="file" style={{ display: 'none' }}
                      onChange={(e) => handleChangeFile(e, setFileExam)}
                      onClick={(e) => { e.target.value = null }}
                      name="file"
                    />

                  </CCol>
                  <CCol>
                    <CTooltip content="Actualizar examen (archivo)" className="">
                      <label htmlFor="icon-button-file">
                        <FontAwesomeIcon icon={faFileArrowUp} className="fa-8x cursor-pointer" />
                        {/* <i className="fa-solid fa-file-arrow-up fa-8x  cursor-pointer" ></i> */}
                      </label>
                    </CTooltip>
                  </CCol>
                </CRow>
              </CCol>
              <CFormText>Puede descargar el archivo actual o modificarlo.</CFormText>
            </CRow>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={12}>
            <CButton color="danger" size="sm" className="mt-3" onClick={() => goBack()} >Cancelar</CButton>
            <CButton color="primary" size="sm" className="ms-3 mt-3" onClick={() => handleUpdateManualExam()} >Guardar</CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EditExamManual

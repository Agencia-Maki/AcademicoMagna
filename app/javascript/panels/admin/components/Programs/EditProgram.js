import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useCrud from '../../../../hooks/useCrud'
import useChange from '../../../../hooks/useChange'
import { normalizeName } from '../../../../helpers/normalizes'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CButton,
  CForm, CFormLabel, CFormInput, CFormSelect, CFormText, CFormTextarea
} from '@coreui/react-pro'

import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import moment from 'moment'

import Certifications from './certifications'

const initialState = {
  name: '',
  description: '',
  start_date: new Date(),
  end_date: new Date(),
  status: 'on_hold',
  conference_link: '',
  magna_class_link: '',
  duration: '',
  cover: {}
}

const stateStatus = [
  { value: 'on_hold', label: 'En espera' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'completed', label: 'Finalizado' },
  { value: 'cancelled', label: 'Cancelado' }
]

const singleImage = {
  url: ''
}

const EditProgram = () => {
  const { id_program } = useParams()

  const [program, setProgram] = useState(initialState)
  const [professors, setProfessors] = useState([])
  const [categories, setCategories] = useState([])
  const [portada, setPortada] = useState(singleImage)
  const [date, setDate] = useState([new Date(), new Date()]);

  const onChangeDate = date => {
    setDate(date);
  }

  const { getModel, updateModel, getModelData: getProfessors, getModelData: getCategories } = useCrud('/panel/admin/courses/' + id_program, '/programas')
  const { data, handleChange, handleChangeFile } = useChange(program)
  const { name, description, start_date, end_date, status, cover, professor_id, course_category_id, conference_link, magna_class_link, duration } = data;

  const loadData = async () => {
    await getModel(setProgram);
    const professorDataQuery = await getProfessors("/panel/admin/all_professors")
    setProfessors(professorDataQuery)
    const categoryDataQuery = await getCategories("/panel/admin/course_categories")
    setCategories(categoryDataQuery)
  }

  const formatYmd = date => date.toISOString().slice(0, 10);

  const handleUpdateProgram = async (_data) => {
    const formData = new FormData()
    formData.append('name', _data.name)
    formData.append('description', _data.description)
    formData.append('start_date', formatYmd(date[0]))
    formData.append('end_date', formatYmd(date[1]))
    formData.append('status', _data.status)
    formData.append('professor_id', _data.professor_id)
    formData.append('course_category_id', _data.course_category_id)
    formData.append('cover', portada)
    formData.append('conference_link', _data.conference_link)
    formData.append('duration', data.duration)
    formData.append('magna_class_link', _data.magna_class_link)
    await updateModel(formData);
  }

  useEffect(() => {
    loadData()
    setPortada(program.cover)
  }, [])

  useEffect(() => {
    setDate(
      [new Date(moment(start_date)), new Date(moment(end_date))]
    )
  }, [data])

  return (
    <>
      <CRow>
        <CCol lg={7}>
          <CCard>
            <CCardHeader>
              <strong><small>DATOS DEL PROGRAMA</small></strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="name">Nombre del Programa</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="name" name="name" placeholder="Nombres completos" className="form-horizontal" value={name} onChange={handleChange} />
                    <CFormText>Es necesario ingresar el nombre del Programa.</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="conference_link">URL de conferencia</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="conference_link" name="conference_link" placeholder="Link de la conferencia" className="form-horizontal" value={conference_link} onChange={handleChange} />
                    <CFormText>Es necesario el link de la conferencia.</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="magna_class_link">URL de la Clase Magna</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="magna_class_link" name="magna_class_link" placeholder="Link de la conferencia" className="form-horizontal" value={magna_class_link} onChange={handleChange} />
                    <CFormText>Link de la clase magna (gratuito).</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="rol">Docente a cargo</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect custom name="professor_id" id="rol" value={professor_id} onChange={handleChange}>
                      <option value="0">Asignar Docente</option>
                      {professors ? professors.map((professor) => (
                        <option key={professor.id} value={professor.id}>{normalizeName(professor.first_name, professor.last_name)}</option>
                      )) : ''
                      }
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="rol">Categoria</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect custom name="course_category_id" id="rol" value={course_category_id} onChange={handleChange}>
                      {categories ? categories.map((category) => (
                        <option key={category.id} value={category.id} > {category.name} </option>
                      )) : ''
                      }
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="rol">Estado</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect custom name="status" id="rol" value={status} onChange={handleChange}>
                      {stateStatus.map((status, index) => (
                        <option key={index} value={status.value}  >{status.label}</option>
                      ))
                      }
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="description">Descripcion</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormTextarea id="description" name="description" placeholder="Descripcion del programa" value={description} onChange={handleChange} rows="3"></CFormTextarea>
                    <CFormText>Es necesario ingresar la descripcion del programa.</CFormText>
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="description">Fechas de Inicio y Fin</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <DateRangePicker
                      rangeDivider="al"
                      format="dd/MMM/y"
                      onChange={onChangeDate}
                      value={date}
                    />
                    <CFormText>Es necesario ingresar las fechas de Inicio y Fin.</CFormText>
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="duration">Horas Lectivas</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="duration" name="duration" placeholder="Horas Lectivas" className="form-horizontal" value={duration} onChange={handleChange} />
                    <CFormText>Ingresa la duración del curso en Horas Lectivas.</CFormText>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={5}>
          <CCard>
            <CCardHeader>
              Portada
            </CCardHeader>
            <CCardBody style={{ textAlign: 'center' }}>
              <img src={cover.url} alt={name} style={{ width: "100%" }} />
              <CRow className="mt-3">
                <CCol xs="12" md="12">
                  <CFormInput
                    type="file"
                    id="portada"
                    name="portada"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => handleChangeFile(e, setPortada)}
                    onClick={(e) => { e.target.value = null }} />
                  <CFormText>Actualizar portada.</CFormText>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="success"
                className="float-end"
                onClick={() => handleUpdateProgram(data)}
              >
                Guardar
              </CButton>
              <Link to="/programas" className="btn btn-danger btn-sm me-2 float-end">
                Cancelar
              </Link>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <Certifications 
        program={data}
      />
    </>
  )
}

export default EditProgram
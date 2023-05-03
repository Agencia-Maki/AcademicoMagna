import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DateRangePicker from "@wojtekmaj/react-daterange-picker";

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
  CForm, CFormLabel, CFormInput, CFormSelect, CFormText, CFormTextarea, CFormSwitch, CTooltip
} from '@coreui/react-pro'

const initialState = {
  name: '',
  professor_id: 0,
  course_category_id: 0,
  description: '',
  start_date: '',
  end_date: '',
  conference_link: '',
  magna_class_link: '',
  duration: '',
  show_magna_class_link: "show"
}

const singleImage = {
  url: ''
}

const NewProgram = () => {
  const [cover, setCover] = useState(singleImage)

  const {
    insertModel,
    getModelData: getProfessors,
    getModelData: getCategories } = useCrud('/panel/admin/courses', '/programas')
  const { data, handleChange, handleChangeFile } = useChange(initialState)
  const { professor_id, course_category_id, description, name, conference_link, magna_class_link, duration } = data

  const [date, setDate] = useState([new Date(), new Date()]);
  const [professors, setProfessors] = useState([])
  const [categories, setCategories] = useState([])
  const [courseFreeStatus, setCourseFreeStatus] = useState(false)


  const onChangeDate = date => {
    setDate(date);
  }

  const onChangeSwitch = (e) => {
    // setCourseFreeStatus(!courseFreeStatus)
    setCourseFreeStatus(e.target.checked)
  }

  const loadData = async () => {
    const professorDataQuery = await getProfessors("/panel/admin/all_professors")
    setProfessors(professorDataQuery)

    const categoryDataQuery = await getCategories("/panel/admin/course_categories")
    setCategories(categoryDataQuery)
  }

  const formatYmd = date => date.toISOString().slice(0, 10);


  const insertProgram = async () => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('professor_id', data.professor_id)
    formData.append('course_category_id', data.course_category_id)
    formData.append('description', data.description)
    formData.append('start_date', formatYmd(date[0]))
    formData.append('end_date', formatYmd(date[1]))
    formData.append('conference_link', data.conference_link)
    formData.append('magna_class_link', data.magna_class_link)
    formData.append('duration', data.duration)
    formData.append('its_free', courseFreeStatus ? "free" : "paid")
    formData.append('cover', cover)

    await insertModel(formData)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              <strong>Registrar Nuevo Programa</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol md="8">
                    <CRow>
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
                        <CFormLabel htmlFor="professor">Docente a cargo</CFormLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CFormSelect custom name="professor_id" id="professor" value={professor_id} onChange={handleChange}>
                          <option value="0">Asignar Docente</option>
                          {
                            professors ? professors.map((professor) => (
                              <option key={professor.id} value={professor.id}>{normalizeName(professor.first_name, professor.last_name)}</option>
                            )) : ''
                          }
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol md="3">
                        <CFormLabel htmlFor="category_id">Categoria</CFormLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CFormSelect custom name="course_category_id" id="category_id" value={course_category_id} onChange={handleChange}>
                          <option value="0">Asignar Categoría</option>
                          {
                            categories ? categories.map((category) => (
                              <option key={category.id} value={category.id}>{category.name} - {category.slug}</option>
                            )) : ''
                          }
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol md="3">
                        <CFormLabel htmlFor="magna_class_link">Clase Magna</CFormLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CFormInput id="magna_class_link" name="magna_class_link" placeholder="Link de la clase Magna" className="form-horizontal" value={magna_class_link} onChange={handleChange} />
                        <CFormText>Ingresa el link de la clase Magna (Extra).</CFormText>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol md="3">
                        <CFormLabel htmlFor="description">Descripcion</CFormLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CFormTextarea id="description" name="description" placeholder="Descripcion del programa" value={description} onChange={handleChange} rows="5"></CFormTextarea>
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
                          format="dd-MM-y"
                          onChange={onChangeDate}
                          value={date}
                        />
                        <CFormText>Es necesario ingresar las fechas de Inicio y Fin.</CFormText>
                      </CCol>
                    </CRow>

                    <CRow className="mt-3">
                      <CCol md="3">
                        <CFormLabel htmlFor="duration">Duración (Horas)</CFormLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CFormInput id="duration" name="duration" placeholder="Duración del curso" className="form-horizontal" value={duration} onChange={handleChange} />
                        <CFormText>Ingresa la duración del curso en Horas.</CFormText>
                      </CCol>
                    </CRow>

                    <CRow className="mt-3">
                      <CCol md="3">
                        <CFormLabel htmlFor="its_free">Curso Gratuito?</CFormLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CTooltip content="El curso gratuito estará disponible para todos los alumnos con al menos una matrícula vigente">
                          <CFormSwitch label="Marca esta opcion si este curso es gratuito" id="its_free" onChange={(e) => onChangeSwitch(e)}/>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol md="4">
                    <CRow row>
                      <CCol xs="12" md="12">
                        <CFormInput type="file" id="cover" name="cover" accept="image/*" multiple={false} onChange={(e) => handleChangeFile(e, setCover)} onClick={(e) => { e.target.value = null }} />
                        <CFormText>Seleccione una portada.</CFormText>
                      </CCol>
                    </CRow>
                  </CCol>

                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="success"
                className="float-end ms-2"
                onClick={() => insertProgram()}
              >
                Registrar
              </CButton>
              <Link
                to="/programas"
                className="btn btn-sm btn-danger float-end"
              >
                Cancelar
              </Link>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
export default NewProgram
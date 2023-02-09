import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CButton,
  CTooltip,
  CForm, CFormLabel, CFormInput, CFormText
} from '@coreui/react-pro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen
} from '@fortawesome/free-solid-svg-icons'

import useCrud from '../../../../../hooks/useCrud'
import useChange from '../../../../../hooks/useChange'


const initialCategory = {
  name: '',
  slug: ''
}

const CourseCategories = (props) => {
  const { categories, refreshCategoriesList } = props
  const [category, setCategory] = useState(initialCategory)
  const [statusForm, setStatusForm] = useState(0)         //  0 => no mostrar formulario    ||  1 => mostrar formulario para nuevo    ||   2 => mostrar formulario para editar

  const { insertModel, updateModel } = useCrud('/panel/admin/course_categories')

  const { data, handleChange, resetData } = useChange(category)

  const handleSubmit = async (data) => {
    statusForm === 1 ? await insertModel(data) : await updateModel(data, `/panel/admin/course_categories/${data.id}`)
    setStatusForm(0)
    setCategory(initialCategory)
    await refreshCategoriesList()
  }

  const handleShowForm = (typeForm, rol = {}) => {
    setStatusForm(typeForm)
    if (typeForm === 1 || typeForm === 0) {
      setCategory(initialCategory)
      resetData()
    } else {
      setCategory(rol)
    }
  }

  return (
    <>
      <CRow className="mt-3">
        <CCol md={8} xs={12}>
          <CCard>
            <CCardHeader>
              Categorias de Programa
            </CCardHeader>
            <CCardBody>
              <CButton
                onClick={() => handleShowForm(1)}
                className="btn btn-sm btn-success mb-3 float-end"
              >
                Nueva Categoria 
              </CButton>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Nombre de Categoria </th>
                    <th className="text-center"> Abreviatura </th>
                    <th className="text-center"> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories.length ?
                      categories.map((category, index) => (
                        <tr key={category.id}>
                          <td className="text-center"> {index + 1} </td>
                          <td> {category.name} </td>
                          <td className="text-center"> {category.slug} </td>
                          <td className="text-center">
                            <CTooltip content="Actualizar">
                              <CButton color="warning" size="sm" className="m-1" onClick={() => handleShowForm(2, category)}>
                                <FontAwesomeIcon icon={faPen} inverse />
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

        {statusForm > 0 ?
          <CCol md={4} xs={12}>
            <CCard>
              <CCardHeader>
                {statusForm === 1 ? ' Registrar nueva Categoria' : 'Actualizar Categoria'}
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CRow row>
                    <CCol md="3">
                      <CFormLabel htmlFor="name">Nombre</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormInput id="name" name="name" placeholder="Nombre de la Categoria" className="form-horizontal" value={data.name} onChange={handleChange} />
                      <CFormText>Es necesario ingresar el nombre de la categoria.</CFormText>
                    </CCol>
                  </CRow>
                  <CRow row>
                    <CCol md="3">
                      <CFormLabel htmlFor="slug">Abreviatura</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormInput id="slug" name="slug" placeholder="Abreviatura del Cargo" value={data.slug} onChange={handleChange} />
                      <CFormText>Es necesario ingresar la abreviatura del cargo, recuerda que debe ser unico.</CFormText>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  color="success"
                  size="sm"
                  className="float-end"
                  onClick={() => handleSubmit(data)}
                >
                  {statusForm === 1 ? ' Registrar Categoria' : 'Actualizar Categoria'}
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  className="me-2 float-end"
                  onClick={() => setStatusForm(0)}
                >
                  Cancelar
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
          :
          null
        }

      </CRow>
    </>
  )
}

export default CourseCategories
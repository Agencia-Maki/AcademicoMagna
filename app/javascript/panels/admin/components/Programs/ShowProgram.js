import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CForm,
  CBadge,
  CCardImage,
  CButton
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'
import { normalizeDate } from '../../../../helpers/normalizes'

const initialState = {
  name: '',
  last_name: '',
  dni: '',
  email: '',
  gender: 'no_specified',
  phone: '',
  cover: {
    url: ''
  },
  created_at: '',
  professor: {},
  course_category: {}
}

const ShowProgram = () => {
  const [program, setProgram] = useState(initialState)
  const { id_program } = useParams()
  const { getModel } = useCrud('/panel/admin/courses/' + id_program, '/programas')

  const handleSetProgram = async () => {
    await getModel(setProgram);
  }

  const normalizeStatus = (status) => {
    if (status === 'in_progress') {
      return <CBadge color="info" > En progreso </CBadge>
    } else if (status === 'completed') {
      return <CBadge color="success" > Finalizado </CBadge>
    } else if (status === 'on_hold') {
      return <CBadge color="secondary" > En espera </CBadge>
    } else if (status === 'cancelled') {
      return <CBadge color="danger" > Cancelado </CBadge>
    }
  }

  useEffect(() => {
    handleSetProgram()
  }, [])

  return (
    <>
      <CRow>
        <CCol md={8} sm={12}>
          <CCard>
            <CCardHeader>
              Detalles del Programa
            </CCardHeader>
            <CCardBody>
              <CForm
                className="p-1"
              >
                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Nombre</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold" >{program.name} </strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Descripción</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold text-justify" >{program.description}</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Clase Magna Link</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold" >{program.magna_class_link}</strong>
                  </CCol>
                </CRow>


                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Inicio</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold" >{normalizeDate(program.start_date)}</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Final</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold" >{normalizeDate(program.end_date)}</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Estado</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold" >{normalizeStatus(program.status)}</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Docente</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold" >{`${program.professor.first_name} ${program.professor.last_name}`}</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-2"
                >
                  <CCol md="3">
                    <strong>Categoría</strong>
                  </CCol>
                  <CCol xs="12" md="9">
                    <strong className="text-bold">{program.course_category.name}</strong>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="12">
                    <Link className="btn btn-danger btn-sm float-end" to="/programas">
                      Regresar
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4} sm={12}>
          <CRow
            className="border-top border-bottom border-left border-right p-2"
          >
            <CCard>
              <CCardHeader>
                <strong>Portada</strong>
              </CCardHeader>
              <CCardBody>
                <CCardImage orientation="top" src={program.cover.url} />
              </CCardBody>
            </CCard>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default ShowProgram
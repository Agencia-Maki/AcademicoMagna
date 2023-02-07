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
  CImage
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'
import { normalizeDate, normalizeStatus, normalizeDocument } from '../../../../helpers/normalizes'

const initialState = {
  first_name: '',
  last_name: '',
  document_type: '',
  document_number: '',
  email: '',
  gender: 'no_specified',
  phone: '',
  avatar: {},
  status: '',
  created_at: ''
}

const ShowStudent = (props) => {
  const [student, setStudent] = useState(initialState)
  const { id_student } = useParams()
  const { getModel } = useCrud('/panel/admin/students/' + id_student, '/alumnos')

  const handleSetStudent = async () => {
    await getModel(setStudent);
  }

  useEffect(() => {
    handleSetStudent()
  }, [])

  return (
    <div>
      <CRow>
        <CCol md={4} sm={12} >
          <CCard>
            <CCardHeader>
              Perfil de Alumno
            </CCardHeader>
            <CCardBody>
              <CImage rounded thumbnail align="center" src={student.avatar.url} />
            </CCardBody>

            <CCardFooter>
              <Link 
                className="btn btn-sm btn-warning float-end"
                to={'/alumnos/editar/' + id_student } 
              >
                Editar Alumno
              </Link>

              <Link 
                className="btn btn-sm btn-info float-start"
                to={'/alumnos' } 
              >
                Regresar
              </Link>
            </CCardFooter>
          </CCard>
        </CCol>

        <CCol md={8} sm={12} >
          <CCard>
            <CCardHeader>
              Perfil de Alumno
            </CCardHeader>
            <CCardBody>
              <CForm 
                className="p-3"
              >
                <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Nombres y Apellidos</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold" >{ student.first_name } { student.last_name }</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Tipo de Documento</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold" >{ normalizeDocument(student.document_type) }</strong>
                  </CCol>
                </CRow>

                <CRow
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Numero de Documento</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold" >{ student.document_number }</strong>
                  </CCol>
                </CRow>

                <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Codigo Institucional</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold" >{ student.code }</strong>
                  </CCol>
                </CRow>

                 <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Telefono de Contacto</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold" >{ student.phone === null ? 'Sin registrar' : student.phone }</strong>
                  </CCol>
                </CRow>

                 <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Correo Electronico</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold">{ student.email }</strong>
                  </CCol>
                </CRow>

                <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Fecha de Registro</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold">{ normalizeDate(student.created_at) }</strong>
                  </CCol>
                </CRow>

                <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Estado de Matricula</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold">{ normalizeStatus(student.status) }</strong>
                  </CCol>
                </CRow>

              </CForm>              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}


export default ShowStudent
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  CCard,
  CCardImg,
  CCardBody,
  CCardText,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CForm, CFormGroup
} from "@coreui/react"

import useCrud from '../../../../hooks/useCrud'
import { normalizeDate, normalizeDocument } from '../../../../helpers/normalizes'

const initialState = {
  first_name: '',
  last_name: '',
  dni: '',
  email: '',
  gender: 'no_specified',
  phone: '',
  avatar: {},
  created_at: ''
}

const ShowProfessor = (props) => {
  const [professor, setProfessor] = useState(initialState)
  const id_professor = props.match.params.id
  const { getModel } = useCrud('/panel/admin/professors/' + id_professor, '/profesores')

  const handleSetProfessor = async () => {
    await getModel(setProfessor);
  }

  useEffect(() => {
    handleSetProfessor()
  }, [])

  return (
    <div>
      <CRow>
        <CCol md={4} sm={12} >
          <CCard>
            <CCardHeader>
              Perfil de Docente
            </CCardHeader>
            <CCardBody>
              <CCardImg orientation="top" src={professor.avatar.url} />
            </CCardBody>

            <CCardFooter>
              <Link 
                className="btn btn-sm btn-warning float-right"
                to={'/profesores/editar/' + id_professor } 
              >
                Editar Docente
              </Link>

              <Link 
                className="btn btn-sm btn-info float-left"
                to={'/profesores/' } 
              >
                Regresar
              </Link>
            </CCardFooter>
          </CCard>
        </CCol>

        <CCol md={8} sm={12}>
          <CCard>
            <CCardHeader>
              Perfil de Docente
            </CCardHeader>
            <CCardBody>
              <CForm 
                className="p-3"
              >
                <CFormGroup 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Nombres y Apellidos</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold" >{professor.first_name} {professor.last_name}</CCardText>
                  </CCol>
                </CFormGroup>

                <CFormGroup
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Tipo de Documento</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold" >{ normalizeDocument(professor.document_type) }</CCardText>
                  </CCol>
                </CFormGroup>

                <CFormGroup
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Numero de Documento</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold" >{ professor.document_number }</CCardText>
                  </CCol>
                </CFormGroup>

                <CFormGroup 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Codigo Institucional</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold" >{professor.code}</CCardText>
                  </CCol>
                </CFormGroup>

                 <CFormGroup 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Telefono de Contacto</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold" >{professor.phone === null ? 'Sin registrar' : professor.phone}</CCardText>
                  </CCol>
                </CFormGroup>

                 <CFormGroup 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Correo Electronico</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold">{professor.email}</CCardText>
                  </CCol>
                </CFormGroup>

                <CFormGroup 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <CCardText>Fecha de Registro</CCardText>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CCardText className="text-bold">{normalizeDate(professor.created_at)}</CCardText>
                  </CCol>
                </CFormGroup>

              </CForm>              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ShowProfessor
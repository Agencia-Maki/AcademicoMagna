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
  const { id_professor } = useParams()
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
              <CImage rounded thumbnail align="center" src={professor.avatar.url} />
            </CCardBody>

            <CCardFooter>
              <Link 
                className="btn btn-sm btn-warning float-end"
                to={'/profesores/editar/' + id_professor } 
              >
                Editar Docente
              </Link>

              <Link 
                className="btn btn-sm btn-info float-start"
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
                <CRow 
                  className="border-top border-bottom border-left border-right p-3"
                  row
                >
                  <CCol md="4">
                    <strong>Nombres y Apellidos</strong>
                  </CCol>
                  <CCol xs="12" md="6">
                    <strong className="text-bold" >{professor.first_name} {professor.last_name}</strong>
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
                    <strong className="text-bold" >{ normalizeDocument(professor.document_type) }</strong>
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
                    <strong className="text-bold" >{ professor.document_number }</strong>
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
                    <strong className="text-bold" >{professor.code}</strong>
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
                    <strong className="text-bold" >{professor.phone === null ? 'Sin registrar' : professor.phone}</strong>
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
                    <strong className="text-bold">{professor.email}</strong>
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
                    <strong className="text-bold">{normalizeDate(professor.created_at)}</strong>
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

export default ShowProfessor
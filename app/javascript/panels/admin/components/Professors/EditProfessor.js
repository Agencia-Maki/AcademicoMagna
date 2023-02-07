import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useCrud from '../../../../hooks/useCrud'
import useChange from '../../../../hooks/useChange'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CButton,
  CForm, CFormGroup, CLabel, CInput, CSelect, CFormText, CInputRadio
} from "@coreui/react"
import CIcon from '@coreui/icons-react'

const initialState = {
  first_name: '',
  last_name: '',
  document_number: '',
  document_type: '',
  email: '',
  gender: 'no_specified',
  phone: '',
  avatar: {}
}

const documentTypeOptions = [
  { value: 'dni', label: 'D.N.I' },
  { value: 'foreigner_card', label: 'Carnet de Extranjeria' },
  { value: 'passport', label: 'Pasaporte' }
]

const EditProfessor = (props) => {
  const [professor, setProfessor] = useState(initialState)
  const id_professor = props.match.params.id

  const { getModel, updateModel } = useCrud('/panel/admin/professors/' + id_professor, '/profesores')
  const { data, handleChange } = useChange(professor)
  const { first_name, last_name, document_number, document_type, email, phone, gender, avatar } = data;

  const handleSetProfessor = async () => {
    await getModel(setProfessor);
  }

  useEffect(() => {
    handleSetProfessor()
  }, [])
  
  return (
    <div>
      <CRow>
        <CCol lg={7}>
          <CCard>
            <CCardHeader>
              Datos de Usuario
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_name">Nombres</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="first_name" name="first_name" className="form-horizontal" value={first_name} onChange={handleChange} />
                    <CFormText>Es necesario ingresar los nombres completos.</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="last_name">Apellidos</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="last_name" name="last_name" className="form-horizontal" value={last_name} onChange={handleChange} />
                    <CFormText>Es necesario ingresar los apellidos completos.</CFormText>
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="document_type">Tipo de Documento</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="document_type" id="document_type" value={document_type} onChange={handleChange}>
                      {documentTypeOptions.map((documentType, index) => (
                        <option key={index} value={documentType.value}  >{documentType.label}</option>
                      ))
                      }
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="document_number">Nro de Documento</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="document_number" name="document_number" placeholder="Numero de documento" value={document_number} onChange={handleChange} />
                    <CFormText>Es necesario ingresar el documento de identidad.</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">E-mail</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email" name="email" placeholder="Correo electronico" value={email} onChange={handleChange} />
                    <CFormText className="help-block">Ingrese un correo electronico valido</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone">Telefono / Celular</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="phone" name="phone" placeholder="Numero de contacto" value={phone} onChange={handleChange} />
                    <CFormText>Ingrese un numero de telefono o celular de contacto .</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Genero</CLabel>
                  </CCol>
                  <CCol md="9" >
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="male" name="gender" value="male" checked={gender === "male"} onChange={handleChange} />
                      <CLabel variant="custom-checkbox" htmlFor="male">Masculino</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="female" name="gender" value="female" checked={gender === "female"} onChange={handleChange} />
                      <CLabel variant="custom-checkbox" htmlFor="female">Femenino</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="no_specified" name="gender" value="no_specified" checked={gender === "no_specified"} onChange={handleChange} />
                      <CLabel variant="custom-checkbox" htmlFor="no_specified">Sin Especificar</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={5}>
          <CCard>
            <CCardHeader>
              Foto
            </CCardHeader>
            <CCardBody style={{ textAlign: 'center' }}>
              <img src={data.avatar.url} alt={data.first_name} />
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="success"
                onClick={()=>updateModel(data)}
              >
                <CIcon name="cil-scrubber" />
                Guardar
              </CButton>
              <Link to="/profesores" className="btn btn-danger btn-sm ml-2">
                <CIcon name="cil-ban" />
                Cancelar
              </Link>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default EditProfessor
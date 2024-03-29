import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  CForm, CFormLabel, CFormInput, CFormSelect, CFormText, CFormCheck
} from '@coreui/react-pro'

const initialState = {
  first_name: '',
  last_name: '',
  document_number: '',
  document_type: '',
  email: '',
  gender: 'no_specified',
  phone: '',
  avatar: {},
  signature: {}
}

const documentTypeOptions = [
  { value: 'dni', label: 'D.N.I' },
  { value: 'foreigner_card', label: 'Carnet de Extranjeria' },
  { value: 'passport', label: 'Pasaporte' }
]

const EditProfessor = () => {
  const [professor, setProfessor] = useState(initialState)
  const { id_professor } = useParams()

  const { getModel, updateModel } = useCrud('/panel/admin/professors/' + id_professor, '/profesores')
  const { data, handleChange } = useChange(professor)
  const { first_name, last_name, document_number, document_type, email, phone, gender, avatar, signature } = data;

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
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="first_name">Nombres</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="first_name" name="first_name" placeholder="Nombres completos" className="form-horizontal" value={first_name} onChange={handleChange} />
                    <CFormText className="text-info" >Es necesario ingresar los nombres completos.</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="last_name">Apellidos</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="last_name" name="last_name" placeholder="Apellidos completos" value={last_name} onChange={handleChange} />
                    <CFormText className="text-info" >Es necesario ingresar los apellidos completos.</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="document_type">Tipo de Documento</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect custom name="document_type" id="document_type" value={document_type} onChange={handleChange}>
                      <option value=""> Selecciona un tipo de documento </option>
                      {documentTypeOptions.map((documentType, index) => (
                        <option key={index} value={documentType.value}  >{documentType.label}</option>
                      ))
                      }
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="document_number">Nro de Documento</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="document_number" name="document_number" placeholder="Ingrese el numero de documento" value={document_number} onChange={handleChange} />
                    <CFormText className="text-info" >Es necesario ingresar el documento de identidad.</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="email">E-mail</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput type="email" id="email" name="email" placeholder="Correo electronico" value={email} onChange={handleChange} />
                    <CFormText className="text-info" >Ingrese un correo electronico valido</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="phone">Telefono / Celular</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput id="phone" name="phone" placeholder="Numero de contacto" value={phone} onChange={handleChange} required />
                    <CFormText className="text-info" >Ingrese un numero de telefono o celular de contacto .</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="3">
                    <CFormLabel>Genero</CFormLabel>
                  </CCol>
                  <CCol md="9" >
                    <CRow variant="custom-radio" inline>
                      <CFormCheck inline type="radio" name="gender" id="inlineCheckbox1" value="male" label="Masculino" checked={gender === "male"} onChange={handleChange} />
                      <CFormCheck inline type="radio" name="gender" id="inlineCheckbox2" value="female" label="Femenino" checked={gender === "female"} onChange={handleChange} />
                      <CFormCheck inline type="radio" name="gender" id="inlineCheckbox3" value="no_specified" label="Sin Especificar" checked={gender === "no_specified"} onChange={handleChange} />
                    </CRow>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={5}>
          <CCard>
            <CCardHeader>
              Foto / Firma
            </CCardHeader>
            <CCardBody style={{ textAlign: 'center' }}>
              <img src={data.avatar.url} alt={data.first_name} />
              <br />
              <br />
              <img src={ data.signature.url } alt={data.first_name} style={{ width: "40%" }} />
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="success"
                onClick={() => updateModel(data)}
                className="float-end"
              >                
                Guardar
              </CButton>
              <Link to="/profesores" className="btn btn-danger btn-sm me-2 float-end">                
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
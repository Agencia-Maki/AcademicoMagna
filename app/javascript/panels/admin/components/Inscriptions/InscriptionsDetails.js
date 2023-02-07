import React, { useState, useEffect } from 'react'
import useCrud from '../../../../hooks/useCrud'
import { normalizeName, normalizeDate } from '../../../../helpers/normalizes'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm, CFormGroup, CLabel, CInput, CFormText, CCardFooter, CSelect
} from "@coreui/react"

import CIcon from '@coreui/icons-react'

const url_ep = '/panel/admin/inscriptions/course/:course_id/students' 

const InscriptionsDetails = (props) => {
  const { currentCourse, setShowDetail } = props
  const [students, setStudents] = useState([])

  const { modelIndex, insertModel, deleteModelWhitUrl, getModel } = useCrud(url_ep.replace(':course_id', currentCourse.id))

  const handleDeleteInscription = async (_student) => {
    const url_to = `/panel/admin/inscriptions/course/${currentCourse.id}/students/${_student.id}/delete_inscription`
    deleteModelWhitUrl(url_to)
  }

  useEffect(() => {
    getModel(setStudents)
  }, [currentCourse])
  
  return (
    <>
      { console.log(students) }
      {currentCourse && <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              <CIcon 
                name="cil-x"
                className="float-right cursor-pointer"
                onClick={() => setShowDetail(false)}
              />
              Detalles de las matriculas: <b> {currentCourse.name} </b>
            </CCardHeader>
            <CCardBody>
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className=""> # </th>
                    <th className=""> Nombres completos </th>
                    <th className=""> Telefono </th>
                    <th className=""> Correo </th>
                    <th className=""> Fecha de Matricula </th>
                    <th className=""> Estado de Matricula </th>
                    <th className=""> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students.length > 0 ?
                      students.map((student, index) => (
                        <tr key={student.id}>
                          <td> {index + 1} </td>
                          <td className=""> {student.full_name} </td>
                          <td className=""> {student.phone} </td>
                          <td className=""> {student.email} </td>
                          <td className=""> {student.inscription.date_inscription} </td>
                          <td className=""> {student.inscription.status} </td>
                          <td className="">
                            <CButton
                              color="danger"
                              size="sm"
                              className="mr-2"
                              onClick={() => handleDeleteInscription(student)}
                            >
                              Eliminar Matricula
                            </CButton>

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
      </CRow>
      }
    </>
  )
}

export default InscriptionsDetails

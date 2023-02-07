import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'
import StudentsTable from './extras/StudentsTable'

const url_ep = '/panel/admin/all_students'     // url_end_point
const Students = () => {
  const { 
    getModelData: getStudentList
  } = useCrud(url_ep)


  const columns = [
    { key: 'index', label: '#' },
    { key: 'full_name', label: 'Nombres Completo' },
    { key: 'document_type', label: 'Tipo de Documento' },
    { key: 'document_number', label: 'Numero de Documento' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Telefono' },
    { key: 'actions', label: 'Acciones' },
  ]

  const [studentList, setStudentList] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = async() => {
    // setLoading(true)
    const data = await getStudentList()
    // console.log(data)
    setStudentList(
      data.map((student, index) => {
        return {
          ...student,
          index: index + 1,
          full_name: student.first_name + ' ' + student.last_name,
        }
      })
    )
    setLoading(false)
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
              Panel de Alumnos
            </CCardHeader>
            <CCardBody>
              <Link
                to="/profesores/nuevo"
                className="btn btn-sm btn-success mb-3 float-end"
              >
                Registrar Nuevo Profesor
              </Link>

              {
                loading ? <CSpinner /> : <StudentsTable data={studentList} columns={columns} />
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Students;
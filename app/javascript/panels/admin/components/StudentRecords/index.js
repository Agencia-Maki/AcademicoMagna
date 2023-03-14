import React, { useState, useEffect } from 'react'
import {
  CCard, CCardBody, CCardHeader,
  CCol, CRow
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'

import StudentRecordsTable from './extras/StudentRecordsTable'
import EnrolledStudentModal from './extras/EnrolledStudentModal'

const StudentRecords = () => {
  const {
    getModelData: getStudentRecords,
    getModelData: getActiveCourses
  } = useCrud("/panel/admin/student_records")

  const [studentRecords, setStudentRecords] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [showEnrolledModal, setShowEnrolledModal] = useState(false)
  const [currentStudentRecord, setCurrentStudentRecord] = useState({})

  const loadData = async () => {
    setLoading(true)
    const { student_records } = await getStudentRecords()
    setStudentRecords(student_records.map((student_record, index) => ({ ...student_record, index: index + 1, full_name: `${student_record.first_name} ${student_record.last_name}` })))
    const { courses } = await getActiveCourses("/panel/admin/courses/active")
    setCourses(courses)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              <strong><small>Ficha de Alumnos</small></strong>
            </CCardHeader>
            <CCardBody>
              <strong>
                <small className='text-danger'>MAGNA te recuerda:</small>
              </strong>
              <ul>
                <li>
                  <strong>
                    <small className='text-info'>Todas las fichas registradas en este panel provienen del CRM.</small>
                  </strong>
                </li>
                <li>
                  <strong>
                    <small className='text-info'>El código del curso es referencial (no siempre es el mismo del CRM al del aula virtual).</small>
                  </strong>
                </li>
                <li>
                  <strong>
                    <small className='text-info'>Cuando hagas click en el boton de "Registrar Alumno" se le enviará el correo de bienvenida, ya sea nuevo registro o el alumno ya haya sido registrado con anterioridad.</small>
                  </strong>
                </li>
                <li>
                  <strong>
                    <small className='text-info'>El proceso de envio de correo de bienvenida es inmediato.</small>
                  </strong>
                </li>
              </ul>

              <StudentRecordsTable
                data={studentRecords}
                setShowModal={setShowEnrolledModal}
                setCurrentStudentRecord={setCurrentStudentRecord}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {
        showEnrolledModal &&
        <EnrolledStudentModal
          showModal={showEnrolledModal}
          setShowModal={setShowEnrolledModal}
          currentStudentRecord={currentStudentRecord}
          setCurrentStudentRecord={setCurrentStudentRecord}
          courses={courses}
          refreshData={loadData}
        />
      }
    </>
  )
}

export default StudentRecords
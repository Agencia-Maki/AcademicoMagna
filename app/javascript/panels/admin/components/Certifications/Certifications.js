import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react-pro'

import TableCourses from './components/TableCourses'
import ModalEmitCertificates from './components/ModalEmitCertificates'

import useCrud from '../../../../hooks/useCrud'
import Loading from '../../../GeneralComponents/Loading'



const Certifications = () => {
  const { getModelData: getCourses } = useCrud("/panel/admin/v2/courses/inactive")

  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])

  const [showModalCertificates, setShowModalCertificates] = useState(false)
  const [courseSelected, setCourseSelected] = useState({})
  const [loadingStudents, setLoadingStudents] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const { courses } = await getCourses()
    setCourses(courses.map((course, index) => ({ ...course, index: index + 1 })))
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Listado de Cursos Finalizados</strong>
        </CCardHeader>
        <CCardBody>
          {
            loading ? <Loading /> :
              <TableCourses
                courses={courses}
                setShowModalCertificates={setShowModalCertificates}
                setCourseSelected={setCourseSelected}
                setLoadingStudents={setLoadingStudents}
              />
          }
        </CCardBody>
      </CCard>

      {
        showModalCertificates &&
        <ModalEmitCertificates
          courseSelected={courseSelected}
          setShowModalCertificates={setShowModalCertificates}
          showModalCertificates={showModalCertificates}
          setCourseSelected={setCourseSelected}
          loadingStudents={loadingStudents}
        />
      }
    </>
  )
}

export default Certifications
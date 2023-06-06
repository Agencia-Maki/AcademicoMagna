import React from 'react'
import {
  CTooltip,
  CSmartTable,
  CButton,
  CBadge
} from '@coreui/react-pro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAward,
} from '@fortawesome/free-solid-svg-icons'

import useCrud from '../../../../../hooks/useCrud'

const TableCourses = ({ courses, setShowModalCertificates, setCourseSelected, setLoadingStudents }) => {
  const columns = [
    { key: 'index', label: '#', filter: false, sorter: false },
    { key: 'name', label: 'Nombre', filter: false, sorter: false },
    { key: 'slug', label: 'Codigo', filter: false, sorter: false },
    { key: 'course_type', label: 'Tipo de Curso', filter: false, sorter: false },
    { key: 'actions', label: 'Acciones', filter: false, sorter: false },
  ]

  const { getModelData: getStudents } = useCrud("")

  const getBadgeCourseType = (course_type) => {
    // console.log(course_type)
    if (course_type === 'program'){
      return( 
        <CTooltip> 
          <CBadge color='success'> Programa </CBadge>
        </CTooltip>
      )
    } else if (course_type === 'course'){
      return(
        <CTooltip> 
          <CBadge color='info'> Curso </CBadge>
        </CTooltip>
      )
    }else {
      return( 
        <CTooltip> 
          <CBadge color='danger'> Sin Especificar </CBadge>
        </CTooltip>
      )
    }
  }

  const handleOpenModalCertificate = async(course) => {
    setLoadingStudents(true)
    setShowModalCertificates(true)
    const { students } = await getStudents(`/panel/admin/v2/students/by_course/${course.id}`)
    const dataCourse = {...course, students: students}
    setCourseSelected(dataCourse)
    setLoadingStudents(false)
  }

  return (
    <>
      <CSmartTable
        sorterValue={{ column: 'index', state: 'asc' }}
        // clickableRows
        // onRowClick={(item) => showLeadDetail(item)}
        tableProps={{
          striped: true,
          hover: true,
          responsive: true,
        }}
        activePage={1}
        footer
        items={courses}
        columns={columns}
        columnFilter
        tableFilter
        tableFilterLabel="Buscar:"
        tableFilterPlaceholder="Ingrese un valor..."
        cleaner
        // itemsPerPageSelect
        itemsPerPage={15}
        columnSorter
        pagination
        paginationProps={{
          'size': 'sm',
          'bordered': 'true',
          'align': 'end',
          style: { cursor: "pointer" }
        }}
        scopedColumns={{
          course_type: (item) => (
            <td>
              {getBadgeCourseType(item.course_type)}
            </td>
          ),
          actions: (item) => (
            <td>
              <CTooltip content="Emitir Certificados">
                <CButton color="info" size="sm" className="m-1" onClick={() => handleOpenModalCertificate(item)}>
                  <FontAwesomeIcon icon={faAward} inverse />
                </CButton>
              </CTooltip>
              {/* <CTooltip content="Matricular Alumno(s)">
                <CButton color="success" size="sm" className="m-1" onClick={() => handleShowModalBlockInscription(item)}>
                  <FontAwesomeIcon icon={faFileSignature} inverse />
                </CButton>
              </CTooltip> */}
            </td>
          )
        }}
      />
    </>
  )
}

export default TableCourses
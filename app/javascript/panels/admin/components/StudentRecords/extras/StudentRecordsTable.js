import React from 'react'
import {
  CTooltip,
  CSmartTable,
  CBadge,
  CButton
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faRocket
} from '@fortawesome/free-solid-svg-icons'

import { getBadgeDocumentType, getBadgeStudentRecord } from '../../../../../helpers/auxiliarFuncionts'
import { normalizeDate } from '../../../../../helpers/normalizes'

const columns = [
  { key: 'index', label: '#', filter: false, sorter: false },
  { key: 'full_name', label: 'Nombres Completo', filter: false, sorter: false },
  { key: 'document_type', label: 'Tipo de Documento', filter: false, sorter: false },
  { key: 'document_number', label: 'Número de Documento', filter: false, sorter: false },
  { key: 'email', label: 'Correo', filter: false, sorter: false },
  { key: 'phone', label: 'Telefono', filter: false, sorter: false },
  { key: 'updated_at', label: 'Fecha de Registro', filter: false, sorter: false },
  { key: 'course_code', label: 'Curso de Referencia', filter: false, sorter: false },
  { key: 'status', label: 'Estado', filter: false, sorter: false },
  { key: 'actions', label: 'Acciones', filter: false, sorter: false },
]

const StudentRecordsTable = (props) => {
  const { data, setShowModal, setCurrentStudentRecord } = props

  const handleEnrolledStudent = (item) => {
    setCurrentStudentRecord(item)
    setShowModal(true)
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
        items={data}
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
          document_type: (item) => (
            <td>
              {getBadgeDocumentType(item.document_type)}
            </td>
          ),
          updated_at: (item) => (
            <td>
              {normalizeDate(item.updated_at)}
            </td>
          ),
          course_code: (item) => (
            <td>
              <CTooltip content={item.course_name}>
                <CBadge color='success'>
                  {item.course_code}
                </CBadge>
              </CTooltip>
            </td>
          ),
          status: (item) => (
            <td>
              {getBadgeStudentRecord(item.status)}
            </td>
          ),
          actions: (item) => (
            <td>
              <CTooltip content="Crear alumno y matricular a un curso" placement="top-start">
                <CButton size='sm' color='primary' onClick={() => handleEnrolledStudent(item)} >
                  <FontAwesomeIcon icon={faRocket} inverse />
                </CButton>
              </CTooltip>
            </td>
          ),
        }}
      />
    </>
  )
}

export default StudentRecordsTable
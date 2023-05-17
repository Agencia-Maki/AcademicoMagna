import React from 'react'
import {
  CTooltip,
  CSmartTable,
  CButton
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faFileSignature
} from '@fortawesome/free-solid-svg-icons'

import { getBadgeCourseState } from '../../../../../helpers/auxiliarFuncionts'

const TableCourseInscriptions = (props) => {
  const { data, columns } = props
  const { setShowDetail, setCurrentCourse, handleShowModalBlockInscription } = props

  const handleShowDetail = (item) => {
    setShowDetail(true)
    setCurrentCourse(item)
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
          status: (item) => (
            <td>
              {getBadgeCourseState(item.status)}
            </td>
          ),
          category: (item) => (
            <td>
              <CTooltip content="Documento Nacional de Identidad">
                <span class="badge bg-info-gradient">{item.category}</span>
              </CTooltip>
            </td>
          ),
          actions: (item) => (
            <td>
              <CTooltip content="Ver detalles de Matricula">
                <CButton color="info" size="sm" className="m-1" onClick={() => handleShowDetail(item)}>
                  <FontAwesomeIcon icon={faEye} inverse />
                </CButton>
              </CTooltip>
              <CTooltip content="Matricular Alumno(s)">
                <CButton color="success" size="sm" className="m-1" onClick={() => handleShowModalBlockInscription(item)}>
                  <FontAwesomeIcon icon={faFileSignature} inverse />
                </CButton>
              </CTooltip>
            </td>
          )
        }}
      />
    </>
  )
}

export default TableCourseInscriptions
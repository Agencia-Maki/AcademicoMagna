import React from 'react'
import {
  CTooltip,
  CSmartTable,
  CButton
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faListCheck,
  faPen,
  faSliders
} from '@fortawesome/free-solid-svg-icons'

import { getBadgeCourseState } from '../../../../../helpers/auxiliarFuncionts'

const TablePrograms = (props) => {
  const { data, columns } = props
  // const { setShowDetail, setCurrentCourse, handleShowModalBlockInscription } = props

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
          'align': 'end'
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
              <CTooltip content="Ver detalles del Programa">
                <CButton color="info" size="sm" className="m-1">
                  <FontAwesomeIcon icon={faEye} inverse />
                </CButton>
              </CTooltip>
              <CTooltip content="Editar Programa">
                <CButton color="warning" size="sm" className="m-1">
                  <FontAwesomeIcon icon={faPen} inverse />
                </CButton>
              </CTooltip>

              <CTooltip content="Gestionar Módulos">
                <CButton color="success" size="sm" className="m-1">
                  <FontAwesomeIcon icon={faSliders} inverse />
                </CButton>
              </CTooltip>

              <CTooltip content="Gestionar Evaluaciones">
                <CButton color="primary" size="sm" className="m-1">
                  <FontAwesomeIcon icon={faListCheck} inverse />
                </CButton>
              </CTooltip>
            </td>
          )
        }}
      />
    </>
  )
}

export default TablePrograms
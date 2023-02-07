import React, { useState } from 'react'
import {
  CTooltip,
  CSmartTable,
  CButton
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faPen
} from '@fortawesome/free-solid-svg-icons'

import { getBadgeDocumentType } from '../../../../../helpers/auxiliarFuncionts'
import { normalizeName, normalizeDate } from '../../../../../helpers/normalizes'

const ProfessorsTable = (props) => {
  const { data, columns } = props

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
          avatar: (item) => (
            <td className="text-center">
              <div className="avatar avatar-md">
                <img src={item.avatar.medium.url} className="avatar-img" alt={item.full_name} />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </td>
          ),

          document_type: (item) => (
            <td className="text-center">
              {getBadgeDocumentType(item.document_type)}
            </td>
          ),

          full_name: (item) => (
            <td>
              <div>{item.full_name}</div>
              <div className="small text-danger">
                <span> Profesor </span> | Registrado: {normalizeDate(item.created_at)}
              </div>
            </td>
          ),

          actions: (item) => (
            <td>
              <CTooltip content="Ver perfil" placement="top-start">
                <Link
                  className="m-1 btn btn-info btn-sm"
                  to={{
                    pathname: `/profesores/ver/${item.id}`,
                    state: {
                      editStatus: false
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faEye} size="lg" inverse />
                </Link>
              </CTooltip>

              <CTooltip content="Editar registro" placement="top-start">
                <Link
                  className="m-1 btn btn-warning btn-sm"
                  to={{
                    pathname: `/profesores/editar/${item.id}`
                  }}
                >
                  <FontAwesomeIcon icon={faPen} size="lg" inverse />
                </Link>
              </CTooltip>
            </td>
          ),
        }}
      />
    </>
  )
}

export default ProfessorsTable
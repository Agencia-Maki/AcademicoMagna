import React from 'react'

import { CSmartTable, CButton, CTooltip, CBadge } from '@coreui/react-pro'

const Table = (props) => {
  const { data, columns, actions_arr, scopedColumns } = props

  const handleActionClick = (item, action) => {
    action.handler(item)
  }

  return (
    <>
      <CSmartTable
        sorterValue={{ column: 'index', state: 'asc' }}
        tableProps={{
          striped: true,
          hover: true,
          responsive: true,
        }}
        activePage={1}
        footer
        items={data}
        columns={columns}
        tableFilter
        tableFilterLabel="Buscar:"
        tableFilterPlaceholder="Ingrese un valor..."
        cleaner
        itemsPerPage={10}
        columnSorter
        pagination
        paginationProps={{
          'size': 'sm',
          'bordered': 'true',
          'align': 'end',
          style: { cursor: "pointer" }
        }}
        noItemsLabel='No hay datos para mostrar'
        scopedColumns={{
          ...scopedColumns,
          actions: (item) => {
            const filteredActions = actions_arr.filter((action) => !action.show_if || action.show_if(item));
            return (
              <td>
                {filteredActions.length > 0 ? (
                  filteredActions.map((action) => (
                    <CTooltip key={action.key} content={action.label}>
                      <CButton
                        onClick={() => handleActionClick(item, action)}
                        color={action.color}
                        size='sm'
                        className='m-1'
                      >
                        {action.icon}
                      </CButton>
                    </CTooltip>
                  ))
                ) : (
                  <CBadge
                    color='danger'
                  >
                    Sin acciones
                  </CBadge>
                )}
              </td>
            )
          }
        }}
      />

    </>
  )
}

export default Table
import React, { useState } from 'react'
import {
  CTooltip,
  CSmartTable,
  CButton,
  CBadge,
  CRow,
  CCol
} from '@coreui/react-pro'

import useCrud from '../../../../../hooks/useCrud'

const TableCourses = ({ students, course }) => {
  const { insertModelWithConfirmation: generateCertificates } = useCrud("")

  const columns = [
    // { key: 'index', label: '#', filter: false, sorter: false },
    { key: 'first_name', label: 'Nombres', filter: false, sorter: false },
    { key: 'last_name', label: 'Apellidos', filter: false, sorter: false },
    { key: 'document_number', label: 'Documento', filter: false, sorter: false },
    { key: 'inscription_status', label: 'Estado', filter: false, sorter: false },
    // { key: 'actions', label: 'Acciones', filter: false, sorter: false },
  ]

  const [selectedItems, setSelectedItems] = useState([])

  const getBadgeInscriptionStatus = (status) => {
    switch (status) {
      case 'active':
        return (
          <CTooltip content="Con matricula activa">
            <CBadge color='success'>Activo</CBadge>
          </CTooltip>
        );
      case 'with_certificate':
        return (
          <CTooltip content="Ya se emitio certificado para este alumno">
            <CBadge color='warning'>Con Certificado</CBadge>
          </CTooltip>
        );
      case 'inactive':
        return (
          <CTooltip content="El alumno se retiro del Curso">
            <CBadge color='danger'>Inactivo</CBadge>
          </CTooltip>
        );
      case 'completed':
        return (
          <CTooltip content="El Alumno ya termino el curso">
            <CBadge color='info'>Completado</CBadge>
          </CTooltip>
        );
      case 'debtor':
        return (
          <CTooltip content="El alumno tiene una deuda en este curso">
            <CBadge color='danger'>Moroso</CBadge>
          </CTooltip>
        );
      default:
        return (
          <CTooltip content="Estado de matricula sin especificar">
            <CBadge color='danger'>Sin Especificar</CBadge>
          </CTooltip>
        );
    }
  }

  const refreshData = () => {
    setTimeout(() => { location.reload() }, 1000)
  }

  const handleSubmitCertificates = async () => {
    console.log(selectedItems)
    const finalData = {
      course_id: course.id,
      student_ids: selectedItems.map((item) => item.id)
    }
    await generateCertificates(finalData, `/panel/admin/v2/certificates`, refreshData)
  }

  // useEffect(() => {
  //   console.log('Elementos seleccionados:', selectedItems);
  // }, [selectedItems]);

  return (
    <>
      { console.log(course) }
      <CRow>
        <CCol>
          <CButton size="sm" className='float-end' onClick={() => handleSubmitCertificates()}>
            Emitir Certificados en Bloque
          </CButton>
        </CCol>
      </CRow>
      <CSmartTable
        sorterValue={{ column: 'index', state: 'asc' }}
        tableProps={{
          striped: true,
          hover: true,
          responsive: true,
        }}
        activePage={1}
        footer
        items={students}
        columns={columns}
        columnFilter
        tableFilter
        tableFilterLabel="Buscar:"
        tableFilterPlaceholder="Ingrese un valor..."
        cleaner
        selectable
        selected={selectedItems}
        onSelectedItemsChange={setSelectedItems}
        itemsPerPage={10}
        columnSorter
        pagination
        paginationProps={{
          'size': 'sm',
          'bordered': 'true',
          'align': 'end',
          style: { cursor: "pointer" }
        }}
        scopedColumns={{
          inscription_status: (item) => (
            <td>
              {item.inscriptions && getBadgeInscriptionStatus(item.inscriptions[0].status)}
            </td>
          )
        }}
      />
    </>
  )
}

export default TableCourses
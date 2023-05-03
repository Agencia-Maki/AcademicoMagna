import React from 'react'
import { Link } from 'react-router-dom'
import {
  CTooltip,
  CSmartTable,
  CButton
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faFileImport,
  faGraduationCap,
  faListCheck,
  faPen,
  faSliders,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import { getBadgeCourseState } from '../../../../../helpers/auxiliarFuncionts'

import useCrud from '../../../../../hooks/useCrud'

const TablePrograms = (props) => {
  const { data, columns, refreshData, setImportCourseData, setShowImportCourseModal } = props

  const { deleteModelWhitUrl: deleteCourse } = useCrud("/panel/admin/courses")
  const { insertModelWithConfirmation: generateCertificates } = useCrud("/panel/admin/courses/:course_id/generate_certificates")

  const handleDeleteCOurse = async (item) => {
    await deleteCourse(`/panel/admin/courses/${item.id}`)
    refreshData()
  }

  const handleImportCourseData = (item) => {
    setShowImportCourseModal(true)
    setImportCourseData({
      course_from: 0,
      course_to: item.id,
      course_name: item.name
    })
  }

  const handleGenerateCertificates = (item) => {
    generateCertificates({}, `/panel/admin/courses/${item.id}/generate_certificates`, refreshData)
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
                <Link
                  className="m-1 btn btn-info btn-sm"
                  to={{
                    pathname: `/programas/ver/${item.id}`
                  }}
                >
                  <FontAwesomeIcon icon={faEye} inverse />
                </Link>
              </CTooltip>

              <CTooltip content="Editar Programa">
                <Link
                  className="m-1 btn btn-warning btn-sm"
                  to={{
                    pathname: `/programas/editar/${item.id}`
                  }}
                >
                  <FontAwesomeIcon icon={faPen} inverse />
                </Link>
              </CTooltip>

              <CTooltip content="Gestionar Módulos">
                <Link
                  className="m-1 btn btn-success btn-sm"
                  to={{
                    pathname: `/programas/${item.id}/modulos`
                  }}
                >
                  <FontAwesomeIcon icon={faSliders} inverse />
                </Link>
              </CTooltip>

              <CTooltip content="Gestionar Evaluaciones">
                <Link
                  className="m-1 btn btn-primary btn-sm"
                  to={{
                    pathname: `/programas/${item.id}/evaluaciones`
                  }}
                >
                  <FontAwesomeIcon icon={faListCheck} inverse />
                </Link>
              </CTooltip>

              {
                item.status === "completed" &&
                <CTooltip content="Generar Certificados">
                  <CButton size='sm' style={{ backgroundColor: "#00F6BA", borderColor: "#00F6BA" }} className='m-1' onClick={() => handleGenerateCertificates(item)}>
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </CButton>
                </CTooltip>
              }

              {item.import_data === "yes" &&
                <CTooltip content="Importar Contenido">
                  <CButton size='sm' style={{ backgroundColor: "#bb86fc", borderColor: "#bb86fc" }} className='m-1' onClick={() => handleImportCourseData(item)}>
                    <FontAwesomeIcon icon={faFileImport} inverse />
                  </CButton>
                </CTooltip>
              }

              {item.delete_course === "yes" &&
                <CTooltip content="Eliminar Programa">
                  <CButton size='sm' color='danger' className='m-1' onClick={() => handleDeleteCOurse(item)}>
                    <FontAwesomeIcon icon={faTrash} inverse />
                  </CButton>
                </CTooltip>
              }
            </td>
          )
        }}
      />
    </>
  )
}

export default TablePrograms
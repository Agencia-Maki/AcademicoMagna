import React, { useState, useEffect } from 'react'
import useCrud from '../../../../hooks/useCrud'
import { normalizeDate } from '../../../../helpers/normalizes'
import { getBadgeInscriptionStatus } from '../../../../helpers/auxiliarFuncionts'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSmartTable,
  CTooltip
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashCan,
  faXmark
} from '@fortawesome/free-solid-svg-icons'


const columns = [
  { key: 'index', label: '#', filter: false, sorter: false },
  { key: 'full_name', label: 'Alumno',  _style: { width: '20%' } },
  { key: 'phone', label: 'Teléfono', _style: { width: '15%' } },
  { key: 'email', label: 'Correo' },
  { key: 'inscription_date', label: 'Fecha de Matrícula', filter: false, sorter: false, _style: { width: '2%' } },
  { key: 'inscription_status', label: 'Estado de Matrícula', filter: false, sorter: false, _style: { width: '2%' } },
  { key: 'actions', label: 'Acciones', filter: false, sorter: false },
]


const InscriptionsDetails = (props) => {
  const { currentCourse, setShowDetail } = props
  const [students, setStudents] = useState([])

  const { deleteModelWhitUrl, getModelData } = useCrud("/panel/admin/inscriptions/course/:course_id/student")

  const handleDeleteInscription = async (_student) => {
    const url_to = `/panel/admin/inscriptions/course/${currentCourse.id}/students/${_student.id}/delete_inscription`
    deleteModelWhitUrl(url_to)
  }

  const loadData = async () => {
    const resp = await getModelData(`/panel/admin/inscriptions/course/${currentCourse.id}/students`)
    setStudents(
      resp.map((item, index) => ({
        ...item,
        index: index + 1,
      })
    ))
  }

  useEffect(() => {
    loadData()
  }, [currentCourse])

  return (
    <>
      {currentCourse && <CRow className="mt-3">
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setShowDetail(false)}
                style={{ cursor: 'pointer' }}
                className="float-end"
              />
              Detalles de las matriculas: <b> {currentCourse.name} </b>
            </CCardHeader>
            <CCardBody>
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
                  inscription_date: (item) => (
                    <td>
                      { normalizeDate(item.inscription.date_inscription) }
                    </td>
                  ),
                  inscription_status: (item) => (
                    <td>
                      { getBadgeInscriptionStatus(item.inscription.status) }
                    </td>
                  ),
                  actions: (item) => (
                    <td>
                      <CTooltip content="Eliminar Matricula">
                        <CButton color="danger" size="sm" className="m-1" onClick={() => handleDeleteInscription(item)}>
                          <FontAwesomeIcon icon={faTrashCan} inverse />
                        </CButton>
                      </CTooltip>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      }
    </>
  )
}

export default InscriptionsDetails

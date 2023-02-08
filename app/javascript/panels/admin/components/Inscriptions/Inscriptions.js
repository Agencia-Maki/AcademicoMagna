import React, { useEffect, useState } from 'react'
import useCrud from '../../../../hooks/useCrud'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react-pro'

import InscriptionsDetails from './InscriptionsDetails'
import TableCourseInscriptions from './extras/TableCourseInscriptions'

import ModalNewBlockInscription from './extras/ModalNewBlockInscription'

import { normalizeName } from '../../../../helpers/normalizes'


const columns = [
  { key: 'index', label: '#', filter: false, sorter: false },
  { key: 'status', label: 'Estado', filter: false, sorter: false },
  { key: 'name', label: 'Programa',  _style: { width: '35%' } },
  { key: 'professor_full_name', label: 'Docente', _style: { width: '15%' } },
  { key: 'students_count', label: 'Numero de Matriculados', filter: false, sorter: false, _style: { width: '2%' } },
  { key: 'category', label: 'Category', filter: false, sorter: false },
  { key: 'actions', label: 'Acciones', filter: false, sorter: false },
]

const Inscriptions = () => {
  const [students, setStudents] = useState([])
  const [currentCourse, setCurrentCourse] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const { getModelData: getInscriptions,
          getModelData: getStudents
          } = useCrud('/panel/admin/inscriptions/courses')

  const [inscriptions, setInscriptions] = useState([])

  const [showModalBlockInscription, setShowModalBlockInscription] = useState(false)

  const loadData = async () => {
    const resp = await getInscriptions()
    setInscriptions(
      resp.map((inscription, index) => ({
        ...inscription,
        index: index + 1,
        professor_full_name: normalizeName(inscription.professor.first_name, inscription.professor.last_name)
      })
    ))
    const studentDataQuery = await getStudents("/panel/admin/all_students")
    setStudents(studentDataQuery.map(student => { return { ...student, value: student.id, text: `${student.first_name} ${student.last_name}` } }))
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleShowModalBlockInscription = (_course) => {
    setShowModalBlockInscription(true)
    setCurrentCourse(_course)
  }

  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              Panel de Matriculas
            </CCardHeader>
            <CCardBody>
              <TableCourseInscriptions
                data={inscriptions}
                columns={columns}
                setShowDetail={setShowDetail}
                setCurrentCourse={setCurrentCourse}
                handleShowModalBlockInscription={handleShowModalBlockInscription}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {
        showDetail && currentCourse != {} && <InscriptionsDetails
          currentCourse={currentCourse}
          setShowDetail={setShowDetail}
        />
      }

      <ModalNewBlockInscription 
        showModal={showModalBlockInscription}
        setShowModal={setShowModalBlockInscription}
        currentCourse={currentCourse}
        setCurrentCourse={setCurrentCourse}
        students={students}
      />

    </>
  )
}

export default Inscriptions
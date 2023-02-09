import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CButton,
  CBadge
} from '@coreui/react-pro'
import useCrud from '../../../../hooks/useCrud'
import { normalizeDate } from '../../../../helpers/normalizes'

import CourseCategories from './components/CourseCategories'

import TablePrograms from './extras/TablePrograms'
import ModalCloneCourse from './extras/ModalCloneCourse'

const columns = [
  { key: 'index', label: '#', filter: false, sorter: false },
  { key: 'name', label: 'Programa',  _style: { width: '30%' } },
  { key: 'professor', label: 'Docente', _style: { width: '15%' } },
  { key: 'start_date', label: 'Fecha de Inicio', filter: false, sorter: false, _style: { width: '8%' } },
  { key: 'end_date', label: 'Fecha de Fin', filter: false, sorter: false, _style: { width: '8%' } },
  { key: 'duration_month', label: 'Duración', filter: false, sorter: false, _style: { width: '2%' } },
  { key: 'category', label: 'Categoría', filter: false, sorter: false },
  { key: 'status', label: 'Estado', filter: false, sorter: false },
  { key: 'actions', label: 'Acciones', filter: false, sorter: false },
]

const Programs = () => {
  const { 
          getModelData: getCourses,
          getModelData: getCategories,
        } = useCrud("/panel/admin/all_courses")
  const [courseList, setCourseList] = useState([])
  const [categories, setCategories] = useState([])
  const [showCloneCourseModal, setShowCloneCourseModal] = useState(false)

  const loadData = async() => {
    const courseDataQuery = await getCourses("/panel/admin/courses")
    setCourseList(
      courseDataQuery.data.map ((course, index) => {
        return {
          ...course,
          index: index + 1,
          start_date: normalizeDate(course.start_date),
          end_date: normalizeDate(course.end_date),
          duration_month: `${calculateDuration(course.start_date, course.end_date)} meses`,
        }
      })
    )
    const categoriesDataQuery = await getCategories("/panel/admin/course_categories")
    setCategories(categoriesDataQuery)
  }

  const refreshCategoriesList = async() => {
    const categoriesDataQuery = await getCategories("/panel/admin/course_categories")
    setCategories(categoriesDataQuery)
  }

  const calculateDuration = (start_date, end_date) => {
    let start = new Date(start_date)
    let end = new Date(end_date)
    let diff = end.getTime() - start.getTime()
    let diffDays = diff / (1000 * 3600 * 24 * 30)
    return Math.round(diffDays) + 1
  }

  const handleCloneCourse = (course) => {
    setShowCloneCourseModal(true)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              <strong>Panel de Programas</strong>
            </CCardHeader>
            <CCardBody>
              <Link
                className="btn btn-sm btn-success mb-3 float-end"
                to={{ pathname: `/programas/nuevo` }}
              >                
                Registrar Nuevo Programa
              </Link>

              <CButton
                size='sm'
                color='warning'
                className='mb-3 float-end me-3'
                onClick={() => handleCloneCourse()}
              >                
                Clonar Programa
              </CButton>

              <TablePrograms 
                columns={columns}
                data={courseList}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      <CourseCategories 
        categories={categories}
        refreshCategoriesList={refreshCategoriesList}
      />

      <ModalCloneCourse 
        courses={courseList}
        setShowModal={setShowCloneCourseModal}
        showModal={showCloneCourseModal}
        refreshData={loadData}
      />
    </ >
  )
}

export default Programs;
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


// import CourseCategories from './CourseCategories'

import useCrud from '../../../../hooks/useCrud'
import { normalizeName, normalizeDate } from '../../../../helpers/normalizes'

import TablePrograms from './extras/TablePrograms'

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
          getModelData: getProfessors,
          getModelData: getCategories,
        } = useCrud("/panel/admin/all_courses")
  const [courseList, setCourseList] = useState([])

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
  }

  useEffect(() => {
    loadData()
  }, [])

  const calculateDuration = (start_date, end_date) => {
    let start = new Date(start_date)
    let end = new Date(end_date)
    let diff = end.getTime() - start.getTime()
    let diffDays = diff / (1000 * 3600 * 24 * 30)
    return Math.round(diffDays) + 1
  }

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

              {/* <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className=""> # </th>
                    <th className=""> Nombre </th>
                    <th className=""> Docente </th>
                    <th className=""> Fecha de Inicio </th>
                    <th className=""> Fecha de Fin </th>
                    <th className=""> Duracion (Meses) </th>
                    <th className=""> Categoría </th>
                    <th className=""> Estado </th>
                    <th className=""> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    modelIndex.data && modelIndex.data.length > 0 ?
                      modelIndex.data.map((program, index) => (
                        <tr key={program.id}>
                          <td> {(index + 1) + (pagesPrototype.page - 1) * pagesPrototype.perPages} </td>
                          <td className=""> {program.name} </td>
                          <td className=""> {getDataProfessor(program.professor_id)} </td>
                          <td className=""> {normalizeDate(program.start_date)} </td>
                          <td className=""> {normalizeDate(program.end_date)} </td>
                          <td className=""> {calculateDuration(program.start_date, program.end_date)}</td>
                          <td className=""> {getDataCategory(program.course_category_id)}</td>
                          <td className=""> {normalizeStatus(program.status)} </td>
                          <td className="">

                            <CTooltip content="Detalles del Programa" placement="top-start">
                              <Link
                                className="m-1 btn btn-info btn-sm"
                                to={{
                                  pathname: `/programas/ver/${program.id}`,
                                  state: {
                                    editStatus: false
                                  },
                                }}
                              >
                                tocar
                              </Link>
                            </CTooltip>

                            <CTooltip content="Editar Programa" placement="top-start">
                              <Link
                                className="m-1 btn btn-warning btn-sm"
                                to={{
                                  pathname: `/programas/editar/${program.id}`,
                                  state: {
                                    professors: professors,
                                    categories: categories
                                  },
                                }}
                              >
                                pen
                              </Link>
                            </CTooltip>

                            <CTooltip content="Gestionar Modulos" placement="top-start">
                              <Link
                                className="m-1 btn btn-success btn-sm"
                                to={{
                                  pathname: `/programas/${program.id}/modulos`,
                                  state: {
                                    editStatus: false,
                                    program: program
                                  },
                                }}
                              >
                                equalizer
                              </Link>
                            </CTooltip>

                            <CTooltip content="Gestionar Evaluaciones" placement="top-start">
                              <Link
                                className="m-1 btn btn-primary btn-sm"
                                to={{
                                  pathname: `/programas/${program.id}/evaluaciones`,
                                  state: {
                                    editStatus: false,
                                    program: program
                                  },
                                }}
                              >
                               task
                              </Link>
                            </CTooltip>
                          </td>
                        </tr>
                      )) :
                      <tr>
                        <td>
                          No hay registros para mostrar
                        </td>
                      </tr>
                  }
                </tbody>
              </table> */}

              <TablePrograms 
                columns={columns}
                data={courseList}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CourseCategories /> */}
    </ >
  )
}

export default Programs;
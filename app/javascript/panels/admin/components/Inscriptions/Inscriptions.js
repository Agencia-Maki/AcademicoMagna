import React, { useEffect, useState } from 'react'
import useCrud from '../../../../hooks/useCrud'
import useChange from '../../../../hooks/useChange'
import { normalizeName, normalizeDate } from '../../../../helpers/normalizes'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CButton,
  CForm, CFormLabel, CFormInput, CFormSelect, CFormText, CFormCheck
} from '@coreui/react-pro'

// import CIcon from '@coreui/icons-react'

// import InscriptionsDetails from './InscriptionsDetails'

const initialDataIndex = {
  name: '',
  current_page: 1,
  per_pages: 1,
  total_pages: 1,
  professor: {},
  students: []
}

const initialInscription = {
  student_id: '',
  course_id: '',
  date_inscription: new Date().toISOString().slice(0, 10)
}

const url_ep = '/panel/admin/inscriptions/courses'      // url_end_point

const Inscriptions = () => {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [currentCourse, setCurrentCourse] = useState({})
  const [showDetail, setShowDetail] = useState(false)

  const [statusForm, setStatusForm] = useState(0)         //  0 => no mostrar formulario    ||  1 => mostrar formulario para nuevo    ||   2 => mostrar formulario para editar

  const { modelIndex, insertModel, updateModel, getModel } = useCrud(url_ep)

  const { data, handleChange, resetData } = useChange(initialInscription)

  const handleGetAllData = async () => {
    await getModel(setStudents, '/panel/admin/all_students')
    await getModel(setCourses, '/panel/admin/all_courses');
  }

  useEffect(() => {
    handleGetAllData()
  }, [])

  // const handleSubmit = (data) => {
  //   statusForm === 1 ? insertModel(data) : updateModel(data, `/panel/course_categories/${data.id}`)
  //   setStatusForm(0)
  //   setInscription(initialInsciption)
  // }

  const handleShowForm = (typeForm) => {
    // console.log("curso test",course)
    setStatusForm(typeForm)
    resetData()
    // setCurso()
    // console.log(courses.filter(course => course.id === course_id))
    // if (typeForm === 1 || typeForm === 0) {
    //   setCourse({})
    //   resetData()
    // } else {
    //   setCourse(course)
    // }
  }

  const getCourseDetail = (_course) => {
    setShowDetail(true)
    setCurrentCourse(_course)
  }


  const handleClearData = (data) => {
    insertModel(data, '/panel/admin/inscriptions')
    setStatusForm(0)
  }

  return (
    <div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              Panel de Matriculas
            </CCardHeader>
            <CCardBody>
              <CButton
                color="success"
                size="sm"
                className="mb-2 float-right"
                onClick={() => handleShowForm(2)}
              >
                Matricular Alumno
              </CButton>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className=""> # </th>
                    <th className=""> Programa </th>
                    <th className=""> Estado </th>
                    <th className=""> Profesor Encargado </th>
                    <th className=""> # Matriculados </th>
                    <th className=""> Categoria </th>
                    <th className=""> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    modelIndex.length > 0 ?
                      modelIndex.map((course, index) => (
                        <tr key={course.id}>
                          <td> {index + 1} </td>
                          <td className=""> {course.name} </td>
                          <td className=""> {course.status} </td>
                          <td className=""> {normalizeName(course.professor.first_name, course.professor.last_name)} </td>
                          <td className=""> {course.students_count} </td>
                          <td className=""> {course.category} </td>
                          <td className="">
                            <CButton
                              color="primary"
                              size="sm"
                              className="mr-2"
                              onClick={() => getCourseDetail(course)}
                            >
                              Detalles
                            </CButton>

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
              </table>
            </CCardBody>
          </CCard>
        </CCol>

        {statusForm > 0 ?
          <CCol lg={4}>
            <CCard>
              <CCardHeader>
                Matricular Alumno
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CRow>
                    <CCol md="3">
                      <CFormLabel htmlFor="rol">Curso</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormSelect custom name="course_id" id="course_id" value={data.course_id} onChange={handleChange}>
                        <option value="0">Asignar Curso</option>
                        {courses ? courses.map((course) => (
                          <option key={course.id} value={course.id}>{course.name}</option>
                        )) : ''
                        }
                      </CFormSelect>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md="3">
                      <CFormLabel htmlFor="rol">Alumno</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormSelect custom name="student_id" id="student_id" value={data.student_id} onChange={handleChange}>
                        <option value="0">Asignar Alumno</option>
                        {students ? students.map((student) => (
                          <option key={student.id} value={student.id}>{student.first_name} - {student.last_name}</option>
                        )) : ''
                        }
                      </CFormSelect>
                    </CCol>
                  </CRow>

                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  color="success"
                  size="sm"
                  onClick={() => handleClearData(data)}
                >
                  Matricular
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  className="ml-2"
                  onClick={() => setStatusForm(0)}
                >
                  Cancelar
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
          :
          null
        }
      </CRow>

      {/* {
        showDetail && currentCourse !== {} && <InscriptionsDetails 
        currentCourse={currentCourse}
        setShowDetail={setShowDetail}
      />
      } */}
      
    </div>
  )
}

export default Inscriptions
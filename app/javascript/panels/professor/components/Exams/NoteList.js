import React, { useEffect, useState, createRef } from 'react'
import Pdf from "react-to-pdf"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {
  CCardBody,
  CCardHeader,
  CButton,
  CTooltip,
  CRow,
  CCol
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudDownload
} from '@fortawesome/free-solid-svg-icons'

const NoteList = () => {
  const [data, setData] = useState({})
  const [students, setStudents] = useState([])
  const { program_id } = useParams()
  const ref = createRef();
  const options = {
    orientation: 'landscape'
  };

  const getData = async () => {
    await axios.get(`/panel/professor/courses/${program_id}/califications`).then(response => {
      setData(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const getListStudents = async () => {
    const response = await axios.get(`/panel/professor/courses/${program_id}/students`)
    setStudents(response.data.data)
  }

  const makeCalificationsByStudent = (_exams, _student_id) => {
    let result = 0;
    _exams.forEach((exam) => {
      exam.answers.forEach((answer) => {
        if (answer.student_id === _student_id) {
          result = result + parseInt(answer.total_value)
        }
      })
    })
    return result;
  }

  useEffect(() => {
    getData()
    getListStudents()
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <Pdf targetRef={ref} filename="code-example.pdf" options={options} x={.5} y={.5} scale={0.7}>
            {({ toPdf }) => <CTooltip content="Descargar consolidado de notas" placement="top-start">
              <CButton color="primary" className="mb-3 float-end" size="sm" onClick={toPdf}>
                <FontAwesomeIcon icon={faCloudDownload} size="lg" inverse />
              </CButton>
            </CTooltip>}
          </Pdf>
          <Link className="btn btn-danger mb-3 float-start btn-sm text-white" to={`/programas/${program_id}/evaluaciones`}>
            <strong>Regresar atrás</strong>
          </Link>
        </CCol>
      </CRow>


      {<div className='card' ref={ref}>
        <CCardHeader>
          CONSOLIDADO DE NOTAS
        </CCardHeader>
        <CCardBody>
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th className=""> Alumno </th>
                {
                  data.exams && data.exams.map((exam, index) => {
                    return <th key={index}> {exam.name} </th>
                  })
                }
                <th> Puntos Acumulados </th>
              </tr>
            </thead>
            <tbody>
              {
                students && students.map((student, index_i) => {
                  return (
                    <tr key={index_i}>
                      <td> {student.student_name} </td>
                      {
                        data.exams && data.exams.map((exam, index_j) => <td key={index_j}>
                          {exam.answers.filter(answer => answer.student_id === student.student_id).map(answer => answer.score)}
                        </td>)
                      }
                      <td>
                        {data.exams && makeCalificationsByStudent(data.exams, student.student_id)}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </CCardBody>
      </div>}

    </>
  )
}

export default NoteList
import React, { useEffect, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CCardBody,
  CCardHeader,
  CButton,
  CTooltip,
  CRow,
  CCol,
} from '@coreui/react-pro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownload } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';

const NoteList = () => {
  const [data, setData] = useState({});
  const [students, setStudents] = useState([]);
  const { program_id } = useParams();
  const ref = createRef();


  const getData = async () => {
    await axios
      .get(`/panel/professor/courses/${program_id}/califications`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListStudents = async () => {
    const response = await axios.get(`/panel/professor/courses/${program_id}/students`);
    setStudents(response.data.data);
  };

  const makeCalificationsByStudent = (_exams, _student_id) => {
    let result = 0;
    _exams.forEach((exam) => {
      exam.answers.forEach((answer) => {
        if (answer.student_id === _student_id) {
          result = result + parseInt(answer.total_value);
        }
      });
    });
    return result;
  };

  useEffect(() => {
    getData();
    getListStudents();
  }, []);

  const csvHeaders = [
    'Alumno',
    ...(data.exams ? data.exams.map((exam) => exam.name) : []),
    'Puntos Acumulados',
  ];

  const csvData = students.map((student) => {
    const studentRow = {
      Alumno: student.student_name,
    };

    if (data.exams) {
      data.exams.forEach((exam) => {
        const answer = exam.answers.find((answer) => answer.student_id === student.student_id);
        studentRow[exam.name] = answer ? answer.score : '';
      });

      studentRow['Puntos Acumulados'] = makeCalificationsByStudent(data.exams, student.student_id);
    }

    return studentRow;
  });

  return (
    <>
      <CRow>
        <CCol>
          {data.exams !== undefined && data.exams.length > 0 && (
            <CTooltip content="Descargar Consolidado de Notas">
              <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename={'reporte.csv'}
                className="btn btn-primary float-end"
              >
                <FontAwesomeIcon icon={faCloudDownload} inverse />
              </CSVLink>
            </CTooltip>
          )}
        </CCol>
      </CRow>

      <div className="card" ref={ref}>
        <CCardHeader>CONSOLIDADO DE NOTAS</CCardHeader>
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
      </div>
    </>
  );
};

export default NoteList;
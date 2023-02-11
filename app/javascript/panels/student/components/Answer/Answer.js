import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SweetAlert2 from 'react-sweetalert2'
import { passCsrfToken } from '../../../../helpers/csrftoken'
import { toast } from 'react-toastify';
import Timer from './components/Timer';
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CRow,
  CFormLabel,
  CFormCheck,
  CCardFooter
} from '@coreui/react-pro'

const answer_prototype = {
  exam_id: 0,
  student_id: 0,
  file: "",
  status: "ungraded",
  question_answers_attributes: [
    {
      enunciate: "",
      answer_options_attributes: [
        {
          enunciate: "",
          status: "",
          marked: false,
        }
      ]
    }
  ]
}

const Answer = () => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))

  const [exam, setExam] = useState({})
  const [answer, setAnswer] = useState(answer_prototype)
  const [swalProps, setSwalProps] = useState({})

  const { program_id, exam_id } = useParams()

  // TIMER HANDLERS  

  const check_send_my_answer = () => {
    axios.get('/panel/student/check_send_answer/' + String(exam_id)).then(response => {
      console.log(response.data)
      if (response.data.status === 400) {
        location.replace('/students/dashboard/index#/programas/' + String(program_id) + '/evaluaciones')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  // SWAL
  function handleClick() {
    setSwalProps({
      show: true,
      title: 'Está seguro(a) de realizar esta entrega?',
      text: 'Recuerda que no podrá editar esta entrega más adelante',
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "red",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('/panel/student/exams/' + String(exam_id))
      setExam(data.data)
      let temp = {
        ...answer_prototype,
        exam_id: exam_id,
        student_id: currentUser.id,
        question_answers_attributes: data.data.questions.map(question => {
          return {
            enunciate: question.enunciate,
            answer_options_attributes: question.question_options.map(option => {
              return {
                marked: false,
                status: option.status,
                score: option.score,
                enunciate: option.enunciate
              }
            })
          }
        })
      }
      setAnswer(temp)
    }

    fetchData()
    passCsrfToken(document, axios)
    check_send_my_answer()
  }, [])

  const handleOptionChange = (e, i, j) => {
    let temp = { ...answer }
    temp.question_answers_attributes[i].answer_options_attributes[j].marked = !temp.question_answers_attributes[i].answer_options_attributes[j].marked
    setAnswer(temp)
  }

  const handleSubmitAnswer = async (e) => {
    const response = await axios.post('/panel/student/student_answers', answer)
    if (response.data.status === "ok") {
      toast.success(response.data.message)
      setTimeout(() => {
        location.replace('/students/dashboard/index#/programas/' + String(program_id) + '/evaluaciones')
      }, 500)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <>
      {exam.exam &&
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                <h3>
                  Evaluacion: <b> {exam.exam.name} </b>
                </h3>
              </CCardHeader>
              <CCardBody>
                <div>
                  {exam.exam && <Timer exam={exam.exam} handleSubmitAnswer={handleSubmitAnswer} />}
                </div>
                {answer.question_answers_attributes.map((question, index_i) => {
                  return (
                    <div className="student" key={index_i}>
                      <h4> Pregunta {index_i + 1}: <b> {question.enunciate} </b> </h4>
                      <ul>
                        {question.answer_options_attributes.map((question_option, index_j) =>
                          <CRow variant="checkbox" className="checkbox" key={index_j}>
                            <CCol>
                              <CFormCheck id={"option_question" + index_i + "_option_" + index_j} defaultChecked={question_option.marked} onChange={(e) => handleOptionChange(e, index_i, index_j)} />
                              <CFormLabel variant="checkbox" className="form-check-label ms-2" htmlFor={"option_question" + index_i + "_option_" + index_j} >{question_option.enunciate}</CFormLabel>
                            </CCol>
                          </CRow>
                        )
                        }
                      </ul>
                    </div>
                  )
                })}
              </CCardBody>
              <CCardFooter>
                <CButton color="primary" onClick={() => handleClick()}>Enviar Respuestas</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      }
      <SweetAlert2 {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={() => {
          setSwalProps({
            show: false
          });
        }}
        onConfirm={result => {
          handleSubmitAnswer()
          // run when clieked in confirm and promise is resolved...
        }}
        onError={error => {
          // run when promise rejected...
        }}
        onResolve={result => {
          // run when promise is resolved...
        }}
      />
    </>
  )
}

export default Answer

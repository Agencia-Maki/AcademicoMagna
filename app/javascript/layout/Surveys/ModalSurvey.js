import React, { useState, useEffect, useRef } from 'react'
import {
  CRow, CCol, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CFormInput, CForm
} from '@coreui/react-pro'

import useCrud from '../../hooks/useCrud'

const ModalSurvey = ({ current_user }) => {

  const { getModelData: getSurvey } = useCrud('')
  const { insertModelWithConfirmation: sendAnswer } = useCrud('')

  const [show, setShow] = useState(current_user.survey_pending === "pending")
  const [survey, setSurvey] = useState(null)
  const [validated, setValidated] = useState(false)

  const [comment, setComment] = useState("")
  const [optionValues, setOptionValues] = useState({});

  const formPointer = useRef(null)

  const handleCloseModal = () => {
    return null
  }

  const loadSurvey = async () => {
    const { survey } = await getSurvey('http://127.0.0.1:5000/surveys/comercial')
    setSurvey(survey)
  }

  const handleInputChange = (questionIndex, optionIndex, value) => {
    setOptionValues((prevValues) => ({
      ...prevValues,
      [questionIndex]: {
        ...(prevValues[questionIndex] || {}),
        [optionIndex]: value,
      },
    }));

    // Actualizar el estado de la respuesta en la encuesta
    setSurvey((prevData) => ({
      ...prevData,
      survey_questions: prevData.survey_questions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
            ...question,
            survey_options: question.survey_options.map((option, oIndex) =>
              oIndex === optionIndex ? { ...option, answer: value } : option
            ),
          }
          : question
      ),
    }));
  };

  const handleSave = async (event) => {
    const form = formPointer.current
    if (form.checkValidity() === false || !areOptionValuesUnique()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const answers = survey.survey_questions.map((question) => ({
        question: question.enunciate,
        question_id: question.id,
        options: question.survey_options.map((option) => ({
          option: option.enunciate,
          value: option.answer || '',
        })),
      }));

      const finalObject = { answers, user_full_name: `${current_user.first_name} ${current_user.last_name}`, user_document: current_user.document_number, survey_code: survey.code, comment: comment};

      await sendAnswer(finalObject, '/admin/send_survey_answer', () => { window.location.reload() })
      // console.log(finalObject)
    }
    setValidated(true)
  }

  const areOptionValuesUnique = () => {
    for (const questionIndex in optionValues) {
      const optionValuesForQuestion = Object.values(optionValues[questionIndex]);
      const uniqueOptionValues = new Set(optionValuesForQuestion);
      if (optionValuesForQuestion.length !== uniqueOptionValues.size) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    loadSurvey()
  }, [])

  return (
    <>
      <CModal
        size="xl"
        alignment="center"
        backdrop="static"
        visible={show}
        onClose={handleCloseModal}
        keyboard={false}
        unmountOnClose={true}
      >
        <CModalHeader
          closeButton={false}
        >
          <strong><small className="text-info">Porfavor responda las siguientes preguntas </small></strong>
        </CModalHeader>

        <CModalBody>
          {survey ? (
            <>
              {survey.survey_questions.map((question, questionIndex) => (
                <CRow key={questionIndex}>
                  <CCol sm={12}>
                    <strong>{question.enunciate}</strong> <br /><br /><br />
                    <CForm
                      noValidate
                      validated={validated}
                      ref={formPointer}
                    >
                      {question.survey_options.map((option, optionIndex) => (
                        <CRow className='mb-1' key={optionIndex}>
                          <CCol sm={9}>
                            <small>{option.enunciate}</small>
                          </CCol>
                          <CCol sm={3}>

                            <CFormInput
                              type="number"
                              feedbackInvalid="Este campo es obligatorio."
                              required
                              onChange={(e) =>
                                handleInputChange(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />

                          </CCol>
                        </CRow>
                      ))}
                      <CRow>
                        <CCol>
                          <strong>Describe el otro motivo</strong> <br />
                          <CFormInput
                            type="text"
                            feedbackInvalid="Este campo es obligatorio."
                            required
                            onChange={(e) => setComment(e.target.value)   }
                          />
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              ))}
            </>
          ) : null}
        </CModalBody>

        <CModalFooter>
          <CButton
            color='success'
            size='sm'
            onClick={handleSave}
          // disabled={!areOptionValuesUnique()}
          >
            Guardar
          </CButton>
        </CModalFooter>

      </CModal>
    </>
  )
}

export default ModalSurvey
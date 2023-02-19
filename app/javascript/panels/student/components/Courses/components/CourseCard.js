import React from 'react';
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardTitle,
  CCol,
  CCardImage,
  CRow,
  CTooltip,
  CCardText,
} from '@coreui/react-pro'
import { normalizeDate } from '../../../../../helpers/normalizes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const CourseCard = (props) => {
  const { course, typeCourse } = props
  return (
    <>
      {course ?
        <CCol lg={4} md={4} sm={6} xs={12} >
          <CCard
            className="mb-3 card-box-shadow"
          >
            <Link
              to={{
                pathname: `/programas/ver/${course.id}`
              }}
            >
              <CCardImage orientation="top" src={course.cover.url} />
            </Link>
            <CCardBody>
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: `/programas/ver/${course.id}`
                }}
              >
                <CCardTitle><p className="title-course-card">{course.name}</p></CCardTitle>
              </Link>
              <CCardText className="text-justify">
                <small>{course.description.length > 100 ? course.description.slice(0, 150) + '...' : course.description}</small>
              </CCardText>
            </CCardBody>

            <CCardFooter>
              <CRow>
                <CCol lg={9} md={9} sm={8} xs={12}>
                  <small className="form-text text-muted" >Empieza el &nbsp;<b>{normalizeDate(course.start_date)} &nbsp;</b></small>
                  <small className="form-text text-muted" >finaliza el &nbsp;<b>{normalizeDate(course.end_date)} &nbsp;</b></small>
                </CCol>

                <CCol lg={3} md={3} sm={4} xs={12}>
                  {typeCourse === "slow_payer" ? null :
                    props.exam ? <CTooltip content="Ver evaluaciones" placement="top-start">
                      <Link
                        className="btn btn-sm btn-success mb-3 float-right"
                        to={{
                          pathname: `/programas/evaluaciones/${course.id}`
                        }}
                      >
                        right
                      </Link>
                    </CTooltip> :

                      <CTooltip content="Ir al programa" placement="top-start">
                        <Link
                          className="btn btn-sm button-magna-color mb-3 float-end"
                          to={{
                            pathname: `/programas/ver/${course.id}`
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowRight} size='lg' />
                        </Link>
                      </CTooltip>
                  }
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
        : 'Cargando'}
    </>
  );
};

export default CourseCard
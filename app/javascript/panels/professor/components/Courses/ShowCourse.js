import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import './styles/showCourse.scss'

import {
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CCardFooter,
  CTooltip,
  CButton
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideoCamera
} from '@fortawesome/free-solid-svg-icons'

import CollapseSession from './components/CollapseSessions'
import CollapseMaterials from './components/CollapseMaterials'

const ShowCourse = () => {
  const [course, setCourse] = useState({})
  const [activeKey, setActiveKey] = useState(1)

  const { program_id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('/panel/professor/course/' + String(program_id))
      setCourse(data.data)
    }

    fetchData()
      .catch(console.error);;
  }, [])

  return (
    <>
      {course.data &&
        <CRow>
          <CCol lg={4} md={4} sm={4} xs={12}>
            <div className="contenedor text-center">
              <div className="container_foto" style={{ position: "relative" }}>
                <article>
                  <h2>{course.data.name}</h2>
                </article>
                <img src={course.data.cover ? course.data.cover.url : ''} alt="" />
              </div>
            </div>
            <CCard className="card-box-shadow">
              <CCardBody>
                <p className="text-justify"> {course.data.description} </p>
              </CCardBody>
              <CCardFooter>
                <CTooltip content="Ir a la sesión en vivo" placement="top-start">
                  <a href={course.data.conference_link} target="_blank">
                    <CButton size="md" color="primary">
                      <FontAwesomeIcon icon={faVideoCamera} size='lg' inverse />
                    </CButton>
                  </a>
                </CTooltip>

                <CTooltip content="Ver evaluaciones" placement="top-start">
                  <Link
                    className="btn btn-md btn-success float-end"
                    to={{
                      pathname: `/programas/${course.data.id}/evaluaciones`,
                    }}
                  >
                    Evaluaciones
                  </Link>
                </CTooltip>
              </CCardFooter>
            </CCard>
          </CCol>

          <CCol size={8}>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Sesiones
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Material
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="sessions-tab" visible={activeKey === 1}>
                <CCard className='card-box-shadow'>
                  <CCardBody>
                    {
                      course.chapters && course.chapters.length > 0 ?
                        course.chapters.map((chapter, index) => (
                          <CollapseSession
                            key={index}
                            chapter={chapter}
                            index={index}
                          >
                          </CollapseSession>
                        )) : ''
                    }
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="materials-tab" visible={activeKey === 2}>
                <CCard className='card-box-shadow'>
                  <CCardBody>
                    {
                      course.chapters && course.chapters.length > 0 ?
                        course.chapters.map((chapter, index) => (
                          <CollapseMaterials
                            key={chapter.id}
                            chapter={chapter}
                            index={index}
                          >
                          </CollapseMaterials>
                        )) : ''
                    }
                  </CCardBody>
                </CCard>
              </CTabPane>
            </CTabContent>
          </CCol>


        </CRow>}
    </>
  );
};

export default ShowCourse;
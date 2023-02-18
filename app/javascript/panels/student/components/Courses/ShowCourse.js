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

import ModalVideo from './components/ModalVideo'

const ShowCourse = () => {
  const [course, setCourse] = useState({})
  const [activeKey, setActiveKey] = useState(1)

  const [showModalVideo, setShowModalVideo] = useState(false)
  const [currentLesson, setCurrentLesson] = useState({})

  const { program_id } = useParams()

  const handleOpenVideoModal = () => {    
    setCurrentLesson({
      name: "Clase Magna",
      link_video: course.data.magna_class_link
    })
    setShowModalVideo(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('/panel/student/course/' + String(program_id))
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
            <CNav variant="tabs" role="tablist" style={{ background: "#fff" }}>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: '#1e2133', fontWeight: 'bold' }}
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Clase Magna
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: '#1e2133', fontWeight: 'bold' }}
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Sesiones
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: '#1e2133', fontWeight: 'bold' }}
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  Material
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="magna-class-tab" visible={activeKey === 1} style={{ backgroundColor: "#3c4b64" }}>
                <CCard className='card-box-shadow' style={{ backgroundColor: "#3c4b64" }}>
                  <CCardBody>
                    {course.data.magna_class_link === null ? '' :
                      <div id="ytPlayer">
                        <p className="text-white text-justify">
                          Nos complace presentarte nuestra clase MAGNA, una introducción a nuestro programa educativo que te dará un panorama completo de lo que podrás aprender con nosotros. En esta clase, podrás conocer a nuestro equipo de profesionales altamente capacitados y experimentados, quienes te guiarán en el inicio de tu camino hacia el conocimiento y el aprendizaje.
                        </p>
                        <p className="text-white text-justify">
                          La clase magna es una oportunidad para descubrir lo que hace a nuestra institución única y especial, y cómo podemos ayudarte a alcanzar tus metas profesionales. Durante la clase, conocerás nuestra metodología de enseñanza, nuestros recursos educativos, y todo lo que necesitas saber para comenzar a aprovechar al máximo tus estudios con nosotros.
                        </p>
                        <br /><br />
                        <center>
                          <CButton size='sm' color='primary' onClick={() => handleOpenVideoModal(true)}>
                            <strong className='text-white'>Ver video</strong>
                          </CButton>
                        </center>
                      </div>
                    }
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="sessions-tab" visible={activeKey === 2} style={{ backgroundColor: "#3c4b64" }}>
                <CCard className='card-box-shadow' style={{ backgroundColor: "#3c4b64" }} >
                  <CCardBody>
                    {
                      course.chapters && course.chapters.length > 0 ?
                        course.chapters.map((chapter, index) => (
                          <CollapseSession
                            key={index}
                            chapter={chapter}
                            index={index}
                            setShowModalVideo={setShowModalVideo}
                            setCurrentLesson={setCurrentLesson}
                          >
                          </CollapseSession>
                        )) : ''
                    }
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="materials-tab" visible={activeKey === 3} style={{ backgroundColor: "#3c4b64" }}>
                <CCard className='card-box-shadow' style={{ backgroundColor: "#3c4b64" }} >
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

      {
        showModalVideo &&
        <ModalVideo
          showModal={showModalVideo}
          setShowModal={setShowModalVideo}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
      }
    </>
  );
};

export default ShowCourse;
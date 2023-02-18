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

  function youtube_parser(url) {
    return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1]
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
                    {course.data.magna_class_link === "null" ? '' :
                      <div id="ytPlayer">
                        <p className="text-white">
                          Es un placer dirigirnos a ustedes en nombre de MAGNA IEP, su plataforma de educación en línea. Nos complace anunciar que hemos creado un producto revolucionario llamado "Clase Magna" para mejorar su experiencia de aprendizaje.
                        </p>
                        {/* {`https://www.youtube.com/embed/${youtube_parser(course.data.magna_class_link)}`} */}
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${youtube_parser(course.data.magna_class_link)}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Embedded youtube"
                        />
                        {/* <iframe id="ytplayer" type="text/html" width="720" height="405"
                          src={`https://www.youtube.com/watch?v=${youtube_parser(course.data.magna_class_link)}`}
                          frameborder="0" allowfullscreen></iframe> */}

                        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/u__f_zuZkok" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
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
    </>
  );
};

export default ShowCourse;
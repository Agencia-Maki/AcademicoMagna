import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CFormSwitch,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CSidebar,
  CSidebarHeader,
  CTooltip,
  CImage
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilList,
  cilSettings,
  cilDollar
} from '@coreui/icons'

import axios from "axios"



const AppAside = () => {
  const dispatch = useDispatch()
  const asideShow = useSelector((state) => state.asideShow)

  const [activeKey, setActiveKey] = useState(1)
  const [upcomingCourses, setUpcomingCourses] = useState([])

  const loadUpcomingCourses = () => {
    axios.get("https://crm.magna.edu.pe/upcoming_courses")
      .then(response => {
        setUpcomingCourses(response.data.courses)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadUpcomingCourses()
  }, [])

  return (
    <CSidebar
      colorScheme="light"
      size="lg"
      overlaid
      placement="end"
      visible={asideShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', asideShow: visible })
      }}
      style={{
        overflowY: 'scroll',
        maxHeight: '100vh'
      }}
      className="aside-right-custom"
    >
      <CSidebarHeader className="bg-transparent p-0">
        <CNav variant="underline">
          <CNavItem>
            <CNavLink
              href="#"
              active={activeKey === 1}
              onClick={(e) => {
                e.preventDefault()
                setActiveKey(1)
              }}
            >
              <CIcon icon={cilList} alt="CoreUI Icons List" />
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink
              href="#"
              active={activeKey === 2}
              onClick={(e) => {
                e.preventDefault()
                setActiveKey(2)
              }}
            >
              <CIcon icon={cilSpeech} alt="CoreUI Icons Speech" />
            </CNavLink>
          </CNavItem> */}
          <CNavItem>
            <CNavLink
              href="#"
              active={activeKey === 3}
              onClick={(e) => {
                e.preventDefault()
                setActiveKey(3)
              }}
            >
              <CIcon icon={cilSettings} alt="CoreUI Icons Settings" />
            </CNavLink>
          </CNavItem>
          <CNavItem className="ms-auto me-2 d-flex align-items-center">
            <CCloseButton onClick={() => dispatch({ type: 'set', asideShow: false })} />
          </CNavItem>
        </CNav>
      </CSidebarHeader>
      <CTabContent>
        <CTabPane visible={activeKey === 1}>
          <CListGroup flush>
            <CListGroupItem className="list-group-item border-start-4 border-start-secondary bg-light dark:bg-white dark:bg-opacity-10 dark:text-medium-emphasis text-center fw-bold text-medium-emphasis text-uppercase small">
              <strong>Nuevos Cursos</strong>
            </CListGroupItem>
            {
              upcomingCourses.map((course, index) => {
                return (
                  <CListGroupItem href="#" className="border-start-4 border-start-magna" key={index}>
                    <CImage src={course.cover && `https://crm.magna.edu.pe${course.cover.url}`} rounded thumbnail align="center" />
                    <div>
                      <strong>{course.name}</strong>
                    </div>
                    <small className="text-medium-emphasis me-3">
                      <CIcon icon={cilCalendar} /> {course.start}
                    </small>
                    <small className="text-medium-emphasis">
                      <CIcon icon={cilDollar} /> {course.price_dollar}
                    </small>
                    <CTooltip content="Solicitar Información">
                      <a className='btn btn-primary btn-sm float-end mt-2' href="https://wa.me/51958745005" target="_blank" rel='noreferrer'>Info</a>
                    </CTooltip>
                  </CListGroupItem>
                )
              })
            }  
          </CListGroup>

        </CTabPane>

        {/* <CTabPane className="p-3" visible={activeKey === 2}>
          <div className="message">
            <div className="py-3 pb-5 me-3 float-start">
              <CAvatar src={avatar7} status="success" size="md" />
            </div>
            <div>
              <small className="text-medium-emphasis">Lukasz Holeczek</small>
              <small className="text-medium-emphasis float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
            <small className="text-medium-emphasis">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </small>
          </div>
          <hr />
          <div className="message">
            <div className="py-3 pb-5 me-3 float-start">
              <CAvatar src={avatar7} status="success" size="md" />
            </div>
            <div>
              <small className="text-medium-emphasis">Lukasz Holeczek</small>
              <small className="text-medium-emphasis float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
            <small className="text-medium-emphasis">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </small>
          </div>
          <hr />
          <div className="message">
            <div className="py-3 pb-5 me-3 float-start">
              <CAvatar src={avatar7} status="success" size="md" />
            </div>
            <div>
              <small className="text-medium-emphasis">Lukasz Holeczek</small>
              <small className="text-medium-emphasis float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
            <small className="text-medium-emphasis">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </small>
          </div>
          <hr />
          <div className="message">
            <div className="py-3 pb-5 me-3 float-start">
              <CAvatar src={avatar7} status="success" size="md" />
            </div>
            <div>
              <small className="text-medium-emphasis">Lukasz Holeczek</small>
              <small className="text-medium-emphasis float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
            <small className="text-medium-emphasis">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </small>
          </div>
          <hr />
          <div className="message">
            <div className="py-3 pb-5 me-3 float-start">
              <CAvatar src={avatar7} status="success" size="md" />
            </div>
            <div>
              <small className="text-medium-emphasis">Lukasz Holeczek</small>
              <small className="text-medium-emphasis float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
            <small className="text-medium-emphasis">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </small>
          </div>
        </CTabPane> */}
        <CTabPane className="p-3" visible={activeKey === 3}>
          <h6>Configuración</h6>
          <div>
            <div className="clearfix mt-4">
              <CFormSwitch size="lg" label="Modo Oscuro" id="DarkMode" defaultChecked />
            </div>
            <div>
              <small className="text-medium-emphasis">
                El modo oscuro puede ser más fácil en los ojos, especialmente en ambientes con poca luz, ya que reduce la cantidad de luz azul y la brillantez de la pantalla
              </small>
            </div>
          </div>
        </CTabPane>
      </CTabContent>
    </CSidebar>
  )
}

export default React.memo(AppAside)

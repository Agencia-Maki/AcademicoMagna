import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CNavItem, CProgress, CNavTitle } from '@coreui/react-pro'
import axios from 'axios'

import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
// import navigation from '../panels/admin/_nav'

const AppSidebar = (props) => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  const currentRol = localStorage.getItem('current_rol')

  const [courses, setCourses] = useState({})

  const { navigation } = props
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)


  const getCourses = async () => {
    try {
      const data = await axios.get(`/panel/student/${currentUser.id}/courses`)
      setCourses(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getNumberLessons = (course) => {
    let res = {
      totalSessions: 0,
      advancedSessions: 0
    }

    course.chapters.map(chapter => {
      chapter.lessons.map(lesson => {
        res.totalSessions++
        if (lesson.link_video !== "") {
          res.advancedSessions++
        }
      })
    })
    return res
  }

  useEffect(() => {
    if (currentRol === "student") { getCourses() }
  }, [])

  return (
    <CSidebar
      className="bg-dark-gradient"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img className="sidebar-brand-full" src="https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/logo.png" height={35} />
        <img className="sidebar-brand-narrow" src="https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/isotipo.png" height={35} />
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
          {
            currentRol === "student" ?
              courses.data && courses.data.map((course, index) => {
                return (
                  <div key={index} className="mt-5">
                    <CNavTitle> {course.name} </CNavTitle>
                    <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                      <div className="text-uppercase mb-1"><small><b>Progreso</b></small></div>
                      <CProgress height={5} value={(getNumberLessons(course).advancedSessions * 100) / getNumberLessons(course).totalSessions} color="test" />
                      <small style={{ color: "#03f3bb" }}>{getNumberLessons(course).advancedSessions} sesiones avanzadas de {getNumberLessons(course).totalSessions}.</small>
                    </CNavItem>
                  </div>
                )
              })
              : null
          }

        </SimpleBar>
      </CSidebarNav>



    </CSidebar>
  )
}

export default React.memo(AppSidebar)

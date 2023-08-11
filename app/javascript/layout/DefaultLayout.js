import React from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { ToastContainer } from 'react-toastify'

import CourseButton from '../components/CourseButton'

import ModalSurvey from './Surveys/ModalSurvey'

const DefaultLayout = (props) => {
  const { routes, navigation } = props
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  return (
    <>
      <AppSidebar
        navigation={navigation}
      />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light bg-opacity-50 dark:bg-transparent">
        <AppHeader
          currentUser={currentUser}
        />
        <div className="body flex-grow-1 px-3">
          <AppContent
            routes={routes}
          />
          <CourseButton />
        </div>
        <AppFooter />
      </div>
      <AppAside />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ModalSurvey
        current_user={currentUser}
      />
    </>
  )
}

export default DefaultLayout

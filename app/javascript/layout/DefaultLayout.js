import React from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'


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
        </div>
        <AppFooter />
      </div>
      <AppAside />
    </>
  )
}

export default DefaultLayout

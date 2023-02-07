import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CForm,
  CFormInput,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilApplicationsSettings, cilMenu, cilSearch } from '@coreui/icons'

import {
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/index'

import { logo } from '../assets/brand/logo'

const AppHeader = (props) => {
  const { currentUser } = props
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const asideShow = useSelector((state) => state.asideShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="px-md-0 me-md-3 d-md-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        {/* <CForm className="d-flex">
          <CInputGroup>
            <CInputGroupText id="search-addon" className="bg-light border-0 px-1">
              <CIcon icon={cilSearch} size="lg" className="my-1 mx-2 text-disabled" />
            </CInputGroupText>
            <CFormInput
              placeholder="Search..."
              ariaLabel="Search"
              ariaDescribedby="search-addon"
              className="bg-light border-0"
            />
          </CInputGroup>
        </CForm> */}
        <CHeaderNav className="ms-auto">
          {/* <AppHeaderDropdownNotif />
          <AppHeaderDropdownTasks />
          <AppHeaderDropdownMssg /> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown 
            currentUser={currentUser}
          />
        </CHeaderNav>
        <CHeaderToggler
          className="px-md-0 me-md-3"
          onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
        >
          <CIcon icon={cilApplicationsSettings} size="lg" />
        </CHeaderToggler>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader

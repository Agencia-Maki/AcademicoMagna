import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import useProfile from '../../hooks/useProfile'

const AppHeaderDropdown = (props) => {
  const { currentUser } = props
  const currentRol = localStorage.getItem('current_rol')

  const { handleSignOut } = useProfile(`/${currentRol}s/sign_out`, `/${currentRol}s/sign_in`)
  
  return (
    <CDropdown variant="nav-item" alignment="end">
      { console.log(currentRol) }
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={currentUser && currentUser.avatar.url} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        {/* <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10 fw-semibold py-2">
          Mi Cuenta
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10 fw-semibold py-2">
          Opciones ({currentUser && currentUser.first_name})
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Mi Perfil
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Actualizar mis datos
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleSignOut} style={{ cursor: "pointer" }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Cerrar Sesion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

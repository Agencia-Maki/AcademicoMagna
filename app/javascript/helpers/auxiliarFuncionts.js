import React from 'react'
import {
  CTooltip
} from '@coreui/react-pro'

export const getBadgeDocumentType = (_document_type) => {
  if (_document_type === 'dni') {
    return (
      <CTooltip content="Documento Nacional de Identidad"> 
        <span class="badge bg-info-gradient">DNI</span> 
      </CTooltip>
    )
  } else if (_document_type === 'foreigner_card') {
    return (
      <CTooltip content="Carnet de Extranjería"> 
        <span class="badge bg-info-gradient">CARNET EXT.</span> 
      </CTooltip>
    )
  } else if (_document_type === 'passport') {
    return (
      <CTooltip content="Pasaporte"> 
        <span class="badge bg-info-gradient">DNI</span> 
      </CTooltip>
    )
  }
}
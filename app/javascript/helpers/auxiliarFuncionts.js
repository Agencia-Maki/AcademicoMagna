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

export const getBadgeCourseState = (_course_state) => {
  if (_course_state === 'on_hold') {
    return (
      <CTooltip content="En espera para empezar"> 
        <span class="badge bg-warning-gradient">En Espera</span> 
      </CTooltip>
    )
  } else if (_course_state === 'in_progress') {
    return (
      <CTooltip content="Programa dictandose ahora"> 
        <span class="badge bg-success-gradient">En Curso</span> 
      </CTooltip>
    )
  } else if (_course_state === 'completed') {
    return (
      <CTooltip content="Programa Finalizado"> 
        <span class="badge bg-danger-gradient">Finalizado</span> 
      </CTooltip>
    )
  }
}

export const getBadgeInscriptionStatus = (_inscription_status) => {
  if (_inscription_status === 'active') {
    return (
      <CTooltip content="Matrícula Activa"> 
        <span class="badge bg-success-gradient">Activa</span> 
      </CTooltip>
    )
  } else if (_inscription_status === 'inactive') {
    return (
      <CTooltip content="Matrícula Inactiva"> 
        <span class="badge bg-success-gradient">Inactiva</span> 
      </CTooltip>
    )
  }
}

export const getBadgeStudentRecord = (_student_record) => {
  if (_student_record === 'on_hold') {
    return (
      <CTooltip content="A espera de asociar a un alumno."> 
        <span class="badge bg-info-gradient">ESPERA</span> 
      </CTooltip>
    )
  } else if (_student_record === 'enrolled') {
    return (
      <CTooltip content="Ficha ya registrada y asociada a un alumno"> 
        <span class="badge bg-success-gradient">MATRICULADO</span> 
      </CTooltip>
    )
  } else if (_student_record === 'canceled') {
    return (
      <CTooltip content="Ficha cancelada, no fue asociada a ningun alumno"> 
        <span class="badge bg-danger-gradient">CANCELADO</span> 
      </CTooltip>
    )
  } else {
    return (
      <CTooltip content="Ficha sin especificar"> 
        <span class="badge bg-warning-gradient">SIN ESPECIFICAR</span> 
      </CTooltip>
    )
  }
}




import React from 'react';
import { CBadge, CTooltip } from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFaceMeh,
  faHandHoldingDollar,
  faMars, faMarsAndVenus, faStarAndCrescent, faVenus,
} from '@fortawesome/free-solid-svg-icons'

export const getGenderIcon = (gender) => {
  if (gender === "male") {
    return (
      <CTooltip content="Masculino">
        <span style={{ color: "#0033CC" }}>
          <FontAwesomeIcon icon={faMars} size='lg' />
        </span>
      </CTooltip>
    )
  } else if (gender === "female") {
    return (
      <CTooltip content="Femenino">
        <span style={{ color: "#FF0080" }}>
          <FontAwesomeIcon icon={faVenus} size='lg' />
        </span>
      </CTooltip>
    )
  } else {
    return (
      <CTooltip content="Sin especificar">
        <span style={{ color: "#CACACA" }}>
          <FontAwesomeIcon icon={faMarsAndVenus} size='lg' />
        </span>
      </CTooltip>
    )
  }
}

export const getPayStatusBadge = (pay_status) => {
  if (pay_status === "debtor") {
    return (
      <CTooltip content="Con mora">
        <CBadge color="danger">
          <FontAwesomeIcon icon={faHandHoldingDollar} size='lg' />
        </CBadge>
      </CTooltip>
    )
  } else if (pay_status === "no_debtor") {
    return (
      <CTooltip content="Sin deudas">
        <CBadge color="success">
          <FontAwesomeIcon icon={faStarAndCrescent} size='lg' />
        </CBadge>
      </CTooltip>
    )
  } else {
    return (
      <CTooltip content="Sin especificar">
        <CBadge color="primary">
          <FontAwesomeIcon icon={faFaceMeh} size='lg' />
        </CBadge>
      </CTooltip>
    )
  }
}

export const getDocumentTypeBadge = (document_type) => {
  if (document_type === "dni") {
    return (
      <CTooltip content="Documento Nacional de Identidad">
        <CBadge color="primary">
          D.N.I
        </CBadge>
      </CTooltip>
    )
  } else if (document_type === "foreigner_card") {
    return (
      <CTooltip content="Carnet de Extranjería">
        <CBadge color="success">
          Carnet de Extranjería
        </CBadge>
      </CTooltip>
    )
  } else if (document_type === "passport") {
    return (
      <CTooltip content="Pasaporte">
        <CBadge color="warning">
          Pasaporte
        </CBadge>
      </CTooltip>
    )
  } else {
    return (
      <CTooltip content="Sin especificar">
        <CBadge color="default">
          S/A
        </CBadge>
      </CTooltip>
    )
  }
}
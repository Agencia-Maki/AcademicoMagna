import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import { CBadge, CTooltip } from '@coreui/react-pro'

import useCrud from '../../../../../../hooks/useCrud2'

import Table from '../../../../../GeneralComponents/Table'
import CertificateModal from '../../../../../GeneralComponents/Modals/Certificate/Certificate'

const TableCertificates = (props) => {
  const { certificateList, loadData, program } = props

  const { deleteModel: deleteCertificate } = useCrud("")

  const [showModalCertificate, setShowModalCertificate] = useState(false)
  const [modalType, setModalType] = useState("")
  const [currentCertificate, setCurrentCertificate] = useState({})

  const columns = [
    { key: 'index', label: '#', sorter: false, filter: false },
    { key: "title", label: 'Título de Certificado' },
    { key: 'tag', label: 'Etiqueta', sorter: false, filter: false },
    { key: 'certificate_type', label: 'Tipo de Certificado', sorter: true, filter: false },
    { key: 'hours', label: 'Horas Lectivas', sorter: true, filter: false },
    { key: 'actions', label: 'Acciones', sorter: false, filter: false }
  ]

  const actions_arr = [
    {
      key: 'show_certificate_details',
      label: 'Ver detalles de la certificación (preview)',
      icon: <FontAwesomeIcon icon={faEye} inverse />,
      color: 'info',
      tooltip: 'Ver detalles de la certificación (preview)',
      handler: (item) => {
        setCurrentCertificate(item)
        setShowModalCertificate(true)
        setModalType("show")
      },
      // show_if: (item) => (item.record_status === 'created' && item.client_record !== null)
      show_if: (item) => (
        program.status != 'completed' || program.status != 'cancelled'
      )
    },
    {
      key: 'edit_certificate',
      label: 'Editar certificado',
      icon: <FontAwesomeIcon icon={faPen} inverse />,
      color: 'warning',
      tooltip: 'Editar certificado',
      handler: (item) => {
        setCurrentCertificate(item)
        setShowModalCertificate(true)
        setModalType("edit")
      },
      // show_if: (item) => (item.record_status !== 'created' && item.client_record === null)
      show_if: (item) => (
        program.status != 'completed' || program.status != 'cancelled'
      )
    },
    {
      key: 'delete_certificate',
      label: 'Eliminar certificado',
      icon: <FontAwesomeIcon icon={faTrash} inverse />,
      color: 'danger',
      tooltip: 'Eliminar certificado',
      handler: async (item) => {
        await deleteCertificate(`/panel/admin/certificates/${item.id}`, loadData)
      },
      // show_if: (item) => (item.record_status !== 'created' && item.client_record === null)
      show_if: (item) => (
        program.status != 'completed' || program.status != 'cancelled'
      )
    }
  ]

  const setTagBadge = (tag) => {
    switch (tag) {
      case 'specialist':
        return <CBadge color='success'>Especialista</CBadge>
      case 'approved':
        return <CBadge color='success'>Aprobado</CBadge>
      case 'participant':
        return <CBadge color='info'>Participante</CBadge>
      case 'auditor':
        return <CBadge color='warning'>Auditor</CBadge>
      default:
        return <CBadge color='danger'>Error en TAG (NULL)</CBadge>
    }
  }

  const setCertificateTypeBadge = (certificate_type) => {
    switch (certificate_type) {
      case 'general':
        return (
          <CTooltip content="Certificado General del curso, verificar la cantidad de horas lectivas del curso.">
            <CBadge color='success'>General</CBadge>
          </CTooltip>
        )
      case 'module':
        return (
          <CTooltip content="Certificado Modular del curso, verificar la cantidad de horas lectivas de cada Módulo.">
            <CBadge color='info'>Modular</CBadge>
          </CTooltip>
        )
      default:
        return <CBadge color='danger'>Error en Tipo de Certificado (NULL)</CBadge>
    }
  }

  const scopedColumns = {
    tag: (item) => {
      return (
        <td>
          {setTagBadge(item.tag)}
        </td>
      )
    },
    certificate_type: (item) => {
      return (
        <td>
          {setCertificateTypeBadge(item.certificate_type)}
        </td>
      )
    }
  }

  return (
    <>      
      <Table
        columns={columns}
        actions_arr={actions_arr}
        data={certificateList}
        scopedColumns={scopedColumns}
      />
      <CertificateModal 
        setShowModal={setShowModalCertificate}
        setModalType={setModalType}
        showModal={showModalCertificate}
        modalType={modalType}
        currentCertificate={currentCertificate}
        setCurrentCertificate={setCurrentCertificate}
        loadData={loadData}
      />
    </>
  )
}

export default TableCertificates
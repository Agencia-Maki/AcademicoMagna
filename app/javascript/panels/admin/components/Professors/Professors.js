import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner
} from '@coreui/react-pro'

import useCrud from '../../../../hooks/useCrud'
import ProfessorsTable from './extras/ProfessorsTable'
import ModalSignature from './extras/ModalSignature'

const url_ep = '/panel/admin/all_professors'     // url_end_point
const Professors = () => {
  const {
    getModelData: getProfessorList
  } = useCrud(url_ep)


  const columns = [
    { key: 'index', label: '#', filter: false, sorter: false },
    { key: 'avatar', label: 'Foto', filter: false, sorter: false },
    { key: 'full_name', label: 'Nombres Completo' },
    { key: 'document_type', label: 'Tipo de Documento', filter: false, sorter: false, _style: { width: '1%' } },
    { key: 'document_number', label: 'Numero de Documento', _style: { width: '2%' } },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Telefono', _style: { width: '2%' } },
    { key: 'actions', label: 'Acciones', filter: false, sorter: false },
  ]

  const [professorList, setProfessorList] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [professor, setProfessor] = useState(null)

  const loadData = async () => {
    setLoading(true)
    const data = await getProfessorList()
    setProfessorList(
      data.map((professor, index) => {
        return {
          ...professor,
          index: index + 1,
          full_name: professor.first_name + ' ' + professor.last_name,
        }
      })
    )
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              Panel de Profesores
            </CCardHeader>
            <CCardBody>
              <Link
                to="/profesores/nuevo"
                className="btn btn-sm btn-success mb-3 float-end"
              >
                Registrar Nuevo Profesor
              </Link>

              {
                loading ?
                  <CSpinner /> :
                  <ProfessorsTable
                    data={professorList}
                    columns={columns}
                    setShowSignatureModal={setShowSignatureModal}
                    setProfessor={setProfessor}
                  />
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {
        showSignatureModal &&
        <ModalSignature
          showModal={showSignatureModal}
          setShowModal={setShowSignatureModal}
          professor={professor}
          setProfessor={setProfessor}
        />
      }
    </>
  )
}

export default Professors;
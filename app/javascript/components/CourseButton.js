import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFire
} from '@fortawesome/free-solid-svg-icons'
import { CTooltip } from '@coreui/react-pro'


const CourseButton = () => {
  const dispatch = useDispatch()
  const asideShow = useSelector((state) => state.asideShow)

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#3c4b64',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
      onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
    >
      <CTooltip content="Ver los cursos que se vienen en MAGNA!">
        <FontAwesomeIcon icon={faFire}
          style={{
            color: '#03f3bb',
            position: 'absolute',
            top: '50%',
            left: '25%',
            transform: 'translate(-45%, -45%)',
            fontSize: '1.8rem',

          }}
        />
      </CTooltip>
    </div>
  )
}



export default CourseButton
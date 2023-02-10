import React, { useState, useEffect } from 'react'
import HTMLReactParser from 'html-react-parser'
import {
  CTooltip,
  CCollapse
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideoCamera
} from '@fortawesome/free-solid-svg-icons'

const CollapseSessions = (props) => {
  const [topics, setTopics] = useState(false)

  const showTopics = (e) => {
    setTopics(!topics);
    e.preventDefault();
  }

  const showLinkVideo = (lesson) => {
    if (lesson.link_video !== '') {
      return (
        <a rel="noopener noreferrer" href={lesson.link_video} target="_blank">
          <CTooltip content="Ver grabacion" placement="top-start">
            <FontAwesomeIcon icon={faVideoCamera} className="float-end" size='lg' inverse />
          </CTooltip>
        </a>
      )
    }
  }

  const getSessions = (_chapter) => {
    const sessions = _chapter.lessons.map((session, index) => (
      <div key={index} className="session_enunciate">
        <div className="">
          <h6>{session.name}</h6>
          { showLinkVideo(session) }
        </div>
        <span>{HTMLReactParser(session.topics)}</span>
      </div>
    ))
    return sessions
  }

  useEffect(() => {
    if (props.index === 0) {
      setTopics(true)
    }
  },[])

  return (
    <>
      <div 
        className="chapter-title-apart cursor-pointer"
        onClick={showTopics}
      >
        { props.chapter.name }
      </div>
      <CCollapse
        visible={topics}
      >
        <>
          { getSessions(props.chapter) }
        </>
      </CCollapse>

    </>
  )
}

export default CollapseSessions;
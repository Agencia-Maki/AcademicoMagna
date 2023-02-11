import React, { useState, useEffect } from 'react'
import HTMLReactParser from 'html-react-parser'
import ModalVideo from 'react-modal-video'
import {
  CTooltip,
  CCollapse
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilm
} from '@fortawesome/free-solid-svg-icons'

const CollapseSessions = (props) => {
  const [topics, setTopics] = useState(false)

  const [currentVideo, setCurrentVideo] = useState({})

  const [isOpen, setOpen] = useState(false)
  const [videoLink, setVideoLink] = useState('')

  const showVideo = (_video) => {
    setCurrentVideo(_video)
    setVideoLink(youtube_parser(_video.link_video))    
    setOpen(true)
  }

  const showTopics = (e) => {
    setTopics(!topics);
    e.preventDefault();
  }

  function youtube_parser(url) {
    return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1]
  }



  const showLinkVideo = (lesson) => {
    if (lesson.link_video !== '') {
      return (
        <CTooltip content="Ver grabacion" placement="top-start">
          <CTooltip content="Ver grabacion" placement="top-start">
            <FontAwesomeIcon icon={faFilm} className="float-end" size='lg' inverse onClick={() => showVideo(lesson)} />
          </CTooltip>
        </CTooltip>
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
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={videoLink} onClose={() => setOpen(false)} />
    </>
  )
}

export default CollapseSessions;
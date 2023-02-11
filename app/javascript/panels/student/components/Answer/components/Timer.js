import React, { useEffect, useState, useRef, useCallback} from 'react'

const Timer = (props) => {
  const timeoutId = useRef(null);

  const initialMinutes = localStorage.getItem(`minutes_${props.exam.id}`) ?? props.exam.duration-1;
  const initialSeconds = localStorage.getItem(`seconds_${props.exam.id}`) ?? 59;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  const countTimer = useCallback(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
      localStorage.setItem(`seconds_${props.exam.id}`, seconds);
    }
    if (seconds <= 0) {
      if (minutes <= 0) {
        localStorage.removeItem(`minutes_${props.exam.id}`)
        localStorage.removeItem(`seconds_${props.exam.id}`)
        props.handleSubmitAnswer()
        // lanzar callback para regustrar la entrega
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
        localStorage.setItem(`minutes_${props.exam.id}`, minutes - 1);
        localStorage.setItem(`seconds_${props.exam.id}`, seconds);
      }
    }

  }, [seconds, minutes]);

  useEffect(() => {
    timeoutId.current = window.setTimeout(countTimer, 1000 );
    // cleanup function
    return () => window.clearTimeout(timeoutId.current);

  }, [minutes, countTimer]);
  return (
    <div>
      <div className="float-right">
        <small> Tiempo restante </small>
        <h1 className="text-primary mr-3">
          {minutes < 10 ? `0${minutes}` : minutes} : { seconds < 10 ? `0${seconds}` : seconds }
        </h1>
      </div>
    </div>
  )
}

export default Timer

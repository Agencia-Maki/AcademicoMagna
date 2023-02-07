import { useState, useEffect } from "react"

const useChange = (initialData) => {
  const [data, setData] = useState(initialData)
  // const [file, setFile] = useState(null)

  useEffect(() => {
    setData(initialData)   
    }, [initialData]
  )

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      
    })
  }

  const handleChangeFile = (e, setFile) => {
    setFile(e.target.files[0])
  }

  const resetData = () => {
    setData(initialData)
  }


  return { data, handleChange, handleChangeFile, resetData, setData }
}

export default useChange
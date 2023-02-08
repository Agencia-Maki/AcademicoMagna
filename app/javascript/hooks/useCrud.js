import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { passCsrfToken } from '../helpers/csrftoken'

import { toast } from 'react-toastify';

const useCrud = (url, url_back='') => {
  const [modelIndex, setModelIndex] = useState([])
  const [message, setMessage] = useState({})
  let navigate = useNavigate()

  useEffect(() => {
    passCsrfToken(document, axios)
    getIndex()
  }, [])

  const getIndex = async() => {
    await axios.get(url, {}).then(response => {
      setModelIndex(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getModelData = async(url_to = url) => {
    const response = await axios.get(url_to)
    return response.data
  }

  /*    METODOS PARA RETORNAR Y USAR EN LOS CRUDS    */

  const getModel = async(setState, url_to = url) => {
    await axios.get(url_to, {}).then(response => {
      setState(response.data)
      }).catch(error => {
      console.log(error)
    })
  }

  const getModelPage = async(url_to = url, page) => {
    let finalPage = '?page='
    if (page > 0) {
      finalPage += String(page)
    }else {
      finalPage = ''
    }

    // const finalPage = page > 0 ? 'page=' + String(page) : ''
    await axios.get(url_to + finalPage, {}).then(response => {
      setModelIndex(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const setToast = (_data) => {
    if (_data.status === 'ok') {
      toast.success(_data.message, {theme: "dark"})
    } else {
      _data.message.map(message => {
        toast.error(message, {theme: "dark"})
      })
    }
  }
  
  const deleteModel = async(dataModel) => {
    await axios.delete(`${url}/${String(dataModel.id)}`, {}).then(response => {
      getIndex()
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const deleteModelWhitUrl = async(url_to) => {
    await axios.delete(`${url_to}`).then(response => {
      setTimeout(() => { location.reload() }, 1000)
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const insertModel = async(dataModel, url_to = url) => {
    await axios.post(url_to, dataModel).then(response => {
      if (url_back !== '') {
        navigate(url_back)
      }else {
        getIndex()
      }
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const insertModelData = async(_data, url_to = url) => {
    const response = await axios.post(url_to, _data)
    if (response.status === 200) {
      setToast(response.data)
    }
    return response.data
  }

  const updateModel = async(dataModel, url_to = url) => {
    await axios.put(url_to, dataModel ).then(response => {
      url_back !== '' ? navigate(url_back) : getIndex()
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const updateModelByID = async(dataModel, url_to = url) => {
    await axios.put(`${url_to}/${String(dataModel.id)}`, dataModel ).then(response => {
      url_back !== '' ? navigate(url_back) : getIndex()
      setToast(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  // 11 JULIO 2022

  return { modelIndex, getModel, getModelData, insertModelData, getModelPage, deleteModel, deleteModelWhitUrl, insertModel, updateModel, updateModelByID, setToast, message }

}

export default useCrud
import { useState, useEffect } from "react";
import axios from 'axios'

import { passCsrfToken } from '../helpers/csrftoken'

const profilePrototype = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  dni: "",
  code: "",
  gender: "",
  status: "",
  phone: "",
  avatar: {
    url: '',
    medium: {
      url: ''
    }
  },  
  role: {
    id: 0,
    name: "",
    slug: ""
  }
}

const useProfile = (url="", url_back = "") => {
  const [profile, setProfile] = useState(profilePrototype)

  useEffect(() => {
    passCsrfToken(document, axios)
    if(!url.includes("/sign_out")){
      getProfile()
    }    
  }, [])

  const getProfile = async() => {
    await axios.get(url, {}).then(response => {
      setProfile(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleSignOut = async() => {
    axios.delete(url).then(
      setTimeout(() => {
        localStorage.removeItem('current_user')
        localStorage.removeItem('client_state_reference')
        localStorage.removeItem('course_reference')
        location.replace(url_back);
      }, 800)
    )
  }

  return { profile, handleSignOut }
}

export default useProfile


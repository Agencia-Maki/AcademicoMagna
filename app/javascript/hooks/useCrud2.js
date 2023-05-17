import { useEffect, useState } from 'react'
import axios from 'axios'
import { passCsrfToken } from '../helpers/csrftoken'

import useNotification from './useNotification'
import Swal from 'sweetalert2'

const useCrud = (endpoint) => {
  useEffect(() => {
    passCsrfToken(document, axios)
  }, [])

  const { setToast, successNotification, errorNotification } = useNotification()

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false
  })

  const getModel = async (_endpoint = endpoint) => {
    try {
      const resp = await axios.get(_endpoint)
      if (resp.status === 200) {
        return resp.data
      }
    } catch (error) {
      const dataSimulateSessionExpired = {
        status: 401,
        message: "Su sesión ha expirado."
      }
      setToast(dataSimulateSessionExpired)
      setTimeout(() => {
        window.location = "/users/sign_in"
      }, 1000)
      return null
    }
  }

  const insertModel = async (_data, _endpoint = endpoint,  _callback = null) => {
    swalWithBootstrapButtons.fire({
      title: 'Está seguro(a)?',
      text: "Esta accion insertará los registros en el sistema!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, registrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          axios.post(_endpoint, _data)
            .then((response) => {
              if (response.status === 200) {
                successNotification(response.data.message)
                resolve();
              } else {
                reject(response.data.message)
                errorNotification(response.data.message)
              }
            })
            .catch((error) => {
              reject(error)
              errorNotification(error.response.data.message)
            });
        });
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Hecho!',
          'El registro fue enviado.',
          'success'
        )
        if (_callback) {
          _callback()
        }
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha enviado el registro.',
          'error'
        )
      }
    });
  }

  const updateModel = async (_data, _endpoint = endpoint, _callback = null) => {
    swalWithBootstrapButtons.fire({
      title: 'Está seguro(a)?',
      text: "Esta accion actualizará los registros en el sistema!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          axios.put(_endpoint, _data)
            .then((response) => {
              if (response.status === 200) {
                successNotification(response.data.message)
                resolve();
              } else {
                reject(response.data.message)
                errorNotification(response.data.message)
              }
            })
            .catch((error) => {
              reject(error)
              errorNotification(error.response.data.message)
            });
        });
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Hecho!',
          'El registro fue actualizado.',
          'success'
        )
        if (_callback) {
          _callback()
        }
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha actualizado el registro.',
          'error'
        )
      }
    });
  }

  const deleteModel = async (_endpoint = endpoint,  _callback = null) => {
    swalWithBootstrapButtons.fire({
      title: 'Está seguro(a)?',
      text: "Esta accion eliminará los registros en el sistema!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          axios.delete(_endpoint)
            .then((response) => {
              if (response.status === 200) {
                successNotification(response.data.message)
                resolve();
              } else {
                reject(response.data.message)
                errorNotification(response.data.message)
              }
            })
            .catch((error) => {
              reject(error)
              errorNotification(error.response.data.message)
            });
        });
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Hecho!',
          'El registro fue eliminado.',
          'success'
        )
        if (_callback) {
          _callback()
        }
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha eliminado el registro.',
          'error'
        )
      }
    });
  }

  return {
    getModel,
    insertModel,
    updateModel,
    deleteModel
  }

}

export default useCrud
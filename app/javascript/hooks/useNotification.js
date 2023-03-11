import { toast } from 'react-toastify';

const useNotification = () => {
  const setToast = (_data) => {
    if (_data.status === 'ok') {
      toast.success(_data.message, {theme: "dark"})
    } else {
    _data.message.map(message => {
      toast.error(message, {theme: "dark"})
    })
    }
  }

  const successNotification = (_message) => {
    toast.success(_message, {theme: "dark"})
  }

  const errorNotification = (_message) => {
    toast.error(_message, {theme: "dark"})
  }

  return { setToast, successNotification, errorNotification }
}

export default useNotification
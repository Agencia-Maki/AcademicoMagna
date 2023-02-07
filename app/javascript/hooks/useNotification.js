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
  return { setToast }
}

export default useNotification
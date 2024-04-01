import errors from 'shared/ui/notification/errors.json'
import type { ErrorsText } from 'shared/types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export class Notification {
  static showErrorNotification(errorData: any) {
    let errorText: string = errorData.message
    const errorDataText: ErrorsText = errors
    for (const key in errorDataText) {
      if (errorText.includes(key)) {
        errorText = errorDataText[key]
      }
    }
    toast(errorText, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }
}

import errors from './errors.json';
import {ErrorsText} from '../../types';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default class Notification {
  //TODO: определить тип
  static showErrorNotification(errorData: any) {
    let errorText: string = errorData.message
    const errorDataText: ErrorsText = errors
    for (let key in errorDataText) {
      if (errorText.includes(key)) {
        errorText = errorDataText[key]
      }
    }
    toast(errorText, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  static showInfoNotification(message: string) {
    toast(message, {
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      autoClose: 3000,
      theme: "colored",
    });
  }
}
import errors from './errors.json';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default class Notification {
  //TODO: определить тип
  static showErrorNotification(errorData: any) {
    let errorText: string = errorData.message
    for (let key in errors) {
      if (errorText.includes(key)) {
        // @ts-ignore
        errorText = errors[key]
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
}
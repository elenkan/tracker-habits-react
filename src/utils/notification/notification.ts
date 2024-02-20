import errors from './errors.json';
import type {ErrorsText} from 'types';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Notification {
  static showErrorNotification(errorData: any) {
    let errorText: string = errorData.message;
    const errorDataText: ErrorsText = errors;
    for (const key in errorDataText) {
      if (errorText.includes(key)) {
        errorText = errorDataText[key];
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
    });
  }
}

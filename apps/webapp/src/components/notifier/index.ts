import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
};

const message = {
  success: (msg: string) => toast.success(msg, defaultOptions),
  error: (msg: string) => toast.error(msg, defaultOptions),
  info: (msg: string) => toast.info(msg, defaultOptions),
  warn: (msg: string) => toast.warn(msg, defaultOptions),
};

export default message;

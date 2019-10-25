import { toast } from "react-toastify";

toast.configure();

const Success = message => {
  toast.success(message);
};

const Error = message => {
  toast.error(message);
};

const Info = message => {
  toast.info(message);
};

const Warning = message => {
  toast.warn(message);
};

export { Success, Error, Info, Warning };

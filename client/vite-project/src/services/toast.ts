import { toast } from "react-toastify";

export const successToast = (message: string) => {
	toast.success(message, {
		position: "top-right",
		autoClose: 3000,
	});
};

export const errorToast = (message: string) => {
	toast.error(message, {
		position: "top-right",
		autoClose: 3000,
	});
};

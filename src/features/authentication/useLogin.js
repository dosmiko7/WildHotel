import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export const useLogin = () => {
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),

		onSuccess: (user) => {
			navigate("/dashboard");
		},

		onError: (err) => {
			console.error("LOGIN ERROR ", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoading };
};

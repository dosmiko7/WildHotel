import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useChecking = () => {
	const queryClient = useQueryClient();
	const navgiate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
			}),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({
				active: true,
			});
			navgiate("/");
		},

		onError: () => toast.error("There was an error while checking in"),
	});

	return { checkin, isCheckingIn };
};

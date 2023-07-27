import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const { booking, isLoading } = useBooking();
	const moveBack = useMoveBack();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking]);

	if (isLoading) return <Spinner />;

	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

	const handleCheckin = () => {};

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox
					checked={confirmPaid}
					disabled={confirmPaid}
					onChange={() => setConfirmPaid((confirm) => !confirm)}
				>
					I confirm that {guests.fullName} has paid total amount of {formatCurrency(totalPrice)}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid}
				>
					Check in booking #{bookingId}
				</Button>
				<Button
					variation="secondary"
					onClick={moveBack}
				>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default CheckinBooking;

import styled from "styled-components";

import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "./useRecentBookings";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

const DashboardLayout = () => {
	const { bookings, isLoading } = useRecentBookings();

	if (isLoading) return <Spinner />;

	return <StyledDashboardLayout>Hello</StyledDashboardLayout>;
};

export default DashboardLayout;

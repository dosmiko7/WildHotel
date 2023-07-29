import styled from "styled-components";

import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

const DashboardLayout = () => {
	const { bookings, isLoading1 } = useRecentBookings();
	const { stays, confirmedStays, isLoading2 } = useRecentStays();

	if (isLoading1 || isLoading2) return <Spinner />;

	return <StyledDashboardLayout>Hello</StyledDashboardLayout>;
};

export default DashboardLayout;

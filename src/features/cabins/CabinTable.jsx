import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const filterCabins = (cabins, filterValue) => {
	switch (filterValue) {
		case "all":
			return cabins;
		case "no-discount":
			return cabins.filter((cabin) => cabin.discount === 0);
		case "with-discount":
			return cabins.filter((cabin) => cabin.discount > 0);
		default:
			return cabins;
	}
};

const CabinTable = () => {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	const filterValue = searchParams.get("discount") || "all";

	const filteredCabins = filterCabins(cabins, filterValue);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={filteredCabins}
					render={(cabin) => (
						<CabinRow
							cabin={cabin}
							key={cabin.id}
						/>
					)}
				/>
			</Table>
		</Menus>
	);
};

export default CabinTable;

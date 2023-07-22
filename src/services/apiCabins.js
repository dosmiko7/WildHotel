import supabase from "./supabase";

export const getCabins = async () => {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error("Cabins could not be loaded");
		throw new Error("Cabins could not be loaded");
	}

	return data;
};

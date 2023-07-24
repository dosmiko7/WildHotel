import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export const getCabins = async () => {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error("Cabins could not be loaded");
		throw new Error("Cabins could not be loaded");
	}

	return data;
};

export const createEditCabin = async (newCabin, id) => {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/edit cabin
	let query = supabase.from("cabins");
	// 1A. Create  a new cabin
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// 1B. Edit an exist cabin
	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	// 2. Upload image
	if (hasImagePath) {
		return data;
	}

	const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

	// 3. Delete the cabin if there was an error uploading image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error("Cabin image could not be uploaded and the cabin was not created");
	}
};

export const deleteCabin = async (id) => {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	return data;
};

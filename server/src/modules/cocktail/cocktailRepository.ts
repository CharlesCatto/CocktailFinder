import createClient from "../../../database/client"; // Pas prisma !

export const findAllCocktails = async () => {
	const client = await createClient();
	try {
		const [rows] = await client.query("SELECT * FROM cocktail");
		return rows;
	} finally {
		await client.end();
	}
};

export const findAlcoholicCocktails = async (isAlcoholic: boolean) => {
	const client = await createClient();
	const [rows] = await client.query(
		"SELECT * FROM cocktail WHERE alcoholic = ?",
		[isAlcoholic ? 1 : 0],
	);
	return rows;
};

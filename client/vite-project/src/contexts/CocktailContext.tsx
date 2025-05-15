import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { Cocktail } from "../types/cocktail";

interface CocktailContextType {
	cocktails: Cocktail[];
	setCocktails: Dispatch<SetStateAction<Cocktail[]>>;
}

const CocktailContext = createContext<CocktailContextType | undefined>(
	undefined,
);

export function useCocktailContext() {
	const context = useContext(CocktailContext);
	if (!context) {
		throw new Error(
			"useCocktailContext must be used within a CocktailProvider",
		);
	}
	return context;
}

export function CocktailProvider({ children }: { children: ReactNode }) {
	const [cocktails, setCocktails] = useState<Cocktail[]>([]);

	return (
		<CocktailContext.Provider value={{ cocktails, setCocktails }}>
			{children}
		</CocktailContext.Provider>
	);
}

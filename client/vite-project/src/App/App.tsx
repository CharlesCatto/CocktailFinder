import CardList from "../components/CardList/CardList";
import AddCardForm from "../components/AddCardForm/AddCardForm";
import { CocktailProvider } from "../contexts/CocktailContext";
import NeonSound from "../components/sound/NeonSound";
import KoolGang from "../components/sound/KoolGang";

function App() {
	return (
		<div>
			<CocktailProvider>
				<NeonSound />
				<KoolGang />
				<AddCardForm />
				<CardList />
			</CocktailProvider>
		</div>
	);
}

export default App;

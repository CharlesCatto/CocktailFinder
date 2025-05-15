import CardList from "../components/CardList/CardList";
import AddCardForm from "../components/AddCardForm/AddCardForm";
import { CocktailProvider } from "../contexts/CocktailContext";

function App() {
	return (
		<div>
			<CocktailProvider>
				<h1>Ma Super Card App</h1>
				<AddCardForm />
				<CardList />
			</CocktailProvider>
		</div>
	);
}

export default App;

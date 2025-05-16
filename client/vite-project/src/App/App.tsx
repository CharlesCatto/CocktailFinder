import { CocktailProvider } from "../contexts/CocktailContext";
import NeonSound from "../components/sound/NeonSound";
import KoolGang from "../components/sound/KoolGang";

function App() {
	return (
		<div>
			<CocktailProvider>
				<NeonSound />
				<KoolGang />
			</CocktailProvider>
		</div>
	);
}

export default App;

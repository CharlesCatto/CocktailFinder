import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Layout/Layout";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Finder from "./pages/Finder/Finder";
import { CocktailProvider } from "./contexts/CocktailContext"; // <-- importer le provider ici

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "about", element: <About /> },
			{ path: "cocktails", element: <Finder /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CocktailProvider>
			<RouterProvider router={router} />
		</CocktailProvider>
	</React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

import Layout from "./Layout/Layout";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Finder from "./pages/Finder/Finder";
import Account from "./pages/Account/Account";
import { CocktailProvider } from "./contexts/CocktailContext"; // <-- importer le provider ici

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "about", element: <About /> },
			{ path: "cocktails", element: <Finder /> },
			{ path: "account", element: <Account /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CocktailProvider>
			<AuthProvider>
				<ToastContainer position="top-right" autoClose={3000} theme="colored" />
				<RouterProvider router={router} />
			</AuthProvider>
		</CocktailProvider>
	</React.StrictMode>,
);

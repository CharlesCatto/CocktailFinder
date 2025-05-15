// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App/App";
// import Layout from "./Layout/Layout";
// import About from "./pages/About/About";

// ReactDOM.createRoot(document.getElementById("root")!).render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path="/" element={<Layout />}>
// 					<Route index element={<App />} />
// 					<Route path="about" element={<About />} />
// 				</Route>
// 			</Routes>
// 		</BrowserRouter>
// 	</React.StrictMode>,
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Layout/Layout";
// import App from "./App/App";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
// Tu pourras ajouter d'autres pages ici, comme Contact, Blog, etc.

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "about", element: <About /> },

			// ajoute ici d'autres routes : contact, articles/:id, etc.
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

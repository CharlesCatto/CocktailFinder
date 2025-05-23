import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../helpers/api";
import { successToast, errorToast } from "../../services/toast";
import styles from "./Account.module.css";

import eyeClosed from "../../assets/Icons/eye-slash.svg";
import eye from "../../assets//Icons/eye.svg";

interface LoginResponse {
	token: string;
	user: {
		id: number;
		username: string;
		email: string;
		is_admin: boolean;
	};
}

interface RegisterResponse {
	message: string;
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export default function Account() {
	const [isLogin, setIsLogin] = useState(true);
	const [register, setRegister] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		firstname: "",
		lastname: "",
	});

	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const navigate = useNavigate();

	const { handleLogin } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (isLogin) {
			setLogin((prev) => ({ ...prev, [name]: value }));
		} else {
			setRegister((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			if (isLogin) {
				const response = await api.post<LoginResponse>("/api/login", login);
				handleLogin(response.data.user);
				successToast(`Bienvenue, ${response.data.user.username} !`);
				setTimeout(() => navigate("/"), 2000);
			} else {
				if (register.password !== register.confirmPassword) {
					errorToast("Les mots de passe ne correspondent pas.");
					setErrorMessage("Les mots de passe ne correspondent pas.");
					return;
				}

				await api.post<RegisterResponse>("/api/register", {
					username: register.username,
					email: register.email,
					password: register.password,
					firstname: register.firstname,
					lastname: register.lastname,
				});

				const loginResponse = await api.post<LoginResponse>("/api/login", {
					email: register.email,
					password: register.password,
				});

				handleLogin(loginResponse.data.user);
				setWelcomeMessage(`Bienvenue ${loginResponse.data.user.username} !`);
				successToast("Compte créé avec succès !");
				setTimeout(() => navigate("/account"), 2000);
			}
		} catch (error) {
			setErrorMessage("Erreur d'authentification");
			errorToast("Email ou mot de passe incorrect");
			console.error("Erreur:", error);
		}
	};

	const toggleForm = () => setIsLogin(!isLogin);
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const passwordsMatch = register.password === register.confirmPassword;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{welcomeMessage && (
					<div className={styles.welcome}>{welcomeMessage}</div>
				)}
				{errorMessage && <div className={styles.error}>{errorMessage}</div>}

				<h2>{isLogin ? "Connexion" : "Inscription"}</h2>

				<form onSubmit={handleSubmit}>
					{!isLogin && (
						<>
							<div className={styles.inputGroup}>
								<label htmlFor="firstname">Prénom</label>
								<input
									id="firstname"
									type="text"
									name="firstname"
									value={register.firstname}
									onChange={handleChange}
									required
								/>
							</div>
							<div className={styles.inputGroup}>
								<label htmlFor="lastname">Nom</label>
								<input
									type="text"
									name="lastname"
									value={register.lastname}
									onChange={handleChange}
									required
								/>
							</div>
							<div className={styles.inputGroup}>
								<label htmlFor="username">Pseudo</label>
								<input
									type="text"
									name="username"
									value={register.username}
									onChange={handleChange}
									required
								/>
							</div>
						</>
					)}

					<div className={styles.inputGroup}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={isLogin ? login.email : register.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor="password">Mot de passe</label>
						<div className={styles.passwordContainer}>
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={isLogin ? login.password : register.password}
								onChange={handleChange}
								required
							/>
							<button
								type="button"
								onClick={toggleShowPassword}
								className={styles.eyeButton}
							>
								<img
									src={showPassword ? eyeClosed : eye}
									alt="Toggle password"
								/>
							</button>
						</div>
					</div>

					{!isLogin && (
						<div className={styles.inputGroup}>
							<label htmlFor="confirmPassword">Confirmer le mot de passe</label>
							<input
								type={showPassword ? "text" : "password"}
								name="confirmPassword"
								value={register.confirmPassword}
								onChange={handleChange}
								required
								className={passwordsMatch ? styles.valid : styles.invalid}
							/>
						</div>
					)}

					<button type="submit" className={styles.submitButton}>
						{isLogin ? "Se connecter" : "S'inscrire"}
					</button>
				</form>

				<div className={styles.toggleText}>
					{isLogin ? "Pas de compte ?" : "Déjà un compte ?"}{" "}
					<button
						type="button"
						onClick={toggleForm}
						className={styles.toggleButton}
					>
						{isLogin ? "Créer un compte" : "Se connecter"}
					</button>
				</div>
			</div>
		</div>
	);
}

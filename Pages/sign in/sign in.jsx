import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sign in.css";

const accountStorageKey = "workwiseAccount";

export default function SignInPage({ onSignedIn }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const storedAccount = localStorage.getItem(accountStorageKey);

		if (!storedAccount) {
			setError("No account found. Please sign up first.");
			return;
		}

		const account = JSON.parse(storedAccount);
		const validCredentials = account.username === formData.username.trim()
			&& account.password === formData.password;

		if (!validCredentials) {
			setError("Username or password is incorrect.");
			return;
		}

		localStorage.setItem("workwiseCurrentUser", account.username);
		onSignedIn(account.username);
		navigate("/home");
	};

	return (
		<main className="auth-page">
			<section className="auth-card">
				<p className="eyebrow">Welcome back</p>
				<h1>Sign in</h1>
				<p className="auth-subtitle">Sign in to continue to Workwise.</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label>
						<span>Username</span>
						<input name="username" value={formData.username} onChange={handleChange} required />
					</label>
					<label>
						<span>Password</span>
						<input type="password" name="password" value={formData.password} onChange={handleChange} required />
					</label>
					{error && <p className="auth-error">{error}</p>}
					<button type="submit" className="btn btn--red auth-submit">Sign in</button>
				</form>

				<p className="auth-switch">Don't have an account? <Link to="/sign-up">Sign up</Link></p>
			</section>
		</main>
	);
}

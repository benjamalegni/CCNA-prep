import { navigate } from "astro:transitions/client";
import { useState } from "react";

function handleLanguage(language: string) {
	switch (language) {
		case "en":
			navigate("/ccna/en");
			break;
		case "es":
		default:
			navigate("/ccna");
			break;
	}
}

export default function LanguageSelector() {
	const [language, setLanguage] = useState("es");

	return (
		<>
			<select
				value={language}
				onChange={(e) => setLanguage(e.target.value)}
			>
				<option value="es">Español (Spanish)</option>
				<option value="en">English</option>
			</select>

			<button
				className="button"
				type="button"
				onClick={() => handleLanguage(language)}
			>
				{language === "en" ? "Begin the CCNA learning journey!" : "¡Comenzar el viaje de aprendizaje CCNA!"}
			</button>
		</>
	);
}
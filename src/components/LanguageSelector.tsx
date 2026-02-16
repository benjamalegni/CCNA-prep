import { navigate } from "astro:transitions/client";
import { useState } from "react";

function handleLanguage(language: string){
	switch(language){
		case "es":
			navigate("/ccna");
			break;
		default:
			navigate("/ccna");
			break;
	}
}

export default function LanguageSelector() {

	const [notification, setNotification] = useState(false);

	return (
		<>
			<select
				onMouseEnter={() => setNotification(true)}
				onMouseLeave={() => setNotification(false)}
				onFocus={() => setNotification(true)}
				onBlur={() => setNotification(false)}
			>
				<option value="es">Spanish</option>
			</select>

			<button className="button" type="button" onClick={
				() => handleLanguage("es")
				}>
				Begin the CCNA learning journey!
			</button>

			<div
				className={`notification ${notification ? "notification--visible" : ""}`}
				role="status"
				aria-live="polite"
			>
				<p>ⓘ For now, notes are only available in Spanish.</p>
			</div>
		</>
	);
}
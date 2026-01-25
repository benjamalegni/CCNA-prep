import { navigate } from "astro:transitions/client";

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
	return (
		<>
			<select>
				<option value="es">Spanish</option>
			</select>

			<button className="button" type="button" onClick={() => handleLanguage("es")}>
				Begin the CCNA learning journey!
			</button>
		</>
	);
}
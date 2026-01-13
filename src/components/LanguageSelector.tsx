export default function LanguageSelector() {
	return (
		<>
			<select onChange={(e) => i18n.changeLanguage(e.target.value)}>
				<option value="es">Spanish</option>
				<option value="en">English</option>
				<option value="fi">Finnish</option>
			</select>

            <button className="button" onClick={() => window.location.href = 'index.md'}>
				Begin the CCNA learning journey!
            </button>
		</>
	)
}
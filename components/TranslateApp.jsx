import React, { useState } from "react";

function TranslateApp() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("ta");
  const [translated, setTranslated] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language }),
      });

      const data = await response.json();
      setTranslated(data.translated);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ margin: "50px", fontFamily: "Arial" }}>
      <h2>🌐 Translation App</h2>

      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ta">Tamil</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="kn">Kannada</option>
        <option value="ml">Malayalam</option>
      </select>

      <br /><br />

      <button onClick={handleTranslate}>Translate</button>

      <h3>Translated Text:</h3>
      <p style={{ fontWeight: "bold" }}>{translated}</p>
    </div>
  );
}

export default TranslateApp;
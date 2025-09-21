import React, { useState } from "react";

const endpoint = "https://artisanchatbot-516667857591.asia-south1.run.app/chatbot"

function ArtisanChatbotForm() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, language })
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your query"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ta">Tamil</option>
      </select>
      <button type="submit">Ask</button>
      <div>
        <strong>Chatbot Response:</strong> {response}
      </div>
    </form>
  );
}

export default ArtisanChatbotForm;
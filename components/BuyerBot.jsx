// src/components/BuyerBot.jsx
import React, { useState } from "react";

export default function BuyerBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })) }),
      });
      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "Sorry, something went wrong." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 10, maxWidth: 400 }}>
      <h3>Buyer Chatbot</h3>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{ background: m.sender === "user" ? "#DCF8C6" : "#ECECEC", padding: "5px 10px", borderRadius: 12 }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <input
        disabled={loading}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: "calc(100% - 50px)", padding: 5 }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ width: 40, marginLeft: 10 }}>Send</button>
    </div>
  );
}
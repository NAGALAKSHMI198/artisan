// src/components/ImageGenTool.jsx
import React, { useState } from "react";

export default function ImageGenTool() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      alert("Image generation failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, border: "1px solid #ddd", padding: 10 }}>
      <h3>Generative AI Image Customization</h3>
      <input
        placeholder="Describe your customizations..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button onClick={generateImage} disabled={loading} style={{ width: "100%", padding: 10 }}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Generated" style={{ width: "100%", marginTop: 10, borderRadius: 6 }} />
      )}
    </div>
  );
}
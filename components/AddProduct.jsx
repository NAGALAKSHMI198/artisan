import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddProduct() {
  // Form state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submit
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!auth.currentUser) {
      setMessage("Please log in to add products.");
      return;
    }

    // Basic validation
    if (!title || !description || !price || !imageUrl) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Clear previous messages
    setMessage("");

    try {
      // Add a new product document to Firestore
      await addDoc(collection(db, "products"), {
        artisan_id: auth.currentUser.uid, // Link to logged-in user
        title,
        description,
        price: Number(price),
        images: [imageUrl], // Storing as array for potential multiple images
        createdAt: new Date() // Optional: timestamp
      });

      // Show success message and reset form
      setMessage("Product added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      setMessage("Failed to add product: " + error.message);
    }
  };

  return (
    <form onSubmit={handleAddProduct} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Add New Product</h2>

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Price (INR)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="0"
        step="0.01"
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <button type="submit" style={{ width: "100%", padding: 10 }}>
        Add Product
      </button>

      {message && <p style={{ marginTop: 10, color: message.includes("Failed") ? "red" : "green" }}>{message}</p>}
    </form>
  );
}
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProductList({ artisanId }) {
  // State to store list of products
  const [products, setProducts] = useState([]);

  // State to handle loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch products when artisanId changes
  useEffect(() => {
    if (!artisanId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    async function fetchProducts() {
      try {
        // Create Firestore query to get products for the artisan
        const productsQuery = query(
          collection(db, "products"),
          where("artisan_id", "==", artisanId)
        );

        const querySnapshot = await getDocs(productsQuery);

        // Map Firestore documents to JS objects with id
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productsList); // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false); // Turn off loading indicator
      }
    }

    fetchProducts();
  }, [artisanId]);

  // Render loading state
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Render empty state
  if (!products.length) {
    return <p>No products found for this artisan.</p>;
  }

  // Render product list
  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 10,
            borderRadius: 6
          }}
        >
          <h3>{product.title}</h3>
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover" }}
            />
          )}
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
        </div>
      ))}
    </div>
  );
}
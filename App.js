import React from "react";
import Auth from "./components/Auth";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import BuyerBot from "./components/BuyerBot";
import ImageGenTool from "./components/ImageGenTool";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = React.useState(null);
  const [artisanId, setArtisanId] = React.useState("");

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u);
      setArtisanId(u ? u.uid : "");
    });
    return unsub;
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>Artisan E-Commerce with AI</h1>
      <Auth />
      <hr />

      {user ? (
        <>
          <AddProduct />

          <hr />

          <label>
            View Products by Artisan ID:
            <input
              value={artisanId}
              onChange={e => setArtisanId(e.target.value)}
              style={{ marginLeft: 10, padding: 5, width: 300 }}
            />
          </label>

          <ProductList artisanId={artisanId} />

          <hr />

          <BuyerBot />

          <hr />

          <ImageGenTool />
        </>
      ) : (
        <p>Please login to access your dashboard and AI tools.</p>
      )}
    </div>
  );
}

export default App;
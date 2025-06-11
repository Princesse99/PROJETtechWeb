import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./components/ProductPrincipale";
import Products from "./components/Product";
import CommandePage from "./components/CommandePage";
import CartPage from "./components/CartPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/produit" element={<Product/>} />
          <Route path="/" element={< Products/>}/>
          <Route path="/commande/:id" element={<CommandePage />} />
          <Route path="/page" element={< CartPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

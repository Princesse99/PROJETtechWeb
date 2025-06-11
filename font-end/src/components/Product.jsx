import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PromoBanner from './PromoBanner';
import ProductCard from './ProductCard';

import Header from "./Header";
import Footer from "./Footer";


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
    
    <Header />
      {/* Promo Banner */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <PromoBanner />
      </div>
      
      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white p-4 rounded-lg shadow h-60"></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{`Erreur: ${error}`}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((produit) => (
              <ProductCard key={produit.Id_pro} produit={produit} />
            ))}
          </div>
        )}
      </section>

          <Footer />
    </div>
  );
}

export default Products;

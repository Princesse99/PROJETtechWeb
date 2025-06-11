import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();

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

  const handleGenerateFaker = async (fixed) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/products/faker', { fixed });
      await fetchProducts();
      setVisibleCount(4); // reset visible count after generation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        await fetchProducts();
        setVisibleCount(4);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < products.length) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, visibleCount, products.length]
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            🏷️ Boutique de Chaussures
          </h1>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={() => handleGenerateFaker(true)}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Générer produits fixes
            </button>
            <button
              onClick={() => handleGenerateFaker(false)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Générer produits aléatoires
            </button>
          </div>
        </div>

        {loading && <p className="text-center text-lg">Chargement...</p>}
        {error && <p className="text-center text-red-500">Erreur : {error}</p>}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleCount).map((produit, index) => {
            const isLast = index === visibleCount - 1;
            return (
              <div
                key={produit.Id_pro}
                ref={isLast ? lastProductRef : null}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={produit.Image}
                  alt={produit.Nom_pro}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{produit.Marque}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {produit.Description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-black">
                      ${produit.Prix}
                    </span>
                    <button
                      onClick={() => handleDelete(produit.Id_pro)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Product;

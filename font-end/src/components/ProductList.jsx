import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import CommandeFormModal from './CommandeFormModal';

const ProductList = () => {
  const [produits, setProduits] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState(null);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => setProduits(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCommander = (commande) => {
    console.log("Commande envoyée :", commande);
    alert(`Commande envoyée pour ${commande.quantite}x ${commande.Marque}`);
    setSelectedProduit(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nos Produits</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produits.length > 0 ? (
          produits.map((prod) => (
            <ProductCard
              key={prod.Id_pro}
              produit={prod}
              onClick={(produit) => {
                console.log("Produit sélectionné :", produit);
                setSelectedProduit(produit);
              }}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">Aucun produit disponible pour le moment.</p>
        )}
      </div>

      {selectedProduit && (
        <CommandeFormModal
          produit={selectedProduit}
          onClose={() => setSelectedProduit(null)}
          onSubmit={handleCommander}
        />
      )}
    </div>
  );
};

export default ProductList;

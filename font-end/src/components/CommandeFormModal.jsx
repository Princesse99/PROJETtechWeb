import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CommandeFormModal = ({ produit, onSubmit }) => {
  const [quantite, setQuantite] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!produit || !produit.Id_pro) {
      alert("Erreur: ID produit manquant pour la commande.");
      return;
    }
    onSubmit({
      produitId: produit.Id_pro,
      quantite,
    });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.1 } },
  };

  const buttonHoverTap = {
    whileHover: { scale: 1.05, backgroundColor: "#374151", color: "#FFF" },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const quantityButtonHoverTap = {
    whileHover: { scale: 1.1, backgroundColor: "#D1D5DB" },
    whileTap: { scale: 0.9, backgroundColor: "#E5E7EB" },
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  return (
    <motion.div
      className="dark:bg-gray-900"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit} className="space-y-6 border-t border-gray-300 dark:border-gray-700 pt-6" style={{ width: '100%', maxWidth: '350px' }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantité
          </label>
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => setQuantite(Math.max(1, quantite - 1))}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-lg font-bold text-gray-800 dark:text-gray-200"
              {...quantityButtonHoverTap}
            >
              <FaMinus size={12} />
            </motion.button>
            <motion.input
              type="number"
              min="1"
              value={quantite}
              onChange={(e) => setQuantite(parseInt(e.target.value) || 1)}
              className="w-16 text-center border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none" // `appearance-none` to remove default number input arrows
              key={quantite}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.button
              type="button"
              onClick={() => setQuantite(quantite + 1)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-lg font-bold text-gray-800 dark:text-gray-200"
              {...quantityButtonHoverTap}
            >
              <FaPlus size={12} />
            </motion.button>
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full h-[50px] bg-black dark:bg-white text-white dark:text-black py-2 rounded-[10px] shadow-md"
          {...buttonHoverTap}
        >
          Add to Cart
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CommandeFormModal;
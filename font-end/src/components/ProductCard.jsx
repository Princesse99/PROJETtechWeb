import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const ProductCard = ({ produit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/commande/${produit.Id_pro}`);
  };

  const imageUrl = produit.Image?.startsWith('http')
    ? produit.Image
    : `${process.env.PUBLIC_URL}/${produit.Image}`;

  const prixAffiche = produit.Variantes?.[0]?.Prix || produit.Prix;

  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 }, 
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring", 
        stiffness: 100, 
        damping: 12,    
      }
    },
    hover: {
      scale: 1.05, 
      y: -5,       
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", 
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      }
    },
    tap: {
      scale: 0.98, 
      y: 0,        
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)", 
    }
  };

  return (
    <motion.div
      className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
      variants={cardVariants}  
      initial="hidden"        
      animate="visible"       
      whileHover="hover"      
      whileTap="tap"         
    >
   
      <img
        src={imageUrl}
        alt={produit.Marque}
        className="w-full h-[200px] object-cover bg-[#EAEEEF]"
        onClick={handleClick}
      />
      <div className="p-4">
        <p className="text-lg text-gray-900 dark:text-white font-bold">{produit.Marque}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{produit.Description}</p>
        <p className="text-sm font-bold text-black dark:text-white mt-1">${prixAffiche}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
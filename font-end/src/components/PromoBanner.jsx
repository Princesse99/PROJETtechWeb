import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const PromoBanner = () => {
  const navigate = useNavigate();

  
  const promoProductId = '651a2b3c4d5e6f7g8h9i0j1k'; 

  const handleShopNow = () => {
  
    navigate(`/commande/${promoProductId}`);
  };

  
  const bannerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
        delayChildren: 0.2,    
      },
    },
  };

 
  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, 
    visible: {
      opacity: 1,
      y: 0, 
      transition: {
        type: "spring", 
        stiffness: 100,
        damping: 12,
      },
    },
  };

  
  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.3, 
      },
    },
    float: { 
      y: [0, -10, 0], 
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        delay: 1, 
      }
    }
  };

  return (
    <div className="flex justify-center px-4">
      <motion.div
        className="relative flex flex-col-reverse md:flex-row-reverse items-center w-full max-w-6xl bg-[#EAEEEF] dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        variants={bannerContainerVariants} 
        initial="hidden"                   
        animate="visible"                  
      >
        <motion.img
          src={`${process.env.PUBLIC_URL}/images/image1.png`}
          alt="Promo"
          className="w-72 md:w-80 lg:w-96 rounded-lg object-cover"
          variants={imageVariants} 
          animate={["visible", "float"]} 
        />

        <div className="flex-1 md:pr-8 mt-8 md:mt-0 text-center md:text-left">
          <motion.p
            className="text-[#EC5E2A] font-bold text-4xl lg:text-5xl tracking-tight font-dmSans"
            variants={itemVariants} 
          >
            25% OFF
          </motion.p>
          <motion.h2
            className="font-dmSans font-bold text-5xl lg:text-6xl leading-tight mt-2"
            variants={itemVariants} 
          >
            Summer Sale
          </motion.h2>
          <motion.p
            className="font-inter text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-2"
            variants={itemVariants} 
          >
            Découvrez nos styles d'été avec des réductions
          </motion.p>
          <motion.div
            className="mt-6"
            variants={itemVariants} 
          >
            <motion.button
              onClick={handleShopNow}
              className="bg-black text-white w-48 lg:w-64 h-14 rounded-lg flex items-center justify-center mx-auto md:mx-0"
              whileHover={{ scale: 1.05, backgroundColor: "#374151" }} 
              whileTap={{ scale: 0.95 }}                               
              transition={{ type: "spring", stiffness: 400, damping: 10 }} 
            >
              Shop Now <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromoBanner;
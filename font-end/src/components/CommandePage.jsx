import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommandeFormModal from "./CommandeFormModal";
import Header from "./Header";
import Footer from "./Footer";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const CommandePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

useEffect(() => {
  fetch(`http://localhost:5000/api/products/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Produit non trouvé");
      return res.json();
    })
    .then((data) => {
      setProduit(data);
      setLoading(false);
      setCurrentImageIndex(0);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [id]);

  const handleSubmit = (commandeData) => {
    if (!produit) {
      alert("Erreur: Impossible de passer la commande, produit non chargé.");
      return;
    }

    const prixUnitaire = produit.Variantes?.[0]?.Prix || produit.Prix;
    const total = prixUnitaire * commandeData.quantite;

    const commande = {
      Id_pro: commandeData.produitId,
      quantite: commandeData.quantite,
      prixUnitaire,
      total,
    };

    console.log("Commande envoyée:", commande);

    fetch("http://localhost:5000/api/commandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commande),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(errData => { throw new Error(errData.error || "Erreur lors de l'envoi de la commande"); });
        }
        return res.json();
      })
      .then((data) => {
        alert("Commande ajoutée avec succès !");
        navigate('/page');
      })
      .catch((err) => {
        console.error("Erreur détaillée lors de l'ajout de la commande:", err);
        alert(`Erreur lors de l'ajout de la commande: ${err.message}`);
      });
  };

  
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (produit.Images ? produit.Images.length - 1 : 0) : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (produit.Images ? produit.Images.length - 1 : 0) ? 0 : prevIndex + 1
    );
  };

  const getCurrentImageUrl = () => {
    if (!produit || !produit.Images || produit.Images.length === 0) {
   
      return produit.Image?.startsWith("http")
        ? produit.Image
        : `${process.env.PUBLIC_URL}/${produit.Image}`;
    }
    const imageUrl = produit.Images[currentImageIndex];
    return imageUrl.startsWith("http")
      ? imageUrl
      : `${process.env.PUBLIC_URL}/${imageUrl}`;
  };
 

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      {loading ? (
        <p className="text-center mt-10 text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <main className="py-10 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      
            <div className="relative flex justify-center w-full"> 
              <img
                src={getCurrentImageUrl()} 
                alt={produit.Marque}
                className="w-[546px] h-[375px] rounded-[20px] shadow-2xl object-cover"
              />
              {produit.Images && produit.Images.length > 1 && ( 
                <>
                 
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={20} />
                  </button>

                 
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={20} />
                  </button>

                 
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {produit.Images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentImageIndex === index ? 'bg-black dark:bg-white' : 'bg-gray-400 dark:bg-gray-600'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

           
            <div
              className="w-[398px] h-[400px] bg-white dark:bg-gray-900 rounded-[20px] shadow-2xl px-6 py-4 flex flex-col justify-between space-y-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-2 mt-8">
                <h1 className="text-xl font-extrabold">{produit.Marque}</h1>
                <p className="text-sm leading-relaxed">{produit.Description}</p>
                <p className="text-lg font-semibold mt-4">
                  ${produit.Variantes?.[0]?.Prix || produit.Prix}
                </p>
              </div>
              {produit && <CommandeFormModal produit={produit} onSubmit={handleSubmit} />}
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
                Description détaillée
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Energize your look with a fresh take on heritage adidas style.
                The adidas Daily 3.0 Shoes cut a classic profile with a modern
                suede upper. Your walk across campus or commute across town has
                never looked or felt this good.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Regular fit</li>
                <li>Lace closure</li>
                <li>Rubber outsole with vulcanized look</li>
                <li>Imported</li>
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <div className="-ml-5">
                <img
                  src="/images/prom.png"
                  alt="Vue secondaire"
                  className="w-[500px] h-[280px] object-contain -ml-16"
                />
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default CommandePage;
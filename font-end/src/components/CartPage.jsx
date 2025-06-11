import React, { useState, useEffect, useCallback } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize fetchOrders to avoid re-creating it on every render,
  // which could cause useEffect to re-run unnecessarily.
  const fetchOrders = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Clear any previous errors
    try {
      const response = await fetch("http://localhost:5000/api/commandes");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const transformedCart = data.map((order) => ({
        id: order.commandeId,
        Id_pro: order.Id_pro,
        marque: order.Marque,
        description: order.Description,
        prix: parseFloat(order.prixUnitaire),
        image: order.Image.startsWith("http")
          ? order.Image
          : `${process.env.PUBLIC_URL}/${order.Image}`,
        quantite: parseInt(order.quantite, 10),
      }));

      setCart(transformedCart);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Re-run effect if fetchOrders changes (it won't with useCallback)

  const handleQuantityChange = async (id, delta) => {
    // Optimistic update
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantite: Math.max(1, item.quantite + delta) }
          : item
      )
    );

    // TODO: Implement a backend update for quantity if needed
    // Currently, this only updates the frontend state.
    // If you want to persist quantity changes, you'll need to make an API call here.
  };

  const handleRemove = async (id) => {
    // Optimistic update: remove from UI immediately
    setCart((prev) => prev.filter((item) => item.id !== id));

    try {
      const response = await fetch(
        `http://localhost:5000/api/commandes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // If deletion fails, revert the UI change and show an error
        console.error("Failed to delete order on backend.");
        // You might want to re-fetch or add the item back to the cart state here
        fetchOrders(); // Re-fetch to synchronize with backend
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      // If network error, revert the UI change
      fetchOrders(); // Re-fetch to synchronize with backend
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert(
        "Votre panier est vide. Veuillez ajouter des articles avant de passer à la caisse."
      );
      return;
    }

    // Prepare an array of promises for deleting each item from the backend
    const deletePromises = cart.map((item) =>
      fetch(`http://localhost:5000/api/commandes/${item.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Failed to delete item ${item.id} on backend.`);
            // You might want to handle this more robustly, e.g.,
            // by collecting failed deletions and reporting them.
            return Promise.reject(new Error(`Failed to delete item ${item.id}`));
          }
          return response.json();
        })
        .catch((err) => {
          console.error(`Error deleting item ${item.id}:`, err);
          return Promise.reject(err); // Re-throw to indicate failure
        })
    );

    try {
      // Wait for all delete operations to complete
      await Promise.allSettled(deletePromises); // use allSettled to proceed even if some fail

      console.log("Proceeding to checkout with cart:", cart);
      console.log("Total amount:", total.toFixed(2));

      // After successful "checkout" (which means deleting items from backend),
      // clear the cart locally and then re-fetch from the database.
      setCart([]); // Clear local cart immediately for better UX
      alert("Commande terminée !");

      // Re-fetch orders to pick up any *new* orders that might have come in
      // from other sources *after* the checkout and before the re-fetch.
      fetchOrders();
    } catch (err) {
      // This catch block will only execute if `Promise.all` was used and any promise rejected.
      // With `Promise.allSettled`, this block might not be hit in the same way,
      // so individual error logging for each deletePromise is more effective.
      console.error("Error during checkout process:", err);
      alert("An error occurred during checkout. Some items might not have been removed.");
      fetchOrders(); // Re-fetch to reconcile state
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.prix * item.quantite,
    0
  );
  const shipping = 20;
  const tax = 6;
  const discount = 6;
  const total = subtotal + shipping + tax - discount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemCardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const summaryCardVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.95 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-xl text-gray-700"
        >
          Loading your bag...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-xl text-red-600"
        >
          {error}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header cartCount={cart.length} />

      <motion.div
        className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.h2
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Your Bag
            </motion.h2>
            <div className="space-y-6">
              {cart.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-600 text-lg"
                >
                  Your bag is empty. Start shopping!
                </motion.p>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-start justify-between pb-6 border-b border-gray-200"
                      variants={itemCardVariants}
                      layout
                    >
                      <div className="flex items-start gap-6">
                        <img
                          src={item.image}
                          alt={item.marque}
                          className="w-28 h-28 rounded-md object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-xl text-gray-800">
                            {item.marque}
                          </h4>
                          <p className="text-gray-500 text-base mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <span className="font-semibold text-lg text-gray-800">
                          ${item.prix.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-1 py-1">
                          <motion.button
                            className="text-gray-600 p-1"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            whileHover={{ scale: 1.15, color: "#000" }}
                            whileTap={{
                              scale: 0.9,
                              backgroundColor: "#E5E7EB",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <FaMinus size={12} />
                          </motion.button>
                          <motion.span
                            className="px-2 font-medium text-lg"
                            key={item.quantite}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.quantite}
                          </motion.span>
                          <motion.button
                            className="text-gray-600 p-1"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            whileHover={{ scale: 1.15, color: "#000" }}
                            whileTap={{
                              scale: 0.9,
                              backgroundColor: "#E5E7EB",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <FaPlus size={12} />
                          </motion.button>
                        </div>

                        <motion.button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-500 text-sm hover:underline -mr-1 mt-2"
                          whileHover={{ color: "#DC2626", scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Summary */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-fit"
            variants={summaryCardVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-semibold mb-6">Summary</h3>
            <div className="space-y-4 text-base text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping and delivery</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span className="font-medium">- ${discount.toFixed(2)}</span>
              </div>
              <hr className="my-4 border-gray-200" />
              <div className="flex justify-between font-bold text-xl text-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              onClick={handleCheckout}
              className="mt-8 w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition duration-300 text-lg"
              whileHover={{ scale: 1.03, backgroundColor: "#374151" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Checkout →
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default CartPage;
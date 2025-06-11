const db = require('../config/db');
const { faker } = require('@faker-js/faker');

// GET /api/products
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM produit', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET /api/products/:id
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM produit WHERE Id_pro = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(results[0]);
  });
};

// POST /api/products/faker
exports.generateFakeProducts = (req, res) => {
  const { fixed } = req.body;

  if (fixed) {
    const productsData = [
      { image: 'images/image2.png', marque: 'Off-White', description: 'Out Of Office "Ooo" sneakers' },
      { image: 'images/image3.png', marque: 'Nike', description: 'Nike Air Force Premium' },
      { image: 'images/image4.png', marque: 'Nike', description: 'Nike Air Force Premium' },
      { image: 'images/image5.png', marque: 'adidas', description: 'DAILY 3.0 SHOES' },
    ];

    const produit = productsData.map(({ image, marque, description }) => [
      marque,
      description,
      faker.commerce.price(50, 800, 2),
      image,
      faker.company.name(),
    ]);

    db.query(
      'INSERT INTO produit (Marque, Description, Prix, Image, brand) VALUES ?',
      [produit],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Produits fixes générés avec succès' });
      }
    );
  } else {
    const randomImages = [
      'https://source.unsplash.com/featured/?shoes',
      'https://source.unsplash.com/featured/?sneakers',
      'https://source.unsplash.com/featured/?sports',
      'https://source.unsplash.com/featured/?footwear',
    ];

    const shoeBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 'New Balance', 'Vans', 'Under Armour'];

    const produit = Array.from({ length: 4 }, () => [
      shoeBrands[Math.floor(Math.random() * shoeBrands.length)],
      faker.commerce.productDescription(),
      faker.commerce.price(50, 800, 2),
      randomImages[Math.floor(Math.random() * randomImages.length)],
      faker.company.name(),
    ]);

    db.query(
      'INSERT INTO produit (Marque, Description, Prix, Image, brand) VALUES ?',
      [produit],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Produits aléatoires générés avec succès' });
      }
    );
  }
};

// DELETE /api/products/:id
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM produit WHERE Id_pro = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  });
};



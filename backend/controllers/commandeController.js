const db = require('../config/db');

exports.createCommande = (req, res) => {
  const { Id_pro, quantite, prixUnitaire, total } = req.body;

  if (!Id_pro || !quantite || !prixUnitaire || !total) {
    return res.status(400).json({ error: 'Champs requis manquants.' });
  }

  db.query(
    'INSERT INTO commande (Id_pro, quantite, prixUnitaire, total) VALUES (?, ?, ?, ?)',
    [Id_pro, quantite, prixUnitaire, total],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Commande créée avec succès.', commandeId: result.insertId });
    }
  );
};
exports.getAllCommandes = (req, res) => {
   
    const query = `
        SELECT 
            c.id AS commandeId, 
            c.Id_pro, 
            c.quantite, 
            c.prixUnitaire, 
            c.total,
            p.Marque,
            p.Description,
            p.Image
        FROM 
            commande c
        JOIN 
            produit p ON c.Id_pro = p.Id_pro;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching commandes:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};
// Delete an order
exports.deleteCommande = (req, res) => {
    const { id } = req.params; // This 'id' refers to the commandeId

    db.query('DELETE FROM commande WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error deleting commande:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Commande non trouvée.' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès.' });
    });
};

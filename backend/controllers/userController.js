const db = require('../config/db');
const { faker } = require('@faker-js/faker');

// GET /api/users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST /api/users/faker
exports.generateFakeUsers = (req, res) => {
  const users = Array.from({ length: 10 }).map(() => [
    faker.name.lastName(),
    faker.name.firstName(),
  ]);

  db.query('INSERT INTO users (nom, prenom) VALUES ?', [users], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateurs générés avec succès' });
  });
};

// DELETE /api/users/:id
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
};

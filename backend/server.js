const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const setupSwagger = require('./swagger');
const commandeRoutes = require('./routes/commandeRoutes');
const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use('/api/commandes', commandeRoutes);

// Intégration Swagger
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

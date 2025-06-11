code source sur github:https://github.com/Princesse99/PROJETtechWeb.git
Documentation API Swagger accessible via une URL:http://localhost:5000/api-docs
Instructions d'installation et de déploiement en fichier README.md:

# Mon Projet Complet (ReactJS, NodeJS, Express, Swagger, Tailwind CSS)

Ce dépôt contient le code source complet de mon application web, développée avec un frontend en ReactJS et un backend en NodeJS avec Express. L'API est documentée avec Swagger et le style du frontend est géré par Tailwind CSS.

## Technologies Utilisées

* **Frontend:** ReactJS, Tailwind CSS
* **Backend:** NodeJS, Express
* **Base de Données:** MySQL (via XAMPP)
* **Documentation API:** Swagger
* **Gestion de Paquets:** npm (ou Yarn)

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

* Node.js 
* npm
* XAMPP 

## Installation Locale

Suivez ces étapes pour installer et exécuter le projet sur votre machine locale.

### 1. Cloner le Dépôt

```bash
git clone <URL_DE_VOTRE_DEPOT>
cd mon-projet

##Configuration du Backend
cd backend
npm install
# backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=venteenligne
PORT=5000
Démarrez le serveur backend:  node server.js

##Configuration du Frontend
cd ../font-end
npm install

/* frontend/src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
Démarrez l'application frontend:npm start

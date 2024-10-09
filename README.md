# Gestion Recettes API

Cette API permet de gérer des recettes et des catégories, en allant de leur création, lecture, mise à jour et suppression.

## Prérequis

- Node.js (version 14 ou supérieure)
- MySQL (ou un autre système de gestion de base de données compatible)
- Postman (pour tester l'API)
- Docker (v.4.30 ou supérieure)

## Installation

1. **Clonez le dépôt** :

```bash
    git clone https://github.com/medbankole97/Geston-recette-backend.git
```

2.  **Acceder au dossier du projet**

```bash
  cd gestion-recette-backEnd
```

3. **Installez les dépendances**

```bash
   npm install
```

4. **Utilisation**

- Importez la base de données qui se trouve dans la racine du projet sous le nom de : `script.sql`;

- Remplacer  vos informations de connexion à MySQL dans **.env.sample** en le renommant `.env` ;
- Pour démarrer le projet:

```bash
   npm start
```

- Importer la collection (postman_collection.json) dans postman pour effectuer des tests;

## Endpoints API

### Endpoints Recettes

**Récupérer toutes les recettes**

- URL : /recipes
- Méthode : GET
- Réponse: Liste de toutes les recettes;

**Récupérer une recette**

- URL : /recipes/:id
- Méthode : GET
- Réponse: Détails d'une recette;

**Créer une nouvelle recette**

- URL : /recipes
- Méthode : POST

```
{
    "titre": "Nouvelle Recette",
    "ingredients": "Ingrédients de la recette",
    "type": "Plat principal"
    "categorie_id": 1
}
```

- Réponse: `"Added successfully"`;

  **Mettre à jour une recette**

- URL : /recipes/:id
- Méthode : PUT

```
{
   "titre": "Recette Modifiée",
   "ingredients": "Ingrédients de la recette modifiée",
   "type": "type modifiée",
   "categorie_id": 1
  }
```

- Réponse: `"Updated successfully"`

  **Supprimer une recette**

- URL : /recipes/:id
- Méthode : DELETE
- Réponse: `"Deleted successfully"`

### Endpoints Catégories

**Récupérer toutes les categories**

- URL : /categories
- Méthode : GET
- Réponse: Liste de toutes les categories;

**Récupérer une catégorie**

- URL : /categories/:id
- Méthode : GET
- Réponse: Détails d'une catégorie;

**Créer une nouvelle categorie**

- URL : /categories
- Méthode : POST

```
{
    "nom": "Nouvelle categorie"
}
```

- Réponse: `"Added successfully"`;

  **Mettre à jour une categorie**

- URL : /categories/:id
- Méthode : PUT

```
{
   "nom": "categorie Modifiée"
  }
```

- Réponse: `"Updated successfully"`

  **Supprimer une categorie**

- URL : /categories/:id
- Méthode : DELETE
- Réponse: `"Deleted successfully"`

### Tests unitaires

```bash
npm test
```

### Eslint : corriger le code

```bash
npm run lint
```
```bash
npm run lint:fix
```

### Prettier :formater le code

```bash
npm run format
```

- Importez la collection dans Postman pour communiquez via l'URL:
  [postman_collection.json](postman_collection.json)

## Auteur
[Mohamed Bankolé](https://github.com/medbankole97)

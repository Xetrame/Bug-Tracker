# Bug-Tracker

Rendu TP Bug tracker

## 1. Lancer l'API

```bash
docker run -d --name bugtracker-api -p 8080:80 nicolascauchois/fisa3-techno-web-api-tp:1.0.0
```

La documentation de l'API est disponible sur http://localhost:8080/api/docs.

> L'API recharge 250 tickets de démonstration à chaque démarrage du conteneur.

## 2. Installer et lancer l'application

```bash
npm install
npm run dev
```

L'application est disponible sur http://localhost:5173.

```
VITE_API_URL="http://localhost:8080/api"
```

## Docker (bonus)

### Tout lancer avec Docker Compose

```bash
docker compose up -d --build
```

- Application : http://localhost:8081
- API : http://localhost:8080/api

### Construire uniquement l'image de l'application

```bash
docker build -t bugtracker-front .
docker run -d --name bugtracker-front -p 8081:80 bugtracker-front
```

Pour utiliser une autre URL d'API :

```bash
docker build --build-arg VITE_API_URL=http://mon-serveur/api -t bugtracker-front .
```

## Structure du projet

```
src/
├── main.js                 Point d'entrée (Vue, routeur, Bootstrap)
├── App.vue                 Composant racine (en-tête + RouterView)
├── router/index.js         Routes : dashboard, création, détail
├── constants/ticket.js     Statuts et priorités (libellés, couleurs)
├── dto/
│   ├── TicketDTO.js        Modèle d'un ticket
│   └── CollectionDTO.js    Modèle d'une collection paginée
├── services/
│   └── ticketService.js    Appels à l'API (GET, POST, PATCH, DELETE)
├── components/
│   ├── AppHeader.vue       Barre de navigation
│   ├── FilterBar.vue       Filtres de recherche
│   ├── PaginationBar.vue   Pagination
│   ├── TicketCard.vue      Carte d'un ticket dans la liste
│   ├── TicketForm.vue      Formulaire de création
│   └── TicketUpdateForm.vue Formulaire de modification (statut, priorité)
└── views/
    ├── DashboardView.vue   Liste des tickets
    ├── TicketCreateView.vue Création d'un ticket
    └── TicketDetailView.vue Détail, modification et suppression
```
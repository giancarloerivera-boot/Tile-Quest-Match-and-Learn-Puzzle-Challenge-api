# Tile-Quest-Match-and-Learn-Puzzle-Challenge API

Backend API for **Tile-Quest-Match-and-Learn-Puzzle-Challenge**, a tournament game for the SorSU Bulan Campus library.
CS 313 Software Engineering 1, A.Y. 2026-2027.

- Developer: Gian Carlo D. Erivera (giancarloerivera-boot), BSCS 3-1
- Group and game concept: Group 4

This is my own build of my group's game concept. Every commit in this repository was made by me, with Git, on my own computer or in my own Codespace.

## Tech stack

| Layer | Tool |
|---|---|
| Runtime | Node.js 22 LTS or newer |
| Web framework | Express 5 |
| Database | PostgreSQL 16 or newer |
| ORM and migrations | Sequelize 6 with sequelize-cli |

## Setup

```
git clone https://github.com/giancarloerivera-boot/Tile-Quest-Match-and-Learn-Puzzle-Challenge-api.git
cd Tile-Quest-Match-and-Learn-Puzzle-Challenge-api
npm install
```

Copy `.env.example` to `.env`, then put your own PostgreSQL password in `DB_PASSWORD`.

```
npm run db:create     (first time only)
npm run db:migrate
npm run db:seed
npm run db:check
npm run dev
```

## Environment variables

| Key | Example | Purpose |
|---|---|---|
| NODE_ENV | development | Which config block to use |
| PORT | 3001 | Port the API listens on (the library assigns the final port at deployment) |
| DB_HOST | 127.0.0.1 | PostgreSQL host |
| DB_PORT | 5432 | PostgreSQL port |
| DB_NAME | your_game_slug | Database name: your game slug, with underscores |
| DB_USER | postgres | Database user |
| DB_PASSWORD | (your own) | Database password. Never commit this. |
| HUB_API_KEY | dev-hub-key | Key the Library Game Hub sends to read results. The library gives the real one at deployment. |

## Endpoints (Hub Contract v1.2)

Base URL: `http://localhost:3001/api/v1`

| Method | Path | Purpose | Success |
|---|---|---|---|
| GET | /health | Is the API up and can it reach the database? | 200 (503 when the database is down) |
| GET | /game-info | Slug, name, group, developer, description, player limits, version | 200 |
| GET | /results | Finished games, every player, and the top 3. Needs the `X-Hub-Key` header. Optional `?since=` | 200 (401 without the key) |

## What "completed" means in my game

A player completed the game when they answered every question, even if some answers were wrong or timed out.  

## Tables

| Table | What it stores |
|---|---|
| `admin` | Administrator accounts (username, password hash, role) |
| `player` | Player accounts with total score, current level and lives |
| `level` | Game levels with difficulty, tile count and time limit |
| `puzzle` | One puzzle per level with the number of required pairs |
| `question` | Quiz questions and answers for each level |
| `game_progress` | Each player's score and completion per level |
| `users` | School accounts with school ID, email and role |
| `game_session` | A game with its six-digit join code, start and end times |
| `seat` | A player's seat in a game session with nickname, score and completed |

## Database scripts

| Command | What it does |
|---|---|
| npm run db:migrate | Runs migrations that have not run yet |
| npm run db:migrate:status | Lists every migration as up or down |
| npm run db:seed | Loads the seed data |
| npm run db:check | Counts the rows in every table |
| npm run db:reset | Empties the database, rebuilds every table and reloads the seed data |
| npm run check | Runs the same automatic check that GitHub runs after every push |

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
| Validation | express-validator |
| Logging | morgan |

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

The API listens on `http://localhost:3001/api/v1`. Open `/health` to check that it is up.

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

## Who is calling

This build has no login screen. A caller names a school account in the `X-Demo-User` header (the account's `school_id`). The API looks that account up in the `users` table and uses its role (`HOST`, `PLAYER` or `ADMIN`). The Library Game Hub uses the `X-Hub-Key` header instead.

| Header | Value | Used by |
|---|---|---|
| X-Demo-User | a `school_id` from the `users` table | hosts and players |
| X-Hub-Key | the value of `HUB_API_KEY` | the Library Game Hub |

The seed data adds four test accounts:

| school_id | Role |
|---|---|
| 2099-0001 | HOST |
| 2099-0002 | PLAYER |
| 2099-0003 | HOST (a second host, for the "not the owner" cases) |
| 2099-0004 | PLAYER (a second player, for the nickname cases) |

## Endpoints (Hub Contract v1.2)

Base URL: `http://localhost:3001/api/v1`

| Method | Path | Purpose | Who may call it | Success |
|---|---|---|---|---|
| GET | /health | Is the API up and can it reach the database? | anyone | 200 (503 when the database is down) |
| GET | /game-info | Slug, name, group, developer, description, player limits, version | anyone | 200 |
| GET | /results | Finished games, every player, and the top 3. Needs the `X-Hub-Key` header. Optional `?since=` | the Hub | 200 (401 without the key, 400 for a wrong `?since=`) |
| GET | /levels | List levels. A host sees their own, an admin sees all | HOST, ADMIN | 200 |
| POST | /levels | Create a level. The caller becomes its owner | HOST, ADMIN | 201 |
| GET | /levels/:id | Read one level | its owner, or ADMIN | 200 |
| PATCH | /levels/:id | Change one or more fields of a level | its owner, or ADMIN | 200 |
| DELETE | /levels/:id | Delete a level that no game uses | its owner, or ADMIN | 204 (409 if a game uses it) |
| POST | /sessions | Start a game. The server makes the six-digit join code | HOST, ADMIN | 201 |
| GET | /sessions/:code | Read a game by its join code | any known account | 200 |
| PATCH | /sessions/:code | Close a game | the host of that game, or ADMIN | 200 (409 if already closed) |
| POST | /sessions/:code/players | Join a game. Joining again returns the same seat | any known account | 201 the first time, 200 when rejoining |

## Errors

Every error uses one shape, with a code and a message. A response never shows a stack trace or SQL.

```json
{ "error": { "code": "VALIDATION_FAILED", "message": "..." } }
```

| Status | When | Example codes |
|---|---|---|
| 400 | A body field or a URL value breaks a rule. The message names the field | VALIDATION_FAILED |
| 401 | No caller, or an unknown caller. The Hub key is missing or wrong | AUTH_REQUIRED, HUB_KEY_REQUIRED |
| 403 | The caller's role is not allowed, or the row belongs to another host | FORBIDDEN |
| 404 | The level or the game does not exist | LEVEL_NOT_FOUND, SESSION_NOT_FOUND |
| 409 | The request conflicts with the current state | SESSION_ENDED, SESSION_FULL, NICKNAME_TAKEN, LEVEL_IN_USE |

## Rules of my game

- A host owns the levels they create. Another host cannot read, change or delete them (403).
- A player can join a game and cannot start one (403).
- A game has two states: OPEN and CLOSED. A closed game cannot be changed again and does not accept new players (409).
- A game has a limit of players (`max_players`, 2 to 100, default 30). A full game answers 409.
- A nickname is unique inside one game. A second player with the same nickname gets 409.
- One account has one seat per game. Joining again returns the same seat with 200, with the same score.
- A level that a game uses cannot be deleted (409).

## What "completed" means in my game

A player completed the game when they answered every question, even if some answers were wrong or timed out.  

## Tables

| Table | What it stores |
|---|---|
| `admin` | Administrator accounts (username, password hash, role) |
| `player` | Player accounts with total score, current level and lives |
| `level` | Game levels with difficulty, tile count, time limit and the host who owns it |
| `puzzle` | One puzzle per level with the number of required pairs |
| `question` | Quiz questions and answers for each level |
| `game_progress` | Each player's score and completion per level |
| `users` | School accounts with school ID, email and role |
| `game_session` | A game with its six-digit join code, host, level, player limit, status, start and end times |
| `seat` | A player's seat in a game session with nickname, score and completed |

## Testing with Postman

The collection is in the `postman` folder: **Tile Quest API - Week 11**, with 28 requests.

1. Start the API with `npm run dev`.
2. In Postman, click **Import** and choose the collection file from the `postman` folder.
3. Open the collection, then **Run collection**, then **Run**. Every test must pass.

The collection holds its variables (`baseUrl`, `host`, `otherHost`, `player`, `player2`). Each case checks the status code. Cases 1 to 13 cover the levels, cases 14 to 28 cover sessions and players.

## Database scripts

| Command | What it does |
|---|---|
| npm run db:migrate | Runs migrations that have not run yet |
| npm run db:migrate:status | Lists every migration as up or down |
| npm run db:seed | Loads the seed data |
| npm run db:check | Counts the rows in every table |
| npm run db:reset | Empties the database, rebuilds every table and reloads the seed data |
| npm run check | Runs the same automatic check that GitHub runs after every push |

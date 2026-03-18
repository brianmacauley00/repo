# Smart Todos

A task manager with both a CLI and web interface. Tasks persist to `tasks.json`.

## Structure

- `tasks.js` — CLI interface
- `server.js` — Express web server (API + static files)
- `public/index.html` — Web frontend
- `tasks.json` — Task data (auto-created)

## Running

**Web:**
```bash
node server.js
# Open http://localhost:3000
```

**CLI:**
```bash
node tasks.js add "My task"
node tasks.js list
node tasks.js done <id>
node tasks.js delete <id>
```

## API

- `GET /api/tasks` — list all tasks
- `POST /api/tasks` — add task `{ text }`
- `PATCH /api/tasks/:id/done` — toggle done
- `DELETE /api/tasks/:id` — delete task

## Tech Stack

- Node.js (ESM)
- Express 5
- Vanilla HTML/CSS/JS frontend

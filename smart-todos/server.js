import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = join(__dirname, 'tasks.json')
const app = express()

app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

function load() {
  if (!existsSync(DATA_FILE)) return []
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'))
}

function save(tasks) {
  writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2))
}

app.get('/api/tasks', (req, res) => {
  res.json(load())
})

app.post('/api/tasks', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'text is required' })
  const tasks = load()
  const task = { id: Date.now(), text, done: false }
  tasks.push(task)
  save(tasks)
  res.json(task)
})

app.patch('/api/tasks/:id/done', (req, res) => {
  const tasks = load()
  const task = tasks.find(t => t.id === Number(req.params.id))
  if (!task) return res.status(404).json({ error: 'not found' })
  task.done = !task.done
  save(tasks)
  res.json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
  const tasks = load()
  const idx = tasks.findIndex(t => t.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'not found' })
  tasks.splice(idx, 1)
  save(tasks)
  res.json({ ok: true })
})

app.listen(3000, () => console.log('Running at http://localhost:3000'))

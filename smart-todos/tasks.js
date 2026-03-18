#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const DATA_FILE = join(dirname(fileURLToPath(import.meta.url)), 'tasks.json')

function load() {
  if (!existsSync(DATA_FILE)) return []
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'))
}

function save(tasks) {
  writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2))
}

const [,, command, ...args] = process.argv

switch (command) {
  case 'add': {
    const text = args.join(' ')
    if (!text) { console.log('Usage: todos add <task>'); break }
    const tasks = load()
    tasks.push({ id: Date.now(), text, done: false })
    save(tasks)
    console.log(`Added: "${text}"`)
    break
  }

  case 'done': {
    const id = Number(args[0])
    if (!id) { console.log('Usage: todos done <id>'); break }
    const tasks = load()
    const task = tasks.find(t => t.id === id)
    if (!task) { console.log(`Task ${id} not found`); break }
    task.done = true
    save(tasks)
    console.log(`Done: "${task.text}"`)
    break
  }

  case 'delete': {
    const id = Number(args[0])
    if (!id) { console.log('Usage: todos delete <id>'); break }
    const tasks = load()
    const idx = tasks.findIndex(t => t.id === id)
    if (idx === -1) { console.log(`Task ${id} not found`); break }
    const [removed] = tasks.splice(idx, 1)
    save(tasks)
    console.log(`Deleted: "${removed.text}"`)
    break
  }

  case 'list':
  default: {
    const tasks = load()
    if (!tasks.length) { console.log('No tasks yet. Use: todos add <task>'); break }
    console.log('')
    tasks.forEach(t => {
      const status = t.done ? '✓' : '○'
      const text = t.done ? `\x1b[2m${t.text}\x1b[0m` : t.text
      console.log(`  ${status}  [${t.id}]  ${text}`)
    })
    console.log('')
    const done = tasks.filter(t => t.done).length
    console.log(`  ${done}/${tasks.length} completed\n`)
    break
  }
}

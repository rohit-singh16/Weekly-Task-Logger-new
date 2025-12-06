import { Task } from '../types'

const KEY = 'meteoros_tasks'

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks))
}

export function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem(KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

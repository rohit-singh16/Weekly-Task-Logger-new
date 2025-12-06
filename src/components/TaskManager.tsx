import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Task } from "../types"
import { saveTasks, loadTasks } from "../utils/storage"

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [sortedTasks, setSortedTasks] = useState<number[]>([]) // glowing animation

  // Load tasks on mount
  useEffect(() => {
    setTasks(loadTasks())
  }, [])

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) {
      toast.error("Task cannot be empty!")
      return
    }

    const task: Task = {
      id: Date.now(),
      text: newTask,
      createdAt: new Date().toISOString(),
    }

    const updated = [...tasks, task]

    // Trigger glowing sorting animation
    setSortedTasks(updated.map(t => t.id))
    setTimeout(() => setSortedTasks([]), 500)

    setTasks(updated)
    saveTasks(updated)
    toast.success("Task Added ✅")

    setNewTask("")
  }

  // Edit task
  const editTask = (id: number) => {
    const newText = prompt("Edit your task:")
    if (newText !== null && newText.trim() !== "") {
      const updated = tasks.map(t =>
        t.id === id
          ? { ...t, text: newText, updatedAt: new Date().toISOString() }
          : t
      )

      setTasks(updated)
      saveTasks(updated)

      toast.success("Task Updated ✏️")
    }
  }

  // Delete animation + remove
  const deleteTask = (id: number) => {
    const el = document.getElementById(`task-${id}`)
    if (!el) return

    el.classList.add("removing")

    setTimeout(() => {
      const updated = tasks.filter(t => t.id !== id)
      setTasks(updated)
      saveTasks(updated)
      toast.success("Task Deleted ❌")
    }, 450)
  }

  return (
    <div className="task-manager fade">

      <h3>Weekly Task Entries</h3>

      {/* Add Task Input */}
      <div className="add-task">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter your task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* TASK LIST */}
      <ul>
        {tasks.map(t => (
          <li
            key={t.id}
            id={`task-${t.id}`}
            className={`neon-border task-item ${
              sortedTasks.includes(t.id) ? "sorted-glow" : ""
            }`}
          >
            <strong>{t.text}</strong>
            <span className="task-tag">General</span>

            {/* Timeline Style Metadata */}
            <div className="timeline-info">
              <div className="timeline-dot"></div>
              <div className="timeline-line"></div>

              <div className="timeline-text">
                <small>
                  Created:{" "}
                  {new Date(t.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}

                  {t.updatedAt && (
                    <>
                      {" "}
                      | Updated:{" "}
                      {new Date(t.updatedAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </>
                  )}
                </small>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="task-buttons">
              <button onClick={() => editTask(t.id)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskManager

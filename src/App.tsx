import React, { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import Login from "./components/Login"
import TaskManager from "./components/TaskManager"
import { LoginMeta, Task } from "./types"

const App: React.FC = () => {
  const [meta, setMeta] = useState<LoginMeta | null>(null)
  const [is12Hour, setIs12Hour] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [collapsedLogin, setCollapsedLogin] = useState(false)
  const [collapsedTasks, setCollapsedTasks] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("meteoros_login")
    if (saved) setMeta(JSON.parse(saved))
  }, [])

  const toggleTimeFormat = () => setIs12Hour(prev => !prev)

  const formatDate = (timestamp: string) =>
    new Date(timestamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: is12Hour,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const handleLogout = () => {
    localStorage.removeItem("meteoros_login")
    localStorage.removeItem("meteoros_tasks")
    window.location.reload()
  }

  const storedData = {
    login: JSON.parse(localStorage.getItem("meteoros_login") || "{}"),
    tasks: JSON.parse(localStorage.getItem("meteoros_tasks") || "[]") as Task[],
  }

  const handleEditTask = (taskId: number) => {
    const task = storedData.tasks.find(t => t.id === taskId)
    if (!task) return

    const newText = prompt("Edit this task:", task.text)
    if (newText !== null && newText.trim() !== "") {
      const updatedTasks = storedData.tasks.map(t =>
        t.id === taskId
          ? { ...t, text: newText, updatedAt: new Date().toISOString() }
          : t
      )

      localStorage.setItem("meteoros_tasks", JSON.stringify(updatedTasks))
      toast.success("Task Updated ✏️")

      setShowModal(false)
      setTimeout(() => setShowModal(true), 0)
    }
  }

  if (!meta) return <Login onLogin={setMeta} />

  return (
    <div className="app-container neon-border fade">

      <Toaster />

      <h2>Weekly Task Logger</h2>

      {/* ============================
          LOGIN SUMMARY (MAIN PAGE)
      ============================ */}
      <div className="info-section">

        <div className="info-box">
          <span className="info-icon">🕒</span>
          <div className="info-text">
            <label>Login Time</label>
            <p>{formatDate(meta.timestamp)}</p>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon">💻</span>
          <div className="info-text">
            <label>Device</label>
            <p>{meta.device}</p>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon">📍</span>
          <div className="info-text">
            <label>Location</label>
            <p>{meta.locationName?.split(",").slice(0, 3).join(", ")}</p>
          </div>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="btn-group">
        <button onClick={toggleTimeFormat}>
          Switch to {is12Hour ? "24-hour" : "12-hour"} Format
        </button>
        <button onClick={() => setShowModal(true)}>View Stored Data</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <TaskManager />

      {/* ============================
            MODAL (STORED DATA)
      ============================ */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Stored Data</h3>
              <span className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </span>
            </div>

            {/* Collapsible Login Info */}
            <div className="collapsible">
              <div
                className={`collapsible-header ${collapsedLogin ? "" : "open"}`}
                onClick={() => setCollapsedLogin(prev => !prev)}
              >
                <h4>Login Info</h4>
                <span>{collapsedLogin ? "+" : "-"}</span>
              </div>

              {!collapsedLogin && (
                <div className="collapsible-content login-info-wrapper">
                  <div className="login-info-row">
                    <div className="login-info-icon">🕒</div>
                    <div className="login-info-text">
                      <span className="login-info-label">Login Time</span>
                      <span className="login-info-value">
                        {formatDate(storedData.login.timestamp)}
                      </span>
                    </div>
                  </div>

                  <div className="login-divider"></div>

                  <div className="login-info-row">
                    <div className="login-info-icon">💻</div>
                    <div className="login-info-text">
                      <span className="login-info-label">Device</span>
                      <span className="login-info-value">
                        {storedData.login.device}
                      </span>
                    </div>
                  </div>

                  <div className="login-divider"></div>

                  <div className="login-info-row">
                    <div className="login-info-icon">📍</div>
                    <div className="login-info-text">
                      <span className="login-info-label">Location</span>
                      <span className="login-info-value">
                        {storedData.login.locationName
                          ?.split(",")
                          .slice(0, 3)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Tasks */}
            <div className="collapsible">
              <div
                className={`collapsible-header ${collapsedTasks ? "" : "open"}`}
                onClick={() => setCollapsedTasks(prev => !prev)}
              >
                <h4>Tasks ({storedData.tasks.length})</h4>
                <span>{collapsedTasks ? "+" : "-"}</span>
              </div>

              {!collapsedTasks && (
                <div className="collapsible-content">
                  {storedData.tasks.length === 0 && <p>No tasks stored.</p>}

                  {storedData.tasks.map(t => (
                    <div
                      key={t.id}
                      className="task-card"
                      onClick={() => handleEditTask(t.id)}
                    >
                      <p>
                        <strong>{t.text}</strong>
                      </p>
                      <small>
                        Created: {formatDate(t.createdAt)}
                        {t.updatedAt && <> | Updated: {formatDate(t.updatedAt)}</>}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default App

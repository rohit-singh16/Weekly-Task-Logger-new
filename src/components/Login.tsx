import React from "react"
import toast from "react-hot-toast"
import { GeoInfo, LoginMeta } from "../types"
import { getLocationName } from "../utils/geocode"

interface LoginProps {
  onLogin: (meta: LoginMeta) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = async () => {
    const timestamp = new Date().toISOString()
    const device = navigator.userAgent

    let geo: GeoInfo = { lat: null, lng: null, error: null }
    let locationName = ""

    if ("geolocation" in navigator) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        )

        geo = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          error: null,
        }

        locationName = await getLocationName(geo.lat!, geo.lng!)
      } catch (err: any) {
        geo.error = err.message
      }
    } else {
      geo.error = "Geolocation not supported"
    }

    const meta: LoginMeta = {
      timestamp,
      device,
      geo,
      locationName,
    }

    localStorage.setItem("meteoros_login", JSON.stringify(meta))
    toast.success("Login Successful ✨")

    onLogin(meta)
  }

  return (
    <div className="login-container neon-border fade login-card">

      <h2 className="login-title">Weekly Task Logger</h2>

      {/* INFO PREVIEW TITLE */}
      <p className="login-subtitle">Your device & location info will be recorded</p>

      {/* Neon Preview Box */}
      <div className="login-preview-box">
        <div className="preview-row">
          <span className="preview-icon">🕒</span>
          <span className="preview-label">Login Time</span>
        </div>

        <div className="preview-row">
          <span className="preview-icon">💻</span>
          <span className="preview-label">Device Info</span>
        </div>

        <div className="preview-row">
          <span className="preview-icon">📍</span>
          <span className="preview-label">Location</span>
        </div>
      </div>

      {/* LOGIN BUTTON */}
      <button className="login-button neon-hover" onClick={handleLogin}>
        Simulate Login
      </button>
    </div>
  )
}

export default Login

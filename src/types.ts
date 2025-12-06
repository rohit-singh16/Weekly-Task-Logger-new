export interface GeoInfo {
  lat: number | null
  lng: number | null
  error: string | null
}

export interface LoginMeta {
  timestamp: string
  device: string
  geo: GeoInfo
  locationName?: string
}

export interface Task {
  id: number
  text: string
  createdAt: string
  updatedAt?: string
}

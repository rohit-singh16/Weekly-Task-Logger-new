export async function getLocationName(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
    const data = await res.json()
    return data?.display_name || 'Unknown location'
  } catch (err) {
    console.error('Reverse geocoding failed', err)
    return 'Unknown location'
  }
}

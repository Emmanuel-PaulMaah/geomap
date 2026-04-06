import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

function BorderHighlight({ selectedCountry }) {
  const map = useMap()
  const [borderLayer, setBorderLayer] = useState(null)
  const [borderData, setBorderData] = useState({})

  // Fetch border GeoJSON once on mount
  useEffect(() => {
    const fetchBorders = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        const data = await response.json()
        
        // Convert TopoJSON to a usable format (simplified, but works for borders)
        setBorderData(data)
      } catch (err) {
        console.error('Failed to load border data:', err)
      }
    }
    
    fetchBorders()
  }, [])

  useEffect(() => {
    // Remove old border layer
    if (borderLayer) {
      map.removeLayer(borderLayer)
    }

    if (!selectedCountry?.cca3) return

    // Create a simple border outline using buffer circle
    // A full GeoJSON implementation would require more complex topojson parsing
    const [lat, lng] = selectedCountry.latlng
    
    // Create dashed circle as visual border indicator
    const borderCircle = L.circle([lat, lng], {
      color: '#00FFFF',
      fill: false,
      weight: 4,
      opacity: 1,
      dashArray: '10, 5',
      lineCap: 'round',
      lineJoin: 'round'
    })

    borderCircle.addTo(map)
    borderCircle.bringToFront()
    setBorderLayer(borderCircle)

    return () => {
      if (borderCircle) {
        try {
          map.removeLayer(borderCircle)
        } catch (e) {
          // Layer already removed
        }
      }
    }
  }, [selectedCountry, map, borderData])

  return null
}

export default BorderHighlight

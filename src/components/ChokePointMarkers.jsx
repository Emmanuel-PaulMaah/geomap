import { useState, useEffect } from 'react'
import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { chokePoints, chokePointRiskColor } from '../data/supplyChainChokepoints'
import './ChokePointMarkers.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function ChokePointMarkers({ selectedChokePoint, onChokePointSelect }) {
  const [shippingDataCache, setShippingDataCache] = useState({})

  useEffect(() => {
    // Fetch shipping data for all chokepoints on mount
    const fetchAllData = async () => {
      const cache = {}
      for (const chokePoint of chokePoints) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/shipping/${chokePoint.id}`)
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data) {
              cache[chokePoint.id] = result.data
            }
          }
        } catch (error) {
          console.error(`Error fetching data for ${chokePoint.id}:`, error)
        }
      }
      setShippingDataCache(cache)
    }

    fetchAllData()
    // Refresh every 15 minutes
    const interval = setInterval(fetchAllData, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {chokePoints.map(chokePoint => {
        const riskColor = chokePointRiskColor[chokePoint.riskLevel]
        const shippingData = shippingDataCache[chokePoint.id]
        const hasShippingData = shippingData && shippingData.current.shipsInTransit > 0
        const isSelected = selectedChokePoint === chokePoint.id
        
        const icon = L.divIcon({
          className: `chokepoint-marker ${isSelected ? 'selected' : ''}`,
          html: `
            <div class="chokepoint-inner chokepoint-${chokePoint.riskLevel} ${isSelected ? 'selected' : ''}" style="border-color: ${riskColor}">
              <div class="chokepoint-dot" style="background-color: ${riskColor}"></div>
              ${hasShippingData ? `<div class="chokepoint-badge">${shippingData.current.shipsInTransit}</div>` : ''}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
        
        return (
          <Marker
            key={chokePoint.id}
            position={[chokePoint.lat, chokePoint.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onChokePointSelect(chokePoint.id)
            }}
          />
        )
      })}
    </>
  )
}

export default ChokePointMarkers

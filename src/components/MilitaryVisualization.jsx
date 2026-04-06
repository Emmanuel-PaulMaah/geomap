import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { getMilitaryData, getNuclearPowers } from '../data/military'

function MilitaryVisualization({ countries, selectedCountry }) {
  const map = useMap()

  useEffect(() => {
    // Create military circles
    const militaryLayers = []

    countries.forEach(country => {
      if (!country.latlng || country.latlng.length < 2) return

      const militaryInfo = getMilitaryData(country.cca3)
      if (!militaryInfo) return

      const { spending, nuclear } = militaryInfo
      const [lat, lng] = country.latlng

      // Bubble radius based on spending (log scale for better visualization)
      const radius = Math.log(spending + 1) * 15000

      // Color based on nuclear status
      const color = nuclear ? '#FF6B6B' : '#4ECDC4'
      const fillOpacity = selectedCountry?.cca3 === country.cca3 ? 0.4 : 0.2

      const circle = L.circle([lat, lng], {
        radius,
        color,
        fill: true,
        fillColor: color,
        fillOpacity,
        weight: nuclear ? 2 : 1,
        opacity: 0.8,
        interactive: true,
        className: `military-circle ${nuclear ? 'nuclear' : 'conventional'}`
      })

      // Popup with military details
      circle.bindPopup(`
        <div style="font-size: 12px;">
          <strong>${country.name.common}</strong><br/>
          Military Spending: $${spending}B<br/>
          Active Personnel: ${militaryInfo.activePersonnel?.toLocaleString()}<br/>
          ${nuclear ? `<span style="color: #FF6B6B;">⚠️ Nuclear: ${militaryInfo.nukes} warheads</span>` : 'Conventional forces'}
        </div>
      `)

      circle.addTo(map)
      militaryLayers.push(circle)
    })

    return () => {
      militaryLayers.forEach(layer => map.removeLayer(layer))
    }
  }, [countries, map, selectedCountry])

  return null
}

export default MilitaryVisualization

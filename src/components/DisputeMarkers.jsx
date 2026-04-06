import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { territorialDisputes, recentConflicts, disputeSeverityColor } from '../data/disputes'

function DisputeMarkers({ selectedCountry }) {
  const map = useMap()

  useEffect(() => {
    const disputeLayers = []

    // Filter disputes: show only selected country's disputes if a country is selected
    const disputesToShow = selectedCountry
      ? territorialDisputes.filter(d => d.claimants.includes(selectedCountry.cca3))
      : territorialDisputes

    // Add territorial disputes
    disputesToShow.forEach(dispute => {
      const [lat, lng] = dispute.location
      const color = disputeSeverityColor[dispute.severity] || '#999'
      const isActive = dispute.status === 'active'

      // Create marker
      const markerHtml = `
        <div style="
          width: 14px;
          height: 14px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 8px ${color};
          ${!isActive ? 'opacity: 0.5;' : ''}
        "></div>
      `

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: markerHtml,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
          className: `dispute-marker ${dispute.severity} ${dispute.status}`
        })
      })

      marker.bindPopup(`
        <div style="font-size: 12px; max-width: 200px;">
          <strong>${dispute.name}</strong><br/>
          <span style="color: ${color}; font-weight: 600;">Severity: ${dispute.severity.toUpperCase()}</span><br/>
          <span style="color: #888; font-size: 10px;">Status: ${dispute.status}</span><br/>
          <span style="color: #888; font-size: 10px;">Since: ${dispute.since}</span><br/>
          <br/>
          <em>${dispute.description}</em><br/>
          <br/>
          <span style="font-size: 10px; color: #666;">
            Claimants: ${dispute.claimants.join(', ')}
          </span>
        </div>
      `)

      marker.addTo(map)
      disputeLayers.push(marker)
    })

    // Add recent conflicts
    recentConflicts.forEach(conflict => {
      const [lat, lng] = conflict.location
      const isOngoing = conflict.status === 'ongoing'

      const markerHtml = `
        <div style="
          width: 16px;
          height: 16px;
          background: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2212%22 y=%2218%22 font-size=%2220%22 text-anchor=%22middle%22>⚔️</text></svg>');
          background-size: contain;
          ${isOngoing ? 'animation: pulse 1.5s infinite;' : ''}
        "></div>
      `

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: isOngoing ? `<div style="font-size: 16px; animation: pulse 1.5s infinite;">⚔️</div>` : '<div style="font-size: 14px;">⚔️</div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: `conflict-marker ${conflict.status}`
        })
      })

      marker.bindPopup(`
        <div style="font-size: 12px; max-width: 200px;">
          <strong>${conflict.name}</strong><br/>
          <span style="font-weight: 600; color: ${conflict.status === 'ongoing' ? '#F44336' : '#FF9800'};">
            ${conflict.status.toUpperCase()}
          </span><br/>
          <span style="color: #888; font-size: 10px;">Started: ${conflict.start}</span><br/>
          <br/>
          <em>${conflict.description}</em>
        </div>
      `)

      marker.addTo(map)
      disputeLayers.push(marker)
    })

    // Add CSS animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
    `
    document.head.appendChild(style)

    return () => {
      disputeLayers.forEach(layer => map.removeLayer(layer))
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [map, selectedCountry])

  return null
}

export default DisputeMarkers

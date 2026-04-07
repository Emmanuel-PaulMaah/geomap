import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { chokePoints, chokePointRiskColor } from '../data/supplyChainChokepoints'
import { getShippingDataForChokepoint } from '../data/shippingData'
import './ChokePointMarkers.css'

function ChokePointMarkers({ selectedChokePoint, onChokePointSelect }) {
  return (
    <>
      {chokePoints.map(chokePoint => {
        const riskColor = chokePointRiskColor[chokePoint.riskLevel]
        const shippingData = getShippingDataForChokepoint(chokePoint.id)
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

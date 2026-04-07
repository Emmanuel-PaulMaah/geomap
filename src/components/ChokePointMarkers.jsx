import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { chokePoints, chokePointRiskColor } from '../data/supplyChainChokepoints'
import { getShippingDataForChokepoint } from '../data/shippingData'
import './ChokePointMarkers.css'

function ChokePointMarkers() {

  return (
    <>
      {chokePoints.map(chokePoint => {
        const riskColor = chokePointRiskColor[chokePoint.riskLevel]
        const shippingData = getShippingDataForChokepoint(chokePoint.id)
        const hasShippingData = shippingData && shippingData.current.shipsInTransit > 0
        
        const icon = L.divIcon({
          className: 'chokepoint-marker',
          html: `
            <div class="chokepoint-inner chokepoint-${chokePoint.riskLevel}" style="border-color: ${riskColor}">
              <div class="chokepoint-dot" style="background-color: ${riskColor}"></div>
              ${hasShippingData ? `<div class="chokepoint-badge">${shippingData.current.shipsInTransit}</div>` : ''}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -12]
        })
        
        return (
          <Marker
            key={chokePoint.id}
            position={[chokePoint.lat, chokePoint.lng]}
            icon={icon}
          >
            <Popup className="chokepoint-popup">
              <div className="popup-chokepoint">
                <h3>{chokePoint.name}</h3>
                <div className="popup-stat">
                  <span className="stat-label">World Trade:</span>
                  <span className="stat-value">{chokePoint.worldTrade}%</span>
                </div>
                <div className="popup-stat">
                  <span className="stat-label">Type:</span>
                  <span className="stat-value">{chokePoint.type.charAt(0).toUpperCase() + chokePoint.type.slice(1)}</span>
                </div>
                <div className="popup-stat">
                  <span className="stat-label">Risk Level:</span>
                  <span className={`stat-value risk-${chokePoint.riskLevel}`}>
                    {chokePoint.riskLevel.toUpperCase()}
                  </span>
                </div>
                <div className="popup-section">
                  <strong>Description:</strong>
                  <p>{chokePoint.description}</p>
                </div>
                <div className="popup-section">
                  <strong>Commodities:</strong>
                  <p>{chokePoint.commodities.join(', ')}</p>
                </div>
                <div className="popup-section">
                  <strong>Notes:</strong>
                  <p>{chokePoint.notes}</p>
                </div>
                <div className="popup-section">
                  <strong>Alternatives:</strong>
                  <p>{chokePoint.alternatives}</p>
                </div>
                
                {hasShippingData && (
                  <div className="popup-section">
                    <small style={{ color: 'var(--text-tertiary)' }}>
                      💡 Tip: Click "View Real-Time Traffic" in CommandPanel to see live shipping data
                    </small>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

export default ChokePointMarkers

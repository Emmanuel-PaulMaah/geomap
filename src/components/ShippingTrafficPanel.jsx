import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Ship, AlertTriangle } from 'lucide-react'
import { 
  getShippingDataForChokepoint, 
  getTrafficTrend, 
  getVesselTypePercentages,
  getTopFlagStates 
} from '../data/shippingData'
import './ShippingTrafficPanel.css'

function ShippingTrafficPanel({ chokePointId, chokePointName }) {
  const [shippingData, setShippingData] = useState(null)
  const [selectedVessel, setSelectedVessel] = useState(null)

  useEffect(() => {
    if (!chokePointId) return
    const data = getShippingDataForChokepoint(chokePointId)
    setShippingData(data)
    setSelectedVessel(null)
  }, [chokePointId])

  if (!shippingData) {
    return (
      <div className="shipping-panel">
        <p className="no-data">No shipping data available for this chokepoint</p>
      </div>
    )
  }

  const trend = getTrafficTrend(chokePointId)
  const vesselTypes = getVesselTypePercentages(chokePointId)
  const flagStates = getTopFlagStates(chokePointId)
  const hasAnomalies = shippingData.anomalies && shippingData.anomalies.length > 0

  return (
    <div className="shipping-panel">
      <div className="shipping-header">
        <h3>
          <Ship size={18} />
          Real-Time Traffic: {chokePointName}
        </h3>
        <span className="update-time">
          Updated: {shippingData.lastUpdated.toLocaleTimeString()}
        </span>
      </div>

      {/* Traffic Summary */}
      <div className="traffic-summary">
        <div className="summary-card current">
          <div className="summary-label">Ships in Transit</div>
          <div className="summary-value">{shippingData.current.shipsInTransit}</div>
          <div className={`summary-trend ${trend?.trend}`}>
            {trend?.trend === 'increasing' && <TrendingUp size={16} />}
            {trend?.trend === 'decreasing' && <TrendingDown size={16} />}
            <span>{trend?.percentFromAvg}% {trend?.trend === 'increasing' ? 'above' : 'below'} avg</span>
          </div>
        </div>

        <div className="summary-card delay">
          <div className="summary-label">Avg Delay</div>
          <div className="summary-value">{shippingData.current.avgDelayMinutes}m</div>
          <div className="summary-density">
            <span className={`density-badge ${shippingData.current.trafficDensity}`}>
              {shippingData.current.trafficDensity.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="summary-card transit">
          <div className="summary-label">Avg Transit Time</div>
          <div className="summary-value">{shippingData.averageTransitTime}h</div>
          <div className="summary-label-small">Hours</div>
        </div>
      </div>

      {/* Alerts */}
      {hasAnomalies && (
        <div className="alerts-section">
          {shippingData.anomalies.map((anomaly, idx) => (
            <div key={idx} className={`alert alert-${anomaly.severity}`}>
              <AlertTriangle size={16} />
              <span>{anomaly.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Vessel Type Breakdown */}
      <div className="breakdown-section">
        <h4>Vessel Types</h4>
        <div className="breakdown-chart">
          {vesselTypes.map((vessel, idx) => (
            <div key={idx} className="breakdown-row">
              <div className="breakdown-label">
                <span>{vessel.type}</span>
                <span className="breakdown-count">{vessel.count}</span>
              </div>
              <div className="breakdown-bar-container">
                <div 
                  className="breakdown-bar" 
                  style={{ width: `${vessel.percentage}%` }}
                >
                  {vessel.percentage > 10 && (
                    <span className="breakdown-percent">{vessel.percentage}%</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Flag States */}
      <div className="breakdown-section">
        <h4>Top 5 Flag States</h4>
        <div className="flag-states">
          {flagStates.slice(0, 5).map((flag, idx) => (
            <div key={idx} className="flag-state-item">
              <div className="flag-code">{flag.flag}</div>
              <div className="flag-bar-container">
                <div 
                  className="flag-bar" 
                  style={{ width: `${flag.percentage}%` }}
                ></div>
              </div>
              <div className="flag-count">{flag.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Captured Vessels */}
      <div className="vessels-section">
        <h4>Notable Vessels in Transit</h4>
        <div className="vessels-list">
          {shippingData.capturedVessels.map((vessel, idx) => (
            <div 
              key={idx} 
              className="vessel-item"
              onClick={() => setSelectedVessel(selectedVessel === idx ? null : idx)}
            >
              <div className="vessel-header">
                <div className="vessel-name">{vessel.name}</div>
                <div className="vessel-type">{vessel.type}</div>
              </div>
              <div className="vessel-details">
                <div className="detail">
                  <span className="detail-label">Flag:</span>
                  <span>{vessel.flag}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Length:</span>
                  <span>{vessel.length}m</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Cargo:</span>
                  <span>{vessel.cargo}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Route:</span>
                  <span>{vessel.from} → {vessel.to}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">ETA:</span>
                  <span>{vessel.eta}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="chart-section">
        <h4>24-Hour Traffic Trend</h4>
        <div className="mini-chart">
          <div className="chart-bars">
            {shippingData.hourly.map((hour, idx) => {
              const maxCount = Math.max(...shippingData.hourly.map(h => h.count))
              const height = (hour.count / maxCount) * 100
              return (
                <div 
                  key={idx} 
                  className="chart-bar" 
                  style={{ height: `${height}%` }}
                  title={`${Math.abs(hour.hour)}h ago: ${hour.count} ships`}
                />
              )
            })}
          </div>
          <div className="chart-labels">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingTrafficPanel

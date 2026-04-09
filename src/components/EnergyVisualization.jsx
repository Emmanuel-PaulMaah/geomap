import { getEnergyIndependence, energyIndependenceColor } from '../data/energyIndependence'
import './LegendCommon.css'

function EnergyVisualization() {
  return (
    <div className="legend-container energy-legend">
      <div className="legend-title">
        Energy Independence
      </div>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#2e7d32' }}></div>
          <span>Independent (80-100%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#66bb6a' }}></div>
          <span>Mostly Independent (60-79%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#fdd835' }}></div>
          <span>Moderate Dependency (40-59%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ffa726' }}></div>
          <span>High Dependency (20-39%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#d32f2f' }}></div>
          <span>Critical Dependency (0-19%)</span>
        </div>
      </div>
    </div>
  )
}

export default EnergyVisualization

// Component to render energy independence overlay on countries (used in CountryMarkers)
export function EnergyMarkerColor({ country }) {
  const energyData = getEnergyIndependence(country.cca3)
  return energyIndependenceColor(energyData.overall)
}

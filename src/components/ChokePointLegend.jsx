import './LegendCommon.css'

function ChokePointLegend() {
  return (
    <div className="legend-container chokepoint-legend">
      <div className="legend-title">Supply Chain Chokepoints</div>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#d32f2f' }}></div>
          <span>Critical Risk</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ff9800' }}></div>
          <span>High Risk</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ffc107' }}></div>
          <span>Medium Risk</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#4caf50' }}></div>
          <span>Low Risk</span>
        </div>
        <div className="legend-note">Pulsing animation indicates active risk</div>
      </div>
    </div>
  )
}

export default ChokePointLegend

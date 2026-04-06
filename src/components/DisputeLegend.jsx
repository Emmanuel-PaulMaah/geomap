import './LegendCommon.css'

function DisputeLegend() {
  return (
    <div className="legend-container dispute-legend">
      <div className="legend-title">Territorial Disputes</div>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#d32f2f' }}></div>
          <span>Critical Severity</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#d4af37' }}></div>
          <span>High Severity</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ff9800' }}></div>
          <span>Medium Severity</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#4caf50' }}></div>
          <span>Low Severity</span>
        </div>
        <div className="legend-note">⚔️ Symbols mark active conflicts</div>
      </div>
    </div>
  )
}

export default DisputeLegend

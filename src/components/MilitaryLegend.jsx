import './LegendCommon.css'

function MilitaryLegend() {
  return (
    <div className="legend-container military-legend">
      <div className="legend-title">Military Power</div>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#4ECDC4' }}></div>
          <span>Conventional Forces</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#FF6B6B' }}></div>
          <span>Nuclear Powers</span>
        </div>
        <div className="legend-note">Circle size represents military spending</div>
      </div>
    </div>
  )
}

export default MilitaryLegend

import './LegendCommon.css'

function BilateralLegend() {
  return (
    <div className="legend-container bilateral-legend">
      <div className="legend-title">Bilateral Relations</div>
      <div className="legend-items">
        <div className="legend-item line-legend">
          <div className="legend-line" style={{ borderTop: '3px solid #2e7d32' }}></div>
          <span>Allies</span>
        </div>
        <div className="legend-item line-legend">
          <div className="legend-line" style={{ borderTop: '3px dashed #d32f2f' }}></div>
          <span>Adversaries</span>
        </div>
        <div className="legend-item line-legend">
          <div className="legend-line" style={{ borderTop: '3px solid #ff9800' }}></div>
          <span>Trade Partners</span>
        </div>
        <div className="legend-item line-legend">
          <div className="legend-line" style={{ borderTop: '3px solid #ffc107' }}></div>
          <span>Competitors</span>
        </div>
      </div>
    </div>
  )
}

export default BilateralLegend

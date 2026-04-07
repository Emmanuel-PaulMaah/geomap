import './LegendCommon.css'

function BilateralLegend({ bilateralRelationTypes, setBilateralRelationTypes }) {
  const handleToggle = (type) => {
    setBilateralRelationTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <div className="legend-container bilateral-legend">
      <div className="legend-title">Bilateral Relations</div>
      <div className="legend-items">
        <label className="legend-item line-legend checkbox-legend">
          <input
            type="checkbox"
            checked={bilateralRelationTypes.ally}
            onChange={() => handleToggle('ally')}
          />
          <div className="legend-line" style={{ borderTop: '3px solid #2e7d32' }}></div>
          <span>Allies</span>
        </label>
        <label className="legend-item line-legend checkbox-legend">
          <input
            type="checkbox"
            checked={bilateralRelationTypes.adversary}
            onChange={() => handleToggle('adversary')}
          />
          <div className="legend-line" style={{ borderTop: '3px dashed #d32f2f' }}></div>
          <span>Adversaries</span>
        </label>
        <label className="legend-item line-legend checkbox-legend">
          <input
            type="checkbox"
            checked={bilateralRelationTypes['trade-partner']}
            onChange={() => handleToggle('trade-partner')}
          />
          <div className="legend-line" style={{ borderTop: '3px solid #ff9800' }}></div>
          <span>Trade Partners</span>
        </label>
        <label className="legend-item line-legend checkbox-legend">
          <input
            type="checkbox"
            checked={bilateralRelationTypes.competitor}
            onChange={() => handleToggle('competitor')}
          />
          <div className="legend-line" style={{ borderTop: '3px solid #ffc107' }}></div>
          <span>Competitors</span>
        </label>
      </div>
    </div>
  )
}

export default BilateralLegend

import './InfoPanel.css'
import { X, ChevronDown, ChevronRight, Globe, AlertTriangle, Scale, Zap, Anchor } from 'lucide-react'
import { getCountryOrganizations, getCountryIssues } from '../data/geopolitical'
import { getCountryFlag } from '../utils/flags'
import { getNeighbors } from '../data/borders'
import { getEnergyIndependence, energyIndependenceColor, energyIndependenceLabel } from '../data/energyIndependence'
import { getCountryResources, resourceColors, hasResourceData } from '../data/resources'
import { getCountryTradeBlocsData } from '../data/tradeBlocs'
import { getCountrySupplyChainRole } from '../data/supplyChains'
import { getMilitaryData } from '../data/military'
import { getCountryDisputes } from '../data/disputes'
import { getCountryRegionalStatus, statusColor, statusDescription } from '../data/regionalPowers'

function InfoPanel({ country, onClose, countries, onCountrySelect, onAddToComparison, showResources, showTradeBlocs, showMilitary, showDisputes, showRegionalPower, showEnergyIndependence, expandedSections, toggleSection, onPanelClose, selectedOrganization, onSelectOrganization }) {
  if (!country) {
    return (
      <div className="info-panel">
        <div className="empty-state">
          <div className="empty-icon">
            <Globe size={48} />
          </div>
          <p>Click on a country to view details</p>
        </div>
      </div>
    )
  }

  const languages = country.languages ? Object.values(country.languages) : []
  const organizations = getCountryOrganizations(country.cca3)
  const geopoliticalIssues = getCountryIssues(country.cca3)
  const neighborCodes = getNeighbors(country.cca3)
  const neighbors = countries.filter(c => neighborCodes.includes(c.cca3))
  const countryResources = getCountryResources(country.cca3)
  const tradeBlocs = getCountryTradeBlocsData(country.cca3)
  const supplyChainRoles = getCountrySupplyChainRole(country.cca3)
  const militaryInfo = getMilitaryData(country.cca3)
  const countryDisputes = getCountryDisputes(country.cca3)
  const regionalStatus = getCountryRegionalStatus(country.cca3)

  return (
    <div className="info-panel">
      <div className="panel-header">
         <h2>{country.name.common}</h2>
         <div className="panel-header-buttons">
           <button 
             className="compare-btn" 
             onClick={() => onAddToComparison(country)}
             title="Add to comparison"
           >
             <Scale size={16} />
             Compare
           </button>
           <button 
             className="close-btn" 
             onClick={onClose}
             title="Clear selection"
           >
             <X size={18} />
           </button>
           <button 
             className="close-btn" 
             onClick={onPanelClose}
             title="Close panel"
           >
             <X size={18} />
           </button>
         </div>
       </div>
      
      <div className="flag-section">
        {country.flags?.png && <img src={country.flags.png} alt="" className="flag-image" />}
        <span className="official-name">{country.name.official}</span>
      </div>

      <div className="info-section collapsible">
         <button 
           className="section-toggle"
           onClick={() => toggleSection('geographic')}
           title={expandedSections?.geographic ? 'Collapse' : 'Expand'}
         >
           <span className="toggle-icon">
             {expandedSections?.geographic ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
           </span>
           <span className="section-title">Geographic</span>
         </button>
         {expandedSections?.geographic && (
         <div className="section-content">
           <h3>Geographic</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Region</span>
            <span className="value">{country.region}</span>
          </div>
          <div className="info-item">
            <span className="label">Subregion</span>
            <span className="value">{country.subregion || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">Capital</span>
            <span className="value">{country.capital?.[0] || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">Area</span>
            <span className="value">{country.area?.toLocaleString()} km²</span>
          </div>
          </div>
          </div>
          )}
          </div>

          <div className="info-section collapsible">
          <button 
          className="section-toggle"
          onClick={() => toggleSection('demographics')}
          title={expandedSections?.demographics ? 'Collapse' : 'Expand'}
          >
          <span className="toggle-icon">
            {expandedSections?.demographics ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <span className="section-title">Demographics</span>
          </button>
          {expandedSections?.demographics && (
          <div className="section-content">
          <h3>Demographics</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Population</span>
            <span className="value">{country.population?.toLocaleString()}</span>
          </div>
          </div>
          </div>
          )}
          </div>

          <div className="info-section collapsible">
          <button 
          className="section-toggle"
          onClick={() => toggleSection('cultural')}
          title={expandedSections?.cultural ? 'Collapse' : 'Expand'}
          >
          <span className="toggle-icon">
            {expandedSections?.cultural ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <span className="section-title">Cultural</span>
          </button>
          {expandedSections?.cultural && (
          <div className="section-content">
          <h3>Cultural</h3>
        <div className="info-item">
          <span className="label">Languages</span>
          <span className="value">{languages.join(', ') || 'N/A'}</span>
        </div>
        </div>
        )}
        </div>

        <div className="info-section collapsible">
        <button 
          className="section-toggle"
          onClick={() => toggleSection('coordinates')}
          title={expandedSections?.coordinates ? 'Collapse' : 'Expand'}
        >
          <span className="toggle-icon">
            {expandedSections?.coordinates ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <span className="section-title">Coordinates</span>
        </button>
        {expandedSections?.coordinates && (
        <div className="section-content">
          <h3>Coordinates</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Latitude</span>
            <span className="value">{country.latlng?.[0]}</span>
          </div>
          <div className="info-item">
            <span className="label">Longitude</span>
            <span className="value">{country.latlng?.[1]}</span>
          </div>
          </div>
          </div>
          )}
          </div>

          <div className="code-section">
        <span className="label">Country Code</span>
        <span className="code">{country.cca3}</span>
      </div>

      {organizations.length > 0 && (
        <div className="info-section">
          <h3>Organizations</h3>
          <div className="tags-container">
            {organizations.map(org => (
              <button 
                key={org} 
                className={`tag tag-clickable ${selectedOrganization === org ? 'tag-active' : ''}`}
                onClick={() => onSelectOrganization(selectedOrganization === org ? null : org)}
                title={`Click to filter countries by ${org}`}
              >
                {org}
              </button>
            ))}
          </div>
        </div>
      )}

      {geopoliticalIssues.length > 0 && (
        <div className="info-section alerts">
          <h3>Geopolitical Status</h3>
          {geopoliticalIssues.map((issue, idx) => (
            <div key={idx} className={`alert alert-${issue.type}`}>
              {issue.text}
            </div>
          ))}
        </div>
      )}

      {neighbors.length > 0 && (
        <div className="info-section">
          <h3>Neighboring Countries ({neighbors.length})</h3>
          <div className="neighbors-grid">
            {neighbors.map(neighbor => (
              <button
                key={neighbor.cca3}
                className="neighbor-btn"
                onClick={() => onCountrySelect(neighbor)}
                title={neighbor.name.common}
              >
                {neighbor.flags?.png && <img src={neighbor.flags.png} alt="" className="neighbor-flag" />}
                <span className="neighbor-name">{neighbor.name.common}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showTradeBlocs && tradeBlocs.length > 0 && (
        <div className="info-section">
          <h3>Trade Blocs & Unions</h3>
          <div className="trade-blocs-list">
            {tradeBlocs.map(bloc => (
              <div key={bloc.key} className="trade-bloc-item">
                <div className="bloc-header">
                  <span 
                    className="bloc-indicator" 
                    style={{ backgroundColor: bloc.color }}
                  ></span>
                  <span className="bloc-name">{bloc.name}</span>
                </div>
                <p className="bloc-desc">{bloc.description}</p>
                <p className="bloc-gdp">GDP: {bloc.gdp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTradeBlocs && Object.keys(supplyChainRoles).length > 0 && (
        <div className="info-section">
          <h3>Supply Chain Role</h3>
          <div className="supply-chains-list">
            {Object.entries(supplyChainRoles).map(([product, roles]) => (
              <div key={product} className="supply-chain-item">
                <div className="chain-product">{product.replace(/([A-Z])/g, ' $1').trim()}</div>
                {roles.map((role, idx) => (
                  <div key={idx} className={`chain-stage risk-${role.risk}`}>
                    <span className="stage-name">{role.stage}</span>
                    <span className="risk-badge">{role.risk}</span>
                    <p className="stage-notes">{role.notes}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {showRegionalPower && regionalStatus && (
        <div className="info-section">
          <h3>Regional Power Dynamics</h3>
          <div className="regional-power-info">
            <div className="power-header">
              <span 
                className="power-badge" 
                style={{ backgroundColor: statusColor[regionalStatus.status] }}
              >
                {regionalStatus.status.toUpperCase()}
              </span>
              <span className="power-region">{regionalStatus.region}</span>
            </div>
            <p className="power-description">{statusDescription[regionalStatus.status]}</p>
            
            <div className="power-stat">
              <span className="stat-label">Power Score</span>
              <div className="power-bar">
                <div 
                  className="power-fill" 
                  style={{ 
                    width: `${regionalStatus.power}%`,
                    backgroundColor: statusColor[regionalStatus.status]
                  }}
                ></div>
              </div>
              <span className="stat-value">{regionalStatus.power}/100</span>
            </div>

            <p className="power-note">{regionalStatus.description}</p>

            <div className="regional-context">
              <strong>Regional Context:</strong>
              <p>{regionalStatus.dynamics}</p>
            </div>

            {regionalStatus.hegemonyBasis && (
              <div className="hegemon-note">
                <strong>Regional Hegemon:</strong> {regionalStatus.hegemon}<br/>
                <em style={{ fontSize: '10px' }}>{regionalStatus.hegemonyBasis}</em>
              </div>
            )}
          </div>
        </div>
      )}

      {showDisputes && countryDisputes.length > 0 && (
        <div className="info-section">
          <h3>Territorial Disputes ({countryDisputes.length})</h3>
          <div className="disputes-list">
            {countryDisputes.map(dispute => (
              <div key={dispute.id} className={`dispute-item severity-${dispute.severity}`}>
                <div className="dispute-header">
                  <span className="dispute-name">{dispute.name}</span>
                  <span className="severity-badge">{dispute.severity}</span>
                </div>
                <p className="dispute-desc">{dispute.description}</p>
                <div className="dispute-meta">
                  <span>Status: {dispute.status}</span>
                  <span>Since: {dispute.since}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showMilitary && militaryInfo && (
        <div className="info-section">
          <h3>Military Power</h3>
          <div className="military-section">
            <div className="military-stat">
              <span className="stat-label">Military Spending</span>
              <span className="stat-value">${militaryInfo.spending}B USD</span>
            </div>
            <div className="military-stat">
              <span className="stat-label">Active Personnel</span>
              <span className="stat-value">{militaryInfo.activePersonnel?.toLocaleString()}</span>
            </div>
            {militaryInfo.nuclear && (
              <div className="military-stat nuclear-warning">
                <span className="stat-label">
                  <AlertTriangle size={14} style={{ display: 'inline-block', marginRight: '4px' }} />
                  Nuclear Power
                </span>
                <span className="stat-value">{militaryInfo.nukes} warheads</span>
              </div>
            )}
            <div className="military-stat">
              <span className="stat-label">Region</span>
              <span className="stat-value">{militaryInfo.region}</span>
            </div>
          </div>
        </div>
      )}

      {showEnergyIndependence && (
      <div className="info-section">
        <h3>Energy Independence</h3>
        {country && (
          <div className="energy-info">
            {(() => {
              const energyData = getEnergyIndependence(country.cca3)
              const color = energyIndependenceColor(energyData.overall)
              const label = energyIndependenceLabel(energyData.overall)
              return (
                <>
                  <div className="energy-score">
                    <div className="energy-bar-container">
                      <div 
                        className="energy-bar-fill" 
                        style={{ 
                          width: `${energyData.overall}%`,
                          backgroundColor: color
                        }}
                      ></div>
                    </div>
                    <span className="energy-label" style={{ color }}>{label}</span>
                    <span className="energy-percent">{energyData.overall}%</span>
                  </div>
                  <div className="energy-breakdown">
                    <div className="energy-item">
                      <span className="energy-type">Oil</span>
                      <span className="energy-value">{energyData.oil}%</span>
                    </div>
                    <div className="energy-item">
                      <span className="energy-type">Gas</span>
                      <span className="energy-value">{energyData.gas}%</span>
                    </div>
                    <div className="energy-item">
                      <span className="energy-type">Renewables</span>
                      <span className="energy-value">{energyData.renewables}%</span>
                    </div>
                  </div>
                  {(energyData.nuclear || energyData.hydro || energyData.coal || energyData.geothermal || energyData.shale || energyData.solar || energyData.wind || energyData.ethanol || energyData.biomass) && (
                    <div className="energy-sources">
                      <strong>Sources:</strong>
                      <span>{
                        [
                          energyData.nuclear && 'Nuclear',
                          energyData.hydro && 'Hydro',
                          energyData.coal && 'Coal',
                          energyData.geothermal && 'Geothermal',
                          energyData.shale && 'Shale',
                          energyData.solar && 'Solar',
                          energyData.wind && 'Wind',
                          energyData.ethanol && 'Ethanol',
                          energyData.biomass && 'Biomass'
                        ].filter(Boolean).join(', ')
                      }</span>
                    </div>
                  )}
                  {energyData.notes && (
                    <div className="energy-notes">
                      <p>{energyData.notes}</p>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        )}
      </div>
      )}

      {showResources && (
      <div className="info-section">
        <h3>Critical Resources</h3>
        {Object.keys(countryResources).length > 0 ? (
          <div className="resources-section">
            {Object.entries(countryResources).map(([resourceType, items]) => (
              <div key={resourceType} className="resource-group">
                <div className="resource-header">
                  <span 
                    className="resource-indicator" 
                    style={{ backgroundColor: resourceColors[resourceType] }}
                  ></span>
                  <span className="resource-name">{resourceType.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="resource-item">
                    <span className="resource-role">
                      {item.role === 'exporter' ? (
                        <span className="resource-icon">↗</span>
                      ) : (
                        <span className="resource-icon">↙</span>
                      )}
                      {' '}{item.role}
                    </span>
                    <span className="resource-note">{item.note}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="resource-fallback">
            <p>Resource trade data not available for this country.</p>
            <p className="resource-fallback-hint">Data covers major producers/importers of oil, gas, semiconductors, rare earths, food, and strategic minerals.</p>
          </div>
        )}
      </div>
      )}
    </div>
  )
}

export default InfoPanel
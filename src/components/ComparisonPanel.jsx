import './ComparisonPanel.css'
import { FileJson, Download, X, FileSpreadsheet } from 'lucide-react'
import { getMilitaryData } from '../data/military'
import { getCountryRegionalStatus } from '../data/regionalPowers'
import { getCountryDisputes } from '../data/disputes'
import { getCountryResources } from '../data/resources'
import { exportToCSV, exportToJSON, exportToExcel } from '../utils/export'

function ComparisonPanel({ countries, onRemove, onClose, onAddCountry, allCountries }) {
   if (countries.length === 0) return null

   const handleExport = async (format) => {
     if (format === 'csv') {
       exportToCSV(countries)
     } else if (format === 'json') {
       exportToJSON(countries)
     } else if (format === 'xlsx') {
       await exportToExcel(countries)
     }
   }

  return (
    <div className="comparison-panel">
      <div className="comparison-header">
        <h2>Country Comparison</h2>
        <div className="comparison-controls">
          <button className="export-btn" onClick={() => handleExport('xlsx')} title="Export as Excel">
            <FileSpreadsheet size={14} />
            Excel
          </button>
          <button className="export-btn" onClick={() => handleExport('csv')} title="Export as CSV">
            <Download size={14} />
            CSV
          </button>
          <button className="export-btn" onClick={() => handleExport('json')} title="Export as JSON">
            <FileJson size={14} />
            JSON
          </button>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              {countries.map(country => (
                <th key={country.cca3} className="country-col">
                  <div className="country-col-header">
                    <span>{country.name.common}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => onRemove(country.cca3)}
                      title="Remove from comparison"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic Info */}
            <tr className="section-row">
              <td colSpan={countries.length + 1} className="section-label">Basic Information</td>
            </tr>
            <tr>
              <td>Official Name</td>
              {countries.map(country => (
                <td key={country.cca3}>{country.name.official}</td>
              ))}
            </tr>
            <tr>
              <td>Region</td>
              {countries.map(country => (
                <td key={country.cca3}>{country.region}</td>
              ))}
            </tr>
            <tr>
              <td>Population</td>
              {countries.map(country => (
                <td key={country.cca3}>{country.population?.toLocaleString() || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td>Area</td>
              {countries.map(country => (
                <td key={country.cca3}>{country.area?.toLocaleString()} km²</td>
              ))}
            </tr>
            <tr>
              <td>Capital</td>
              {countries.map(country => (
                <td key={country.cca3}>{country.capital?.[0] || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td>Languages</td>
              {countries.map(country => (
                <td key={country.cca3}>
                  {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Military */}
            <tr className="section-row">
              <td colSpan={countries.length + 1} className="section-label">Military</td>
            </tr>
            <tr>
              <td>Military Spending</td>
              {countries.map(country => {
                const mil = getMilitaryData(country.cca3)
                return <td key={country.cca3}>${mil?.spending || 'N/A'}B</td>
              })}
            </tr>
            <tr>
              <td>Active Personnel</td>
              {countries.map(country => {
                const mil = getMilitaryData(country.cca3)
                return <td key={country.cca3}>{mil?.activePersonnel?.toLocaleString() || 'N/A'}</td>
              })}
            </tr>
            <tr>
              <td>Nuclear Power</td>
              {countries.map(country => {
                const mil = getMilitaryData(country.cca3)
                return (
                  <td key={country.cca3}>
                    {mil?.nuclear ? `✓ (${mil.nukes} warheads)` : '✗'}
                  </td>
                )
              })}
            </tr>

            {/* Regional Status */}
            <tr className="section-row">
              <td colSpan={countries.length + 1} className="section-label">Regional Status</td>
            </tr>
            <tr>
              <td>Regional Role</td>
              {countries.map(country => {
                const regional = getCountryRegionalStatus(country.cca3)
                return (
                  <td key={country.cca3}>
                    <span className={`status-badge status-${regional?.status}`}>
                      {regional?.status.toUpperCase()}
                    </span>
                  </td>
                )
              })}
            </tr>
            <tr>
              <td>Power Score</td>
              {countries.map(country => {
                const regional = getCountryRegionalStatus(country.cca3)
                return <td key={country.cca3}>{regional?.power || 'N/A'}/100</td>
              })}
            </tr>
            <tr>
              <td>Region</td>
              {countries.map(country => {
                const regional = getCountryRegionalStatus(country.cca3)
                return <td key={country.cca3}>{regional?.region || 'N/A'}</td>
              })}
            </tr>

            {/* Disputes */}
            <tr className="section-row">
              <td colSpan={countries.length + 1} className="section-label">Territorial Disputes</td>
            </tr>
            <tr>
              <td>Active Disputes</td>
              {countries.map(country => {
                const disputes = getCountryDisputes(country.cca3)
                return (
                  <td key={country.cca3}>
                    {disputes.length > 0 ? (
                      <span className="dispute-count">{disputes.length}</span>
                    ) : (
                      <span className="none">None</span>
                    )}
                  </td>
                )
              })}
            </tr>

            {/* Resources */}
            <tr className="section-row">
              <td colSpan={countries.length + 1} className="section-label">Resources</td>
            </tr>
            <tr>
              <td>Key Resources</td>
              {countries.map(country => {
                const resources = getCountryResources(country.cca3)
                const resourceTypes = Object.keys(resources)
                return (
                  <td key={country.cca3}>
                    {resourceTypes.length > 0 ? resourceTypes.join(', ') : 'Limited data'}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="comparison-add-country">
        <label>Add country to comparison:</label>
        <select onChange={(e) => {
          if (e.target.value) {
            const country = allCountries.find(c => c.cca3 === e.target.value)
            if (country) {
              onAddCountry(country)
            }
            e.target.value = ''
          }
        }}>
          <option value="">Select country...</option>
          {allCountries
            .filter(c => !countries.find(comp => comp.cca3 === c.cca3))
            .map(country => (
              <option key={country.cca3} value={country.cca3}>
                {country.name.common}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export default ComparisonPanel

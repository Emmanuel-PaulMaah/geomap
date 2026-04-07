import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, RadialLinearScale } from 'chart.js'
import { Pie, Doughnut, Bar, Line, Radar } from 'react-chartjs-2'
import { queryWikidata, wikidataQueries } from '../utils/wikidata'
import { getCountryQID } from '../utils/wikidataQIDs'
import { getEnergyIndependence } from '../data/energyIndependence'
import { getMilitaryData } from '../data/military'
import { getCountryRegionalStatus } from '../data/regionalPowers'
import { getCountryTradeBlocsData } from '../data/tradeBlocs'
import { majorTradePartners } from '../data/tradePartners'
import './DeepDive.css'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, RadialLinearScale)

function DeepDive({ country, onClose, allCountries = [] }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comparedCountries, setComparedCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Fetch Wikidata
  useEffect(() => {
    if (!country) return

    const fetchData = async () => {
      setLoading(true)
      try {
        // Get Wikidata QID from mapping
        const qid = getCountryQID(country.cca3)
        if (!qid) {
          console.warn(`No QID found for ${country.cca3}`)
          setLoading(false)
          return
        }

        // Fetch data from Wikidata
         const [
           basicData, govData, demoData, econData, orgData,
           airportData, langData, ethData, relData, waterwayData, resourceData, climateData, tzData,
           metricData, heightData, lifeExpData, litRateData, giniData, hdiData, unempData, densityData,
           borderData, capitalData, drivingData, elecData, tldData, dialData, govtTypeData, foundingData,
           dissolvData, flagColorData, patronData, anthemData, sportsData, highestData, lowestData,
           forestData, agriData, co2Data, renewData, heritageSitesData, nobelData, majorReligData,
           urbanData, infantMortData, fertilityData, beerData, wineData, railData, roadData,
           riversData, mountainsData, citiesData, holidaysData, speedData, emergencyData,
           popGrowthData, airQualityData, corruptionData, pressFreedomData, renewElecData
         ] = await Promise.all([
           queryWikidata(wikidataQueries.basicInfo(qid)),
           queryWikidata(wikidataQueries.government(qid)),
           queryWikidata(wikidataQueries.demographics(qid)),
           queryWikidata(wikidataQueries.economy(qid)),
           queryWikidata(wikidataQueries.organizations(qid)),
           queryWikidata(wikidataQueries.airports(qid)),
           queryWikidata(wikidataQueries.languages(qid)),
           queryWikidata(wikidataQueries.ethnicGroups(qid)),
           queryWikidata(wikidataQueries.religions(qid)),
           queryWikidata(wikidataQueries.waterways(qid)),
           queryWikidata(wikidataQueries.resources(qid)),
           queryWikidata(wikidataQueries.climate(qid)),
           queryWikidata(wikidataQueries.timeZones(qid)),
           queryWikidata(wikidataQueries.metricSystem(qid)),
           queryWikidata(wikidataQueries.averageHeight(qid)),
           queryWikidata(wikidataQueries.lifeExpectancy(qid)),
           queryWikidata(wikidataQueries.literacyRate(qid)),
           queryWikidata(wikidataQueries.giniCoefficient(qid)),
           queryWikidata(wikidataQueries.hdi(qid)),
           queryWikidata(wikidataQueries.unemploymentRate(qid)),
           queryWikidata(wikidataQueries.populationDensity(qid)),
           queryWikidata(wikidataQueries.borderCount(qid)),
           queryWikidata(wikidataQueries.capitalCoordinates(qid)),
           queryWikidata(wikidataQueries.drivingSide(qid)),
           queryWikidata(wikidataQueries.electricityRate(qid)),
           queryWikidata(wikidataQueries.internetTLD(qid)),
           queryWikidata(wikidataQueries.dialingCode(qid)),
           queryWikidata(wikidataQueries.governmentType(qid)),
           queryWikidata(wikidataQueries.founding(qid)),
           queryWikidata(wikidataQueries.dissolution(qid)),
           queryWikidata(wikidataQueries.flagColors(qid)),
           queryWikidata(wikidataQueries.patronSaint(qid)),
           queryWikidata(wikidataQueries.nationalAnthem(qid)),
           queryWikidata(wikidataQueries.nationalSports(qid)),
           queryWikidata(wikidataQueries.highestPoint(qid)),
           queryWikidata(wikidataQueries.lowestPoint(qid)),
           queryWikidata(wikidataQueries.forestPercentage(qid)),
           queryWikidata(wikidataQueries.agriculturalLand(qid)),
           queryWikidata(wikidataQueries.co2Emissions(qid)),
           queryWikidata(wikidataQueries.renewableEnergy(qid)),
           queryWikidata(wikidataQueries.worldHeritageSites(qid)),
           queryWikidata(wikidataQueries.nobelLaureates(qid)),
           queryWikidata(wikidataQueries.majorReligions(qid)),
           queryWikidata(wikidataQueries.urbanPopulation(qid)),
           queryWikidata(wikidataQueries.infantMortality(qid)),
           queryWikidata(wikidataQueries.fertilityRate(qid)),
           queryWikidata(wikidataQueries.beerConsumption(qid)),
           queryWikidata(wikidataQueries.wineConsumption(qid)),
           queryWikidata(wikidataQueries.railNetwork(qid)),
           queryWikidata(wikidataQueries.roadNetwork(qid)),
           queryWikidata(wikidataQueries.majorRivers(qid)),
           queryWikidata(wikidataQueries.majorMountains(qid)),
           queryWikidata(wikidataQueries.largestCities(qid)),
           queryWikidata(wikidataQueries.holidays(qid)),
           queryWikidata(wikidataQueries.speedLimits(qid)),
           queryWikidata(wikidataQueries.emergencyNumbers(qid)),
           queryWikidata(wikidataQueries.populationGrowth(qid)),
           queryWikidata(wikidataQueries.airQuality(qid)),
           queryWikidata(wikidataQueries.corruptionIndex(qid)),
           queryWikidata(wikidataQueries.pressFreedom(qid)),
           queryWikidata(wikidataQueries.renewableElectricity(qid))
         ])

        setData({
          basic: basicData,
          government: govData,
          demographics: demoData,
          economy: econData,
          organizations: orgData,
          airports: airportData,
          languages: langData,
          ethnicGroups: ethData,
          religions: relData,
          waterways: waterwayData,
          resources: resourceData,
          climate: climateData,
          timeZones: tzData,
          metric: metricData,
          height: heightData,
          lifeExpectancy: lifeExpData,
          literacyRate: litRateData,
          gini: giniData,
          hdi: hdiData,
          unemployment: unempData,
          density: densityData,
          borders: borderData,
          capital: capitalData,
          driving: drivingData,
          electricity: elecData,
          tld: tldData,
          dialing: dialData,
          governmentType: govtTypeData,
          founded: foundingData,
          dissolved: dissolvData,
          flagColors: flagColorData,
          patron: patronData,
          anthem: anthemData,
          sports: sportsData,
          highest: highestData,
          lowest: lowestData,
          forest: forestData,
          agricultural: agriData,
          co2: co2Data,
          renewable: renewData,
          heritageSites: heritageSitesData,
          nobel: nobelData,
          majorReligions: majorReligData,
          urban: urbanData,
          infantMortality: infantMortData,
          fertility: fertilityData,
          beerConsumption: beerData,
          wineConsumption: wineData,
          railNetwork: railData,
          roadNetwork: roadData,
          rivers: riversData,
          mountains: mountainsData,
          cities: citiesData,
          holidays: holidaysData,
          speedLimits: speedData,
          emergencyNumbers: emergencyData,
          populationGrowth: popGrowthData,
          airQuality: airQualityData,
          corruptionIndex: corruptionData,
          pressFreedom: pressFreedomData,
          renewableElectricity: renewElecData,
          qid
        })
      } catch (err) {
        console.error('Failed to fetch deep dive data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [country])

  // Extract labels from Wikidata results
  const extractLabels = (results, labelKey) => {
    if (!results || !Array.isArray(results)) return []
    const labels = results.map(r => r[labelKey]?.value || r[labelKey])
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i) // Remove duplicates
    return labels
  }

  // Filter countries by search query
  const filteredCountries = searchQuery.trim() 
    ? allCountries.filter(c => 
        c.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.official.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cca3.toLowerCase().includes(searchQuery.toLowerCase())
      ).filter(c => c.cca3 !== country.cca3) // Exclude current country
      .slice(0, 8) // Limit to 8 results
    : []

  const addCountryToComparison = (c) => {
    if (!comparedCountries.find(x => x.cca3 === c.cca3)) {
      setComparedCountries([...comparedCountries, c])
    }
    setSearchQuery('')
    setShowSearchResults(false)
  }

  if (loading) {
    const progress = data ? 75 : 30 // Simulate progress based on state
    return (
      <div className="deep-dive-overlay">
        <div className="deep-dive-container">
          <div className="deep-dive-header">
            <h1>{country?.name.common}</h1>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="loading-container">
            <svg className="loading-spinner" viewBox="0 0 50 50" width="60" height="60">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="rgba(0, 82, 204, 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#0052CC"
                strokeWidth="2"
                strokeDasharray={`${(progress / 100) * 125.66} 125.66`}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '25px 25px' }}
              />
            </svg>
            <p className="loading-text">Loading country data...</p>
            <p className="loading-percentage">{progress}%</p>
          </div>
        </div>
      </div>
    )
  }

  const energyData = getEnergyIndependence(country.cca3)
  const militaryData = getMilitaryData(country.cca3)
  const regionalStatus = getCountryRegionalStatus(country.cca3)
  const tradeBlocs = getCountryTradeBlocsData(country.cca3)
  const tradePartners = majorTradePartners[country.cca3] || []

  // Chart configs
  const energyChartData = {
    labels: ['Oil', 'Gas', 'Coal', 'Nuclear', 'Renewables'].filter((_, i) => {
      const keys = ['oil', 'gas', 'coal', 'nuclear', 'renewables']
      return energyData[keys[i]]
    }),
    datasets: [{
      label: 'Energy Mix (%)',
      data: [energyData.oil, energyData.gas, energyData.coal, energyData.nuclear, energyData.renewables].filter(v => v),
      backgroundColor: ['#1a1a1a', '#FF6B35', '#8B4513', '#FFD700', '#4CAF50'],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  }

  const militaryChartData = militaryData ? {
    labels: ['Spending ($B)', 'Personnel (k)', 'Nuclear Bonus'],
    datasets: [{
      label: 'Military Profile',
      data: [
        militaryData.spending,
        militaryData.activePersonnel / 1000,
        militaryData.nuclear ? 50 : 0
      ],
      backgroundColor: ['#d32f2f', '#ff9800', '#ffc107'],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  } : null

  const tradeChartData = tradePartners.length > 0 ? {
    labels: tradePartners.map(p => p.cca3),
    datasets: [{
      label: 'Trade Volume ($B)',
      data: tradePartners.map(p => parseInt(p.volume.replace('B', ''))),
      backgroundColor: '#0052CC',
      borderColor: 'rgba(0, 82, 204, 0.5)',
      borderWidth: 2
    }]
  } : null

  const regionalData = regionalStatus ? {
    labels: ['Economic Power', 'Military Power', 'Diplomatic Influence', 'Technology', 'Soft Power'],
    datasets: [{
      label: 'Regional Profile',
      data: [
        regionalStatus.power,
        militaryData ? (militaryData.spending / 10) : 20,
        60,
        regionalStatus.power * 0.8,
        50
      ],
      backgroundColor: 'rgba(0, 82, 204, 0.2)',
      borderColor: '#0052CC',
      borderWidth: 2,
      pointBackgroundColor: '#0052CC'
    }]
  } : null

  return (
    <div className="deep-dive-overlay" onClick={onClose}>
      <div className="deep-dive-container" onClick={(e) => e.stopPropagation()}>
        <div className="deep-dive-header">
          <div className="header-content">
            {country.flags?.png && <img src={country.flags.png} alt="" className="flag" />}
            <h1>{country.name.common}</h1>
            <span className="subheading">{country.name.official}</span>
          </div>
          <div className="header-buttons">
            <button 
              className={`compare-btn ${comparedCountries.length > 0 ? 'active' : ''}`}
              onClick={() => {
                if (comparedCountries.length === 0) {
                  setComparedCountries([country])
                } else {
                  setComparedCountries([])
                }
              }}
              title={comparedCountries.length > 0 ? 'Exit comparison mode' : 'Enter comparison mode'}
            >
              {comparedCountries.length > 0 ? '✓ Comparing' : 'Compare'}
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {comparedCountries.length > 0 && (
          <div className="comparison-bar">
            <div className="comparison-bar-content">
              <span className="comparison-label">Comparing:</span>
              <div className="comparison-countries">
                {[country, ...comparedCountries].map((c, idx) => (
                  <div key={c.cca3} className="comparison-badge">
                    {c.name.common}
                    {idx > 0 && (
                      <button 
                        className="badge-remove"
                        onClick={() => setComparedCountries(comparedCountries.filter(x => x.cca3 !== c.cca3))}
                        title="Remove from comparison"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {comparedCountries.length === 0 && (
          <div className="comparison-search-bar">
            <div className="comparison-search-content">
              <span className="comparison-label">Add country to compare:</span>
              <div className="search-input-wrapper" style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  className="comparison-search-input"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSearchResults(true)
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                />
                {showSearchResults && filteredCountries.length > 0 && (
                  <div className="search-results">
                    {filteredCountries.map(c => (
                      <button
                        key={c.cca3}
                        className="search-result-item"
                        onClick={() => addCountryToComparison(c)}
                        title={c.name.official}
                      >
                        {c.flags?.png && <img src={c.flags.png} alt="" className="result-flag" />}
                        <span>{c.name.common}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={`deep-dive-content ${comparedCountries.length > 0 ? 'comparison-mode' : ''}`}>
           {/* Comparison Mode - show side by side */}
           {comparedCountries.length > 0 && (
             <section className="deep-dive-section comparison-header-section" style={{ gridColumn: '1 / -1' }}>
               <h2>Comparison View</h2>
               <div className="comparison-table-container">
                 <table className="comparison-quick-table">
                   <thead>
                     <tr>
                       <th>Metric</th>
                       {[country, ...comparedCountries].map(c => (
                         <th key={c.cca3}>{c.name.common}</th>
                       ))}
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>Population</td>
                       {[country, ...comparedCountries].map(c => (
                         <td key={c.cca3}>{c.population?.toLocaleString()}</td>
                       ))}
                     </tr>
                     <tr>
                       <td>Area (km²)</td>
                       {[country, ...comparedCountries].map(c => (
                         <td key={c.cca3}>{c.area?.toLocaleString()}</td>
                       ))}
                     </tr>
                     <tr>
                       <td>Region</td>
                       {[country, ...comparedCountries].map(c => (
                         <td key={c.cca3}>{c.region}</td>
                       ))}
                     </tr>
                   </tbody>
                 </table>
               </div>
             </section>
           )}

           {/* Energy Independence */}
          {energyData && (
            <section className="deep-dive-section">
              <h2>Energy Independence</h2>
              <div className="section-content">
                <div className="chart-container">
                  <Doughnut 
                    data={energyChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { color: '#fff' }
                        }
                      }
                    }}
                  />
                </div>
                <div className="stat-card">
                  <span className="stat-label">Overall Independence</span>
                  <span className="stat-value" style={{
                    color: energyData.overall >= 80 ? '#4CAF50' : 
                           energyData.overall >= 60 ? '#FFC107' : 
                           energyData.overall >= 40 ? '#FF9800' : '#d32f2f'
                  }}>
                    {energyData.overall}%
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* Military Profile */}
          {militaryData && (
            <section className="deep-dive-section">
              <h2>Military Profile</h2>
              <div className="section-content">
                <div className="chart-container">
                  <Bar
                    data={militaryChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { labels: { color: '#fff' } }
                      },
                      scales: {
                        y: { ticks: { color: '#fff' } }
                      }
                    }}
                  />
                </div>
                <div className="stat-grid">
                  <div className="stat-card">
                    <span className="stat-label">Spending</span>
                    <span className="stat-value">${militaryData.spending}B</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Personnel</span>
                    <span className="stat-value">{(militaryData.activePersonnel / 1000000).toFixed(1)}M</span>
                  </div>
                  {militaryData.nuclear && (
                    <div className="stat-card nuclear">
                      <span className="stat-label">Nuclear</span>
                      <span className="stat-value">{militaryData.nukes} warheads</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Regional Power */}
          {regionalData && (
            <section className="deep-dive-section">
              <h2>Regional Power Profile</h2>
              <div className="section-content">
                <div className="chart-container">
                  <Radar
                    data={regionalData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { labels: { color: '#fff' } }
                      },
                      scales: {
                        r: {
                          ticks: { color: '#fff' },
                          grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                      }
                    }}
                  />
                </div>
                <div className="stat-card">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">{regionalStatus.status.toUpperCase()}</span>
                </div>
              </div>
            </section>
          )}

          {/* Trade Partners */}
          {tradeChartData && (
            <section className="deep-dive-section">
              <h2>Top Trade Partners</h2>
              <div className="section-content">
                <div className="chart-container">
                  <Bar
                    data={tradeChartData}
                    options={{
                      indexAxis: 'y',
                      responsive: true,
                      plugins: {
                        legend: { labels: { color: '#fff' } }
                      },
                      scales: {
                        x: { ticks: { color: '#fff' } }
                      }
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Trade Blocs */}
           {tradeBlocs.length > 0 && (
             <section className="deep-dive-section">
               <h2>Trade Blocs & Unions ({tradeBlocs.length})</h2>
               <div className="section-content">
                 <div className="tags-list">
                   {tradeBlocs.map(bloc => (
                     <div key={bloc.key} className="tag-card">
                       <span className="bloc-indicator" style={{ backgroundColor: bloc.color }}></span>
                       <div>
                         <div className="tag-name">{bloc.name}</div>
                         <div className="tag-desc">{bloc.description}</div>
                         <div className="tag-gdp">{bloc.gdp}</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </section>
           )}

          {/* Languages */}
          {(() => {
            const langs = extractLabels(data?.languages, 'langLabel')
            return langs.length > 0 && (
              <section className="deep-dive-section">
                <h2>Languages ({langs.length})</h2>
                <div className="section-content">
                  <div className="tags-list">
                    {langs.map((lang, idx) => (
                      <div key={idx} className="tag-card">
                        <div className="tag-name">{lang}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })()}

          {/* Ethnic Groups */}
          {(() => {
            const groups = extractLabels(data?.ethnicGroups, 'ethGroupLabel')
            return groups.length > 0 && (
              <section className="deep-dive-section">
                <h2>Ethnic Groups ({groups.length})</h2>
                <div className="section-content">
                  <div className="tags-list">
                    {groups.map((group, idx) => (
                      <div key={idx} className="tag-card">
                        <div className="tag-name">{group}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })()}

          {/* Religions */}
          {(() => {
            const rels = extractLabels(data?.religions, 'religionLabel')
            return rels.length > 0 && (
              <section className="deep-dive-section">
                <h2>Religions ({rels.length})</h2>
                <div className="section-content">
                  <div className="tags-list">
                    {rels.map((rel, idx) => (
                      <div key={idx} className="tag-card">
                        <div className="tag-name">{rel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })()}

          {/* Airports */}
          {(() => {
            const airports = extractLabels(data?.airports, 'airportLabel')
            return airports.length > 0 && (
              <section className="deep-dive-section">
                <h2>Airports & Transport ({airports.length})</h2>
                <div className="section-content">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-label">Major Airports</span>
                      <span className="stat-value">{airports.length}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Air Connectivity</span>
                      <span className="stat-value">{airports.length > 5 ? 'High' : 'Moderate'}</span>
                    </div>
                  </div>
                  {airports.length <= 10 && (
                    <div className="tags-list">
                      {airports.map((airport, idx) => (
                        <div key={idx} className="tag-card">
                          <div className="tag-name">{airport}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )
          })()}

          {/* Waterways */}
          {(() => {
            const waterways = extractLabels(data?.waterways, 'waterwayLabel')
            return waterways.length > 0 && (
              <section className="deep-dive-section">
                <h2>Waterways ({waterways.length})</h2>
                <div className="section-content">
                  <div className="stat-card">
                    <span className="stat-label">Major Waterways</span>
                    <span className="stat-value">{waterways.length}</span>
                  </div>
                  {waterways.length <= 8 && (
                    <div className="tags-list">
                      {waterways.map((waterway, idx) => (
                        <div key={idx} className="tag-card">
                          <div className="tag-name">{waterway}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )
          })()}

          {/* Climate */}
          {(() => {
            const climates = extractLabels(data?.climate, 'climateLabel')
            return climates.length > 0 && (
              <section className="deep-dive-section">
                <h2>Climate Zones ({climates.length})</h2>
                <div className="section-content">
                  <div className="tags-list">
                    {climates.map((zone, idx) => (
                      <div key={idx} className="tag-card">
                        <div className="tag-name">{zone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })()}

          {/* Time Zones */}
          {(() => {
            const timezones = extractLabels(data?.timeZones, 'timezoneLabel')
            return timezones.length > 0 && (
              <section className="deep-dive-section">
                <h2>Time Zones ({timezones.length})</h2>
                <div className="section-content">
                  <div className="tags-list">
                    {timezones.map((tz, idx) => (
                      <div key={idx} className="tag-card">
                        <div className="tag-name">{tz}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })()}

          {/* Socioeconomic Indicators */}
          <section className="deep-dive-section">
            <h2>Socioeconomic Indicators</h2>
            <div className="section-content">
              <div className="stats-grid">
                {data?.lifeExpectancy?.[0]?.expectancy?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Life Expectancy</span>
                    <span className="stat-value">{parseFloat(data.lifeExpectancy[0].expectancy.value).toFixed(1)} yrs</span>
                  </div>
                )}
                {data?.literacyRate?.[0]?.rate?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Literacy Rate</span>
                    <span className="stat-value">{data.literacyRate[0].rate.value}%</span>
                  </div>
                )}
                {data?.hdi?.[0]?.hdi?.value && (
                  <div className="stat-card">
                    <span className="stat-label">HDI</span>
                    <span className="stat-value">{parseFloat(data.hdi[0].hdi.value).toFixed(3)}</span>
                  </div>
                )}
                {data?.gini?.[0]?.gini?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Gini Index</span>
                    <span className="stat-value">{parseFloat(data.gini[0].gini.value).toFixed(1)}</span>
                  </div>
                )}
                {data?.unemployment?.[0]?.rate?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Unemployment</span>
                    <span className="stat-value">{data.unemployment[0].rate.value}%</span>
                  </div>
                )}
                {data?.infantMortality?.[0]?.rate?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Infant Mortality</span>
                    <span className="stat-value">{data.infantMortality[0].rate.value}/1000</span>
                  </div>
                )}
                {data?.fertility?.[0]?.rate?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Fertility Rate</span>
                    <span className="stat-value">{parseFloat(data.fertility[0].rate.value).toFixed(2)}</span>
                  </div>
                )}
                {data?.urban?.[0]?.percentage?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Urban Population</span>
                    <span className="stat-value">{data.urban[0].percentage.value}%</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Environmental & Infrastructure */}
          <section className="deep-dive-section">
            <h2>Environment & Infrastructure</h2>
            <div className="section-content">
              <div className="stats-grid">
                {data?.forest?.[0]?.percentage?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Forest Coverage</span>
                    <span className="stat-value">{data.forest[0].percentage.value}%</span>
                  </div>
                )}
                {data?.agricultural?.[0]?.percentage?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Agricultural Land</span>
                    <span className="stat-value">{data.agricultural[0].percentage.value}%</span>
                  </div>
                )}
                {data?.renewable?.[0]?.percentage?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Renewable Energy</span>
                    <span className="stat-value">{data.renewable[0].percentage.value}%</span>
                  </div>
                )}
                {data?.renewableElectricity?.[0]?.percentage?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Renewable Electricity</span>
                    <span className="stat-value">{data.renewableElectricity[0].percentage.value}%</span>
                  </div>
                )}
                {data?.co2?.[0]?.emissions?.value && (
                  <div className="stat-card">
                    <span className="stat-label">CO2 Emissions</span>
                    <span className="stat-value">{data.co2[0].emissions.value}Mt</span>
                  </div>
                )}
                {data?.borders?.[0]?.count?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Neighboring Countries</span>
                    <span className="stat-value">{data.borders[0].count.value}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Governance & Cultural */}
          <section className="deep-dive-section">
            <h2>Governance & Cultural</h2>
            <div className="section-content">
              {(() => {
                const govTypes = extractLabels(data?.governmentType, 'govtLabel')
                const drivinSide = extractLabels(data?.driving, 'sideLabel')
                const metrSystem = extractLabels(data?.metric, 'systemLabel')
                return (
                  <>
                    {govTypes.length > 0 && (
                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Government Type</p>
                        <div className="tags-list">
                          {govTypes.map((gov, idx) => (
                            <div key={idx} className="tag-card">
                              <div className="tag-name">{gov}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {drivinSide.length > 0 && (
                      <div className="stat-card">
                        <span className="stat-label">Driving Side</span>
                        <span className="stat-value">{drivinSide[0]}</span>
                      </div>
                    )}
                    {metrSystem.length > 0 && (
                      <div className="stat-card">
                        <span className="stat-label">Measurement System</span>
                        <span className="stat-value">{metrSystem[0]}</span>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </section>

          {/* Infrastructure Networks */}
          {(data?.railNetwork || data?.roadNetwork) && (
            <section className="deep-dive-section">
              <h2>Transportation Networks</h2>
              <div className="section-content">
                <div className="stats-grid">
                  {data?.railNetwork?.[0]?.length?.value && (
                    <div className="stat-card">
                      <span className="stat-label">Rail Network</span>
                      <span className="stat-value">{parseInt(data.railNetwork[0].length.value).toLocaleString()} km</span>
                    </div>
                  )}
                  {data?.roadNetwork?.[0]?.length?.value && (
                    <div className="stat-card">
                      <span className="stat-label">Road Network</span>
                      <span className="stat-value">{parseInt(data.roadNetwork[0].length.value).toLocaleString()} km</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Major Cities */}
          {(() => {
            const cities = data?.cities?.slice(0, 10) || []
            return cities.length > 0 && (
              <section className="deep-dive-section">
                <h2>Largest Cities</h2>
                <div className="section-content">
                  <div className="tags-list">
                    {cities.map((city, idx) => (
                      <div key={idx} className="tag-card">
                        <div className="tag-name">{city.cityLabel?.value || city.cityLabel}</div>
                        <div className="tag-desc">{parseInt(city.population?.value || city.population).toLocaleString()} people</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })()}

          {/* Natural Features */}
          {(data?.rivers || data?.mountains) && (
            <section className="deep-dive-section">
              <h2>Natural Features</h2>
              <div className="section-content">
                {(() => {
                  const rivers = extractLabels(data?.rivers, 'riverLabel')
                  const mountains = extractLabels(data?.mountains, 'mountainLabel')
                  return (
                    <>
                      {rivers.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Major Rivers</p>
                          <div className="tags-list">
                            {rivers.slice(0, 5).map((river, idx) => (
                              <div key={idx} className="tag-card">
                                <div className="tag-name">{river}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {mountains.length > 0 && (
                        <div>
                          <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Major Mountains</p>
                          <div className="tags-list">
                            {mountains.slice(0, 5).map((mountain, idx) => (
                              <div key={idx} className="tag-card">
                                <div className="tag-name">{mountain}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>
            </section>
          )}

          {/* Global Indices */}
          <section className="deep-dive-section">
            <h2>Global Indices & Rankings</h2>
            <div className="section-content">
              <div className="stats-grid">
                {data?.corruptionIndex?.[0]?.index?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Corruption Perception</span>
                    <span className="stat-value">{parseFloat(data.corruptionIndex[0].index.value).toFixed(1)}</span>
                  </div>
                )}
                {data?.pressFreedom?.[0]?.index?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Press Freedom Index</span>
                    <span className="stat-value">{data.pressFreedom[0].index.value}</span>
                  </div>
                )}
                {data?.heritageSites?.[0]?.count?.value && (
                  <div className="stat-card">
                    <span className="stat-label">UNESCO World Heritage</span>
                    <span className="stat-value">{data.heritageSites[0].count.value}</span>
                  </div>
                )}
                {data?.nobel?.[0]?.count?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Nobel Laureates</span>
                    <span className="stat-value">{data.nobel[0].count.value}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Connectivity */}
          <section className="deep-dive-section">
            <h2>International Connectivity</h2>
            <div className="section-content">
              <div className="stats-grid">
                {data?.tld?.[0]?.tld?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Internet TLD</span>
                    <span className="stat-value">{data.tld[0].tld.value}</span>
                  </div>
                )}
                {data?.dialing?.[0]?.code?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Dialing Code</span>
                    <span className="stat-value">+{data.dialing[0].code.value}</span>
                  </div>
                )}
                {data?.electricity?.[0]?.rate?.value && (
                  <div className="stat-card">
                    <span className="stat-label">Electrification</span>
                    <span className="stat-value">{data.electricity[0].rate.value}%</span>
                  </div>
                )}
              </div>
            </div>
          </section>
          </div>
          </div>
          </div>
          )
          }
          
          export default DeepDive

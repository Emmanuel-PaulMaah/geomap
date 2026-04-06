import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import './App.css'
import { geopoliticalData } from './data/geopolitical'
import CommandPanel from './components/CommandPanel'
import InfoPanel from './components/InfoPanel'
import ComparisonPanel from './components/ComparisonPanel'
import WorldMap from './components/WorldMap'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [comparisonCountries, setComparisonCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Panel visibility
  const [showCommandPanel, setShowCommandPanel] = useState(true)
  const [showInfoPanel, setShowInfoPanel] = useState(true)
  
  // Map type
  const [mapType, setMapType] = useState('dark')
  
  // Organization filter
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  
  // Collapsible sections in CommandPanel
  const [expandedSections, setExpandedSections] = useState({
    filter: true,
    commands: false,
    visualizations: true
  })
  
  // Collapsible sections in InfoPanel
  const [expandedInfoSections, setExpandedInfoSections] = useState({
    geographic: true,
    demographics: true,
    cultural: true,
    coordinates: false,
    organizations: true,
    geopolitical: true,
    neighbors: true,
    resources: true,
    tradeBlocs: true,
    military: true,
    disputes: true,
    regionalPower: true
  })
  
  // Visualization layers
  const [showBilateralRelations, setShowBilateralRelations] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showMilitary, setShowMilitary] = useState(false)
  const [showTradeBlocs, setShowTradeBlocs] = useState(false)
  const [showDisputes, setShowDisputes] = useState(false)
  const [showRegionalPower, setShowRegionalPower] = useState(false)
  const [showChokePoints, setShowChokePoints] = useState(false)
  const [showEnergyIndependence, setShowEnergyIndependence] = useState(false)
  
  // Toggle section expansion
  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }
  
  const toggleInfoSection = (sectionName) => {
    setExpandedInfoSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,region,subregion,capital,population,area,languages,latlng')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load countries:', err)
        setLoading(false)
      })
  }, [])

  const filteredCountries = Array.isArray(countries) ? countries.filter(c => {
    const matchesSearch = c.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.name.official.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = !regionFilter || c.region === regionFilter
    
    // Filter by organization if one is selected
    let matchesOrganization = true
    if (selectedOrganization) {
      const orgKey = selectedOrganization.toLowerCase().replace(' ', '')
      const orgMembers = geopoliticalData[orgKey] || []
      matchesOrganization = orgMembers.includes(c.cca3)
    }
    
    return matchesSearch && matchesRegion && matchesOrganization
  }) : []

  const regions = Array.isArray(countries) ? [...new Set(countries.map(c => c.region).filter(Boolean))] : []

  return (
    <div className="app-container">
      {showCommandPanel && (
        <CommandPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          regions={regions}
          filteredCount={filteredCountries.length}
          showBilateralRelations={showBilateralRelations}
          setShowBilateralRelations={setShowBilateralRelations}
          showResources={showResources}
          setShowResources={setShowResources}
          showMilitary={showMilitary}
          setShowMilitary={setShowMilitary}
          showTradeBlocs={showTradeBlocs}
          setShowTradeBlocs={setShowTradeBlocs}
          showDisputes={showDisputes}
          setShowDisputes={setShowDisputes}
          showRegionalPower={showRegionalPower}
          setShowRegionalPower={setShowRegionalPower}
          showChokePoints={showChokePoints}
          setShowChokePoints={setShowChokePoints}
          showEnergyIndependence={showEnergyIndependence}
          setShowEnergyIndependence={setShowEnergyIndependence}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          onClose={() => setShowCommandPanel(false)}
          selectedOrganization={selectedOrganization}
          onClearOrganizationFilter={() => setSelectedOrganization(null)}
        />
      )}
      <div className="map-container">
         <WorldMap 
           countries={filteredCountries}
           selectedCountry={selectedCountry}
           onCountrySelect={setSelectedCountry}
           loading={loading}
           showBilateralRelations={showBilateralRelations}
           showResources={showResources}
           showMilitary={showMilitary}
           showTradeBlocs={showTradeBlocs}
           showDisputes={showDisputes}
           showChokePoints={showChokePoints}
           showEnergyIndependence={showEnergyIndependence}
           mapType={mapType}
           onMapTypeChange={setMapType}
         />
       </div>
      {showInfoPanel && comparisonCountries.length > 0 && (
        <ComparisonPanel
          countries={comparisonCountries}
          onRemove={(cca3) => setComparisonCountries(comparisonCountries.filter(c => c.cca3 !== cca3))}
          onClose={() => setComparisonCountries([])}
          onAddCountry={(country) => {
            if (!comparisonCountries.find(c => c.cca3 === country.cca3)) {
              setComparisonCountries([...comparisonCountries, country])
            }
          }}
          allCountries={countries}
          onPanelClose={() => setShowInfoPanel(false)}
        />
      )}
      {showInfoPanel && comparisonCountries.length === 0 && (
        <InfoPanel 
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          countries={countries}
          onCountrySelect={setSelectedCountry}
          onAddToComparison={(country) => setComparisonCountries([...comparisonCountries, country])}
          showResources={showResources}
          showTradeBlocs={showTradeBlocs}
          showMilitary={showMilitary}
          showDisputes={showDisputes}
          showRegionalPower={showRegionalPower}
          showEnergyIndependence={showEnergyIndependence}
          expandedSections={expandedInfoSections}
          toggleSection={toggleInfoSection}
          onPanelClose={() => setShowInfoPanel(false)}
          selectedOrganization={selectedOrganization}
          onSelectOrganization={setSelectedOrganization}
        />
      )}
      {!showCommandPanel && (
        <button 
          className="panel-toggle panel-toggle-left" 
          onClick={() => setShowCommandPanel(true)}
          title="Show Commands Panel"
        >
          <ChevronRight size={18} />
          <span className="toggle-label">Cmds</span>
        </button>
      )}
      {!showInfoPanel && (
        <button 
          className="panel-toggle panel-toggle-right" 
          onClick={() => setShowInfoPanel(true)}
          title="Show Info Panel"
        >
          <ChevronLeft size={18} />
          <span className="toggle-label">Info</span>
        </button>
      )}
    </div>
  )
}

export default App
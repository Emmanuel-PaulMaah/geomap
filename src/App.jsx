import { useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

import './App.css'
import { geopoliticalData } from './data/geopolitical'
import CommandPanel from './components/CommandPanel'
import InfoPanel from './components/InfoPanel'
import WorldMap from './components/WorldMap'
import DeepDive from './components/DeepDive'

import localCountries from './data/countries'

function isValidCountry(country) {
  return (
    typeof country?.cca3 === 'string' &&
    typeof country?.name?.common === 'string' &&
    Array.isArray(country?.latlng) &&
    country.latlng.length >= 2 &&
    Number.isFinite(country.latlng[0]) &&
    Number.isFinite(country.latlng[1])
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [countriesError, setCountriesError] = useState(null)

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
    visualizations: true,
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
    regionalPower: true,
  })

  // Visualization layers
  const [showBilateralRelations, setShowBilateralRelations] = useState(false)

  const [bilateralRelationTypes, setBilateralRelationTypes] = useState({
    ally: true,
    adversary: true,
    'trade-partner': true,
    competitor: true,
  })

  const [showResources, setShowResources] = useState(false)
  const [showMilitary, setShowMilitary] = useState(false)
  const [showTradeBlocs, setShowTradeBlocs] = useState(false)
  const [showDisputes, setShowDisputes] = useState(false)
  const [showRegionalPower, setShowRegionalPower] = useState(false)
  const [showChokePoints, setShowChokePoints] = useState(false)
  const [selectedChokePoint, setSelectedChokePoint] = useState(null)
  const [showChokePointTraffic, setShowChokePointTraffic] = useState(false)
  const [showEnergyIndependence, setShowEnergyIndependence] = useState(false)

  // Deep Dive mode
  const [showDeepDive, setShowDeepDive] = useState(false)

  const toggleSection = sectionName => {
    setExpandedSections(previous => ({
      ...previous,
      [sectionName]: !previous[sectionName],
    }))
  }

  const toggleInfoSection = sectionName => {
    setExpandedInfoSections(previous => ({
      ...previous,
      [sectionName]: !previous[sectionName],
    }))
  }

  const handleCountrySelect = country => {
    setSelectedCountry(country)
    setSelectedChokePoint(null)
    setShowChokePointTraffic(false)
  }

  const handleChokePointSelect = chokePointId => {
    setSelectedChokePoint(chokePointId)
    setSelectedCountry(null)
  }

  useEffect(() => {
  const validCountries = localCountries
    .filter(country => {
      const latitude = country?.latlng?.[0]
      const longitude = country?.latlng?.[1]

      return (
        typeof country?.cca3 === 'string' &&
        typeof country?.name?.common === 'string' &&
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)
      )
    })
    .sort((a, b) => a.name.common.localeCompare(b.name.common))

  setCountries(validCountries)
  setLoading(false)
}, [])

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const filteredCountries = countries.filter(country => {
    const commonName = country.name?.common?.toLowerCase() ?? ''
    const officialName = country.name?.official?.toLowerCase() ?? ''

    const matchesSearch =
      commonName.includes(normalizedSearchQuery) ||
      officialName.includes(normalizedSearchQuery)

    const matchesRegion =
      regionFilter.length === 0 || country.region === regionFilter

    let matchesOrganization = true

    if (selectedOrganization) {
      const organizationKey = selectedOrganization
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')

      const organizationMembers = geopoliticalData[organizationKey] ?? []

      matchesOrganization = organizationMembers.includes(country.cca3)
    }

    return matchesSearch && matchesRegion && matchesOrganization
  })

  const regions = [
    ...new Set(countries.map(country => country.region).filter(Boolean)),
  ].sort()

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
          bilateralRelationTypes={bilateralRelationTypes}
          setBilateralRelationTypes={setBilateralRelationTypes}
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
          selectedChokePoint={selectedChokePoint}
          showChokePointTraffic={showChokePointTraffic}
          setShowChokePointTraffic={setShowChokePointTraffic}
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
          allCountries={countries}
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
          loading={loading}
          error={countriesError}
          showBilateralRelations={showBilateralRelations}
          bilateralRelationTypes={bilateralRelationTypes}
          showResources={showResources}
          showMilitary={showMilitary}
          showTradeBlocs={showTradeBlocs}
          showDisputes={showDisputes}
          showChokePoints={showChokePoints}
          selectedChokePoint={selectedChokePoint}
          onChokePointSelect={handleChokePointSelect}
          showEnergyIndependence={showEnergyIndependence}
          mapType={mapType}
          onMapTypeChange={setMapType}
        />
      </div>

      {showInfoPanel && (
        <InfoPanel
          country={selectedCountry}
          onClose={() => handleCountrySelect(null)}
          countries={countries}
          onCountrySelect={handleCountrySelect}
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
          showBilateralRelations={showBilateralRelations}
          onDeepDive={() => setShowDeepDive(true)}
          selectedChokePoint={selectedChokePoint}
          showChokePointTraffic={showChokePointTraffic}
          onChokePointClose={() => handleChokePointSelect(null)}
        />
      )}

      {!showCommandPanel && (
        <button
          className="panel-toggle panel-toggle-left"
          onClick={() => setShowCommandPanel(true)}
          title="Show Commands Panel"
          type="button"
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
          type="button"
        >
          <ChevronLeft size={18} />
          <span className="toggle-label">Info</span>
        </button>
      )}

      {showDeepDive && selectedCountry && (
        <DeepDive
          country={selectedCountry}
          onClose={() => setShowDeepDive(false)}
          allCountries={countries}
        />
      )}
    </div>
  )
}

export default App

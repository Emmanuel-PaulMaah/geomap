import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Moon, Sun, Satellite, Mountain, Map } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import './WorldMap.css'
import BorderHighlight from './BorderHighlight'
import BilateralLines from './BilateralLines'
import RelatedCountriesHighlight from './RelatedCountriesHighlight'
import MilitaryVisualization from './MilitaryVisualization'
import DisputeMarkers from './DisputeMarkers'
import ChokePointMarkers from './ChokePointMarkers'
import EnergyVisualization, { EnergyMarkerColor } from './EnergyVisualization'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const createCountryIcon = (isSelected) => {
  return L.divIcon({
    className: 'country-marker',
    html: `<div class="marker-inner ${isSelected ? 'selected' : ''}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

function MapController({ center, zoom, onZoomChange }) {
  const map = useMap()
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom())
    }
    
    map.on('zoom', handleZoom)
    return () => map.off('zoom', handleZoom)
  }, [map, onZoomChange])
  
  return null
}

// Map type configurations
const MAP_TYPES = {
  dark: {
    name: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    icon: Moon
  },
  light: {
    name: 'Light',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    icon: Sun
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, DigitalGlobe, Earthstar Geographics, and the GIS User Community',
    icon: Satellite
  },
  terrain: {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors',
    icon: Mountain
  },
  street: {
    name: 'Street',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    icon: Map
  }
}

function WorldMap({ 
  countries, selectedCountry, onCountrySelect, loading,
  showBilateralRelations, bilateralRelationTypes, showResources, showMilitary, showTradeBlocs, showDisputes,
  showChokePoints, selectedChokePoint, onChokePointSelect, showEnergyIndependence,
  mapType, onMapTypeChange
}) {
  const [mapCenter, setMapCenter] = useState([20, 0])
  const [mapZoom, setMapZoom] = useState(2)
  const [currentZoom, setCurrentZoom] = useState(2)

  const getMarkerSize = (zoom) => {
    // Scale marker size based on zoom level
    // At zoom 2: 10px, at zoom 5: 16px, at zoom 10: 24px
    const baseSize = 10 + (zoom - 2) * 2
    return Math.max(baseSize, 8)
  }

  // Get related countries highlighting
  const relatedHelper = RelatedCountriesHighlight({ selectedCountry, countries })

  useEffect(() => {
    if (selectedCountry?.latlng) {
      setMapCenter([selectedCountry.latlng[0], selectedCountry.latlng[1]])
      setMapZoom(5)
    }
  }, [selectedCountry])

  if (loading) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <p>Loading world data...</p>
      </div>
    )
  }

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={mapZoom} 
      className="world-map"
      minZoom={2}
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        key={mapType}
        attribution={MAP_TYPES[mapType].attribution}
        url={MAP_TYPES[mapType].url}
      />
      <MapController center={mapCenter} zoom={mapZoom} onZoomChange={setCurrentZoom} />
      <BorderHighlight selectedCountry={selectedCountry} />
      {showBilateralRelations && <BilateralLines countries={countries} selectedCountry={selectedCountry} bilateralRelationTypes={bilateralRelationTypes} />}
      {showMilitary && <MilitaryVisualization countries={countries} selectedCountry={selectedCountry} />}
      {showDisputes && <DisputeMarkers selectedCountry={selectedCountry} />}
      {showChokePoints && <ChokePointMarkers selectedChokePoint={selectedChokePoint} onChokePointSelect={onChokePointSelect} />}
      {showEnergyIndependence && <EnergyVisualization countries={countries} />}
      
      {countries.map((country) => {
        if (!country.latlng || country.latlng.length < 2) return null
        
        const isSelected = selectedCountry?.cca3 === country.cca3
        const markerSize = getMarkerSize(currentZoom)
        const relationshipType = relatedHelper.getRelationshipType(country.cca3)
        const relationshipColor = relatedHelper.getRelationshipColor(country.cca3)
        
        return (
          <Marker
            key={country.cca3}
            position={[country.latlng[0], country.latlng[1]]}
            icon={L.divIcon({
              className: 'country-marker',
              html: `<div class="marker-inner ${isSelected ? 'selected' : ''} ${relationshipType ? `related-${relationshipType}` : ''}"></div>`,
              iconSize: [markerSize, markerSize],
              iconAnchor: [markerSize / 2, markerSize / 2]
            })}
            eventHandlers={{
              click: () => onCountrySelect(country)
            }}
          >
            <Popup>
              <div className="popup-content">
                <img src={country.flags?.png} alt="" className="popup-flag" />
                <strong>{country.name.common}</strong>
                <span>{country.region}</span>
              </div>
            </Popup>
          </Marker>
        )
      })}
      
      {/* Map Type Control */}
       <div className="map-type-control">
         {Object.entries(MAP_TYPES).map(([key, type]) => {
           const IconComponent = type.icon
           return (
             <button
               key={key}
               className={`map-type-btn ${mapType === key ? 'active' : ''}`}
               onClick={() => onMapTypeChange(key)}
               title={type.name}
             >
               <span className="map-type-icon"><IconComponent size={16} /></span>
               <span className="map-type-label">{type.name}</span>
             </button>
           )
         })}
       </div>
      </MapContainer>
      )
}

export default WorldMap
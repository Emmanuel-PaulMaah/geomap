import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { getBilateralRelations, relationshipColors } from '../data/bilateral'

function BilateralLines({ countries, selectedCountry, bilateralRelationTypes }) {
  const map = useMap()

  useEffect(() => {
    if (!selectedCountry?.cca3) {
      // Clear all lines if no country selected
      map.eachLayer(layer => {
        if (layer instanceof L.Polyline && !layer._isBaseLayer) {
          map.removeLayer(layer)
        }
      })
      return
    }

    // Get relations for selected country
    const relations = getBilateralRelations(selectedCountry.cca3)
    
    // Create lines for each relation
    relations.forEach(relation => {
      const [cca3_1, cca3_2, relType, desc] = relation
      
      // Skip if this relation type is not selected
      if (!bilateralRelationTypes[relType]) {
        return
      }
      
      const otherCca3 = selectedCountry.cca3 === cca3_1 ? cca3_2 : cca3_1
      
      // Find the other country
      const otherCountry = countries.find(c => c.cca3 === otherCca3)
      if (!otherCountry?.latlng) return

      const from = selectedCountry.latlng
      const to = otherCountry.latlng

      // Create polyline with glow effect
      const line = L.polyline([from, to], {
        color: relationshipColors[relType] || relationshipColors.neutral,
        weight: 3,
        opacity: 1,
        dashArray: relType === 'adversary' ? '6, 4' : '0',
        lineCap: 'round',
        lineJoin: 'round',
        interactive: true,
        className: `bilateral-line bilateral-${relType}`
      })

      // Popup on hover
      line.bindPopup(`
        <div style="font-size: 12px;">
          <strong>${selectedCountry.name.common} ↔ ${otherCountry.name.common}</strong><br/>
          <span style="color: ${relationshipColors[relType]}">${relType.toUpperCase()}</span><br/>
          ${desc}
        </div>
      `)

      line.addTo(map)
      line.bringToBack()
    })

    return () => {
      // Cleanup lines on unmount
      map.eachLayer(layer => {
        if (layer instanceof L.Polyline && !layer._isBaseLayer) {
          map.removeLayer(layer)
        }
      })
    }
  }, [selectedCountry, map, countries, bilateralRelationTypes])

  return null
}

export default BilateralLines

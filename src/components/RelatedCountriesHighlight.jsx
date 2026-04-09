import { useMemo } from 'react'
import { getBilateralRelations, relationshipColors } from '../data/bilateral'

function RelatedCountriesHighlight({ selectedCountry }) {
  const relatedCountriesMap = useMemo(() => {
    if (!selectedCountry?.cca3) return {}
    
    const relations = getBilateralRelations(selectedCountry.cca3)
    const map = {}
    
    relations.forEach(relation => {
      const [cca3_1, cca3_2, relType] = relation
      const otherCca3 = selectedCountry.cca3 === cca3_1 ? cca3_2 : cca3_1
      map[otherCca3] = relType
    })
    
    return map
  }, [selectedCountry])

  // Return object with helper function
  return {
    getRelationshipType: (cca3) => relatedCountriesMap[cca3] || null,
    getRelationshipColor: (cca3) => relationshipColors[relatedCountriesMap[cca3]] || null,
    isRelated: (cca3) => cca3 in relatedCountriesMap
  }
}

export default RelatedCountriesHighlight

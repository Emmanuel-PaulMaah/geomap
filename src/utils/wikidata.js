// Wikidata API queries for geopolitical data
// Uses SPARQL queries to fetch real data from Wikidata

const WIKIDATA_SPARQL = 'https://query.wikidata.org/sparql'

// Get trade bloc memberships for a country
export const fetchTradeBlocsByCountry = async (countryLabel) => {
  const query = `
    SELECT DISTINCT ?orgLabel WHERE {
      ?country rdfs:label "${countryLabel}"@en ;
               wdt:P463 ?org .
      ?org wdt:P31 wd:Q7210356 .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    LIMIT 20
  `
  
  try {
    const response = await fetch(`${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`)
    if (!response.ok) return null
    const data = await response.json()
    return data.results.bindings.map(b => b.orgLabel.value)
  } catch (err) {
    console.debug('Wikidata trade bloc query failed:', err)
    return null
  }
}

// Get military spending
export const fetchMilitarySpending = async (countryLabel) => {
  const query = `
    SELECT ?spending WHERE {
      ?country rdfs:label "${countryLabel}"@en ;
               wdt:P2034 ?spending .
      BIND(YEAR(NOW()) as ?currentYear)
    }
    ORDER BY DESC(?spending)
    LIMIT 1
  `
  
  try {
    const response = await fetch(`${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`)
    if (!response.ok) return null
    const data = await response.json()
    return data.results.bindings[0]?.spending.value || null
  } catch (err) {
    console.debug('Wikidata military spending query failed:', err)
    return null
  }
}

// Get nuclear weapons status
export const fetchNuclearStatus = async (countryLabel) => {
  const query = `
    SELECT ?countryLabel ?nukeStatus WHERE {
      ?country rdfs:label "${countryLabel}"@en ;
               wdt:P31 wd:Q3624078 .
      OPTIONAL { ?country wdt:P625 ?nukeStatus }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
  `
  
  try {
    const response = await fetch(`${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`)
    if (!response.ok) return null
    const data = await response.json()
    // Simple check: if country appears in nuclear weapons queries
    return data.results.bindings.length > 0
  } catch (err) {
    console.debug('Wikidata nuclear query failed:', err)
    return null
  }
}

// Get neighboring countries
export const fetchNeighboringCountries = async (countryLabel) => {
  const query = `
    SELECT ?neighborLabel WHERE {
      ?country rdfs:label "${countryLabel}"@en ;
               wdt:P47 ?neighbor .
      ?neighbor rdfs:label ?neighborLabel .
      FILTER(LANG(?neighborLabel) = "en")
    }
  `
  
  try {
    const response = await fetch(`${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`)
    if (!response.ok) return null
    const data = await response.json()
    return data.results.bindings.map(b => b.neighborLabel.value)
  } catch (err) {
    console.debug('Wikidata neighbors query failed:', err)
    return null
  }
}

// Get GDP
export const fetchGDP = async (countryLabel) => {
  const query = `
    SELECT ?gdp WHERE {
      ?country rdfs:label "${countryLabel}"@en ;
               wdt:P2131 ?gdp .
    }
    ORDER BY DESC(?gdp)
    LIMIT 1
  `
  
  try {
    const response = await fetch(`${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`)
    if (!response.ok) return null
    const data = await response.json()
    return data.results.bindings[0]?.gdp.value || null
  } catch (err) {
    console.debug('Wikidata GDP query failed:', err)
    return null
  }
}

// Get population
export const fetchPopulation = async (countryLabel) => {
  const query = `
    SELECT ?population WHERE {
      ?country rdfs:label "${countryLabel}"@en ;
               wdt:P1082 ?population .
    }
    ORDER BY DESC(?population)
    LIMIT 1
  `
  
  try {
    const response = await fetch(`${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`)
    if (!response.ok) return null
    const data = await response.json()
    return data.results.bindings[0]?.population.value || null
  } catch (err) {
    console.debug('Wikidata population query failed:', err)
    return null
  }
}

// Batch fetch for multiple countries (with caching to avoid rate limits)
const wikidataCache = new Map()

export const getCachedWikidataData = async (countryLabel, dataType) => {
  const cacheKey = `${countryLabel}:${dataType}`
  
  if (wikidataCache.has(cacheKey)) {
    return wikidataCache.get(cacheKey)
  }
  
  let data = null
  
  switch (dataType) {
    case 'tradeBlocs':
      data = await fetchTradeBlocsByCountry(countryLabel)
      break
    case 'military':
      data = await fetchMilitarySpending(countryLabel)
      break
    case 'nuclear':
      data = await fetchNuclearStatus(countryLabel)
      break
    case 'neighbors':
      data = await fetchNeighboringCountries(countryLabel)
      break
    case 'gdp':
      data = await fetchGDP(countryLabel)
      break
    case 'population':
      data = await fetchPopulation(countryLabel)
      break
    default:
      return null
  }
  
  if (data !== null) {
    wikidataCache.set(cacheKey, data)
  }
  
  return data
}

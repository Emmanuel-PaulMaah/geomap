// Critical resources exports/imports
// Format: { cca3, resourceType, role: 'exporter'|'importer', quantity: relative importance (1-10) }

export const resourceData = {
  // OIL & GAS
  oil: [
    { cca3: 'SAU', role: 'exporter', quantity: 10, note: 'World largest exporter' },
    { cca3: 'RUS', role: 'exporter', quantity: 9, note: 'Major exporter, Europe dependent' },
    { cca3: 'IRN', role: 'exporter', quantity: 7, note: 'Sanctioned, exports to China' },
    { cca3: 'ARE', role: 'exporter', quantity: 8, note: 'Gulf producer' },
    { cca3: 'IRQ', role: 'exporter', quantity: 7, note: 'OPEC member' },
    { cca3: 'KWT', role: 'exporter', quantity: 7, note: 'OPEC member' },
    { cca3: 'NGA', role: 'exporter', quantity: 6, note: 'Africa largest' },
    { cca3: 'VEN', role: 'exporter', quantity: 5, note: 'Largest reserves, collapsed production' },
    { cca3: 'USA', role: 'exporter', quantity: 7, note: 'Shale boom, net exporter' },
    { cca3: 'MEX', role: 'exporter', quantity: 5, note: 'USMCA member' },
    
    // Importers
    { cca3: 'USA', role: 'importer', quantity: 6, note: 'Imports despite production' },
    { cca3: 'CHN', role: 'importer', quantity: 10, note: 'Largest importer, economy dependent' },
    { cca3: 'IND', role: 'importer', quantity: 8, note: 'Rapid growth, major importer' },
    { cca3: 'JPN', role: 'importer', quantity: 8, note: 'No domestic reserves' },
    { cca3: 'KOR', role: 'importer', quantity: 7, note: 'No domestic reserves' },
    { cca3: 'DEU', role: 'importer', quantity: 8, note: 'Was Russia dependent (80%)' },
    { cca3: 'ITA', role: 'importer', quantity: 7, note: 'European dependence' },
    { cca3: 'FRA', role: 'importer', quantity: 6, note: 'Diversified sources' },
    { cca3: 'GBR', role: 'importer', quantity: 6, note: 'Declining North Sea' },
    { cca3: 'SGP', role: 'importer', quantity: 7, note: 'Refining hub' },
  ],

  // NATURAL GAS
  gas: [
    { cca3: 'RUS', role: 'exporter', quantity: 10, note: 'Pipeline to Europe, sanctioned' },
    { cca3: 'QAT', role: 'exporter', quantity: 9, note: 'LNG superpower' },
    { cca3: 'AUS', role: 'exporter', quantity: 8, note: 'LNG major exporter' },
    { cca3: 'USA', role: 'exporter', quantity: 8, note: 'LNG boom' },
    { cca3: 'IDN', role: 'exporter', quantity: 6, note: 'Asian supplier' },
    { cca3: 'MYS', role: 'exporter', quantity: 6, note: 'Regional exporter' },
    
    { cca3: 'DEU', role: 'importer', quantity: 9, note: 'Was heavily Russia dependent' },
    { cca3: 'ITA', role: 'importer', quantity: 8, note: 'Energy security concern' },
    { cca3: 'GBR', role: 'importer', quantity: 7, note: 'LNG and pipeline imports' },
    { cca3: 'JPN', role: 'importer', quantity: 9, note: 'LNG dependent' },
    { cca3: 'KOR', role: 'importer', quantity: 8, note: 'LNG dependent' },
    { cca3: 'CHN', role: 'importer', quantity: 8, note: 'Growing demand' },
  ],

  // RARE EARTH MINERALS
  rareEarth: [
    { cca3: 'CHN', role: 'exporter', quantity: 10, note: '90% world production, export controls' },
    { cca3: 'USA', role: 'exporter', quantity: 5, note: 'Mining revival, strategic interest' },
    { cca3: 'MYS', role: 'exporter', quantity: 4, note: 'Minor producer' },
    { cca3: 'AUS', role: 'exporter', quantity: 6, note: 'Lynas Rare Earths' },
    
    { cca3: 'USA', role: 'importer', quantity: 9, note: 'Defense, tech dependent on China' },
    { cca3: 'JPN', role: 'importer', quantity: 8, note: 'Electronics, magnets' },
    { cca3: 'DEU', role: 'importer', quantity: 8, note: 'EV batteries, wind turbines' },
    { cca3: 'KOR', role: 'importer', quantity: 7, note: 'Electronics' },
    { cca3: 'GBR', role: 'importer', quantity: 6, note: 'Green energy' },
  ],

  // SEMICONDUCTORS & CHIPS
  semiconductors: [
    { cca3: 'TWN', role: 'exporter', quantity: 10, note: 'TSMC - 50%+ global advanced chips' },
    { cca3: 'KOR', role: 'exporter', quantity: 9, note: 'Samsung, SK Hynix - memory chips' },
    { cca3: 'USA', role: 'exporter', quantity: 8, note: 'Intel, AMD design, TSMC reliance' },
    { cca3: 'JPN', role: 'exporter', quantity: 7, note: 'Mature nodes, equipment' },
    { cca3: 'NLD', role: 'exporter', quantity: 7, note: 'ASML - chip equipment' },
    { cca3: 'IDN', role: 'exporter', quantity: 5, note: 'Assembly and packaging' },
    { cca3: 'MYS', role: 'exporter', quantity: 5, note: 'Assembly and testing' },
    
    { cca3: 'USA', role: 'importer', quantity: 10, note: 'Completely dependent, Taiwan risk' },
    { cca3: 'CHN', role: 'importer', quantity: 10, note: 'Tech independence goal, sanctioned' },
    { cca3: 'DEU', role: 'importer', quantity: 9, note: 'Auto industry dependent' },
    { cca3: 'JPN', role: 'importer', quantity: 8, note: 'Consumer electronics' },
    { cca3: 'GBR', role: 'importer', quantity: 7, note: 'Defense, tech' },
    { cca3: 'EU', role: 'importer', quantity: 9, note: 'Strategic vulnerability' },
  ],

  // FOOD
  food: [
    { cca3: 'USA', role: 'exporter', quantity: 9, note: 'Corn, wheat, soy, meat' },
    { cca3: 'BRA', role: 'exporter', quantity: 8, note: 'Soy, beef, coffee' },
    { cca3: 'ARG', role: 'exporter', quantity: 7, note: 'Wheat, beef, soy' },
    { cca3: 'UKR', role: 'exporter', quantity: 8, note: 'Wheat, corn - Ukraine war disrupted' },
    { cca3: 'RUS', role: 'exporter', quantity: 7, note: 'Wheat - major supplier' },
    { cca3: 'IDN', role: 'exporter', quantity: 6, note: 'Palm oil - deforestation' },
    { cca3: 'THA', role: 'exporter', quantity: 6, note: 'Rice, seafood' },
    { cca3: 'VNM', role: 'exporter', quantity: 6, note: 'Rice, coffee, seafood' },
    { cca3: 'AUS', role: 'exporter', quantity: 6, note: 'Wheat, beef' },
    { cca3: 'NZL', role: 'exporter', quantity: 5, note: 'Dairy, beef' },
    
    { cca3: 'CHN', role: 'importer', quantity: 10, note: 'Population, imports 70% soy' },
    { cca3: 'IND', role: 'importer', quantity: 8, note: 'Population growth' },
    { cca3: 'EGY', role: 'importer', quantity: 8, note: 'Wheat dependent, food security risk' },
    { cca3: 'MENA', role: 'importer', quantity: 7, note: 'Middle East/North Africa - vulnerable' },
    { cca3: 'JPN', role: 'importer', quantity: 7, note: 'Food security concern' },
    { cca3: 'GBR', role: 'importer', quantity: 6, note: 'Post-Brexit supply chains' },
  ],

  // STRATEGIC MINERALS (Lithium, Cobalt, etc.)
  strategicMinerals: [
    { cca3: 'CHI', role: 'exporter', quantity: 9, note: 'Lithium - EV batteries' },
    { cca3: 'AUS', role: 'exporter', quantity: 8, note: 'Lithium, cobalt' },
    { cca3: 'DRC', role: 'exporter', quantity: 9, note: 'Cobalt 70% supply - war zone' },
    { cca3: 'IDN', role: 'exporter', quantity: 8, note: 'Nickel - EV batteries' },
    { cca3: 'ZAF', role: 'exporter', quantity: 7, note: 'Platinum, palladium' },
    { cca3: 'RUS', role: 'exporter', quantity: 7, note: 'Palladium, neon gas' },
    
    { cca3: 'CHN', role: 'importer', quantity: 10, note: 'Battery/EV dominance' },
    { cca3: 'USA', role: 'importer', quantity: 10, note: 'EV transition dependent' },
    { cca3: 'DEU', role: 'importer', quantity: 9, note: 'EV industry' },
    { cca3: 'JPN', role: 'importer', quantity: 8, note: 'Electronics, EV' },
    { cca3: 'KOR', role: 'importer', quantity: 8, note: 'Batteries, electronics' },
  ]
}

export const resourceColors = {
  oil: '#2C3E50',          // Dark gray-blue
  gas: '#3498DB',         // Blue
  rareEarth: '#E74C3C',   // Red
  semiconductors: '#9B59B6', // Purple
  food: '#27AE60',        // Green
  strategicMinerals: '#F39C12' // Orange
}

// Fetch resource data from World Bank API (free, open-source)
// Falls back to local data if API unavailable
const fetchWorldBankData = async (cca3) => {
  try {
    // World Bank's commodity trade API
    // Returns top exports/imports for a country
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${cca3}/indicator/TX.GSP.TOTL.CD?format=json&per_page=1`
    )
    if (!response.ok) return null
    const data = await response.json()
    return data
  } catch (err) {
    console.debug('World Bank API unavailable:', err)
    return null
  }
}

export const getCountryResources = (cca3, resourceType = null) => {
  if (resourceType) {
    return resourceData[resourceType]?.filter(r => r.cca3 === cca3) || []
  }
  
  // Get all resources for country
  const resources = {}
  Object.entries(resourceData).forEach(([type, items]) => {
    const countryItems = items.filter(r => r.cca3 === cca3)
    if (countryItems.length) {
      resources[type] = countryItems
    }
  })
  return resources
}

export const hasResourceData = (cca3) => {
  return Object.values(resourceData).some(items => 
    items.some(item => item.cca3 === cca3)
  )
}

export const getResourceExporters = (resourceType) => {
  return resourceData[resourceType]?.filter(r => r.role === 'exporter') || []
}

export const getResourceImporters = (resourceType) => {
  return resourceData[resourceType]?.filter(r => r.role === 'importer') || []
}

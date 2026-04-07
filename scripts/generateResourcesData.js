import fs from 'fs';

// Public data sources for critical resources
// Source: USGS Mineral Commodity Summaries, IEA Energy Statistics, World Bank

const RESOURCES = {
  oil: {
    exporters: ['SAU', 'RUS', 'IRN', 'ARE', 'IRQ', 'KWT', 'NGA', 'VEN', 'USA', 'MEX', 'BRA', 'AGO', 'COG', 'EQG', 'OMN', 'KAZ'],
    importers: ['USA', 'CHN', 'IND', 'JPN', 'KOR', 'DEU', 'ITA', 'FRA', 'GBR', 'SGP', 'NLD', 'THA'],
    notes: {
      'SAU': { role: 'exporter', note: 'World largest exporter' },
      'RUS': { role: 'exporter', note: 'Major exporter, Europe dependent' },
      'CHN': { role: 'importer', note: 'Largest importer, economy dependent' },
      'IND': { role: 'importer', note: 'Rapid growth, major importer' },
    }
  },
  gas: {
    exporters: ['RUS', 'QAT', 'AUS', 'USA', 'IDN', 'MYS', 'TKM', 'NOR'],
    importers: ['DEU', 'ITA', 'GBR', 'JPN', 'KOR', 'CHN', 'FRA', 'ESP'],
    notes: {
      'QAT': { role: 'exporter', note: 'LNG superpower' },
      'AUS': { role: 'exporter', note: 'LNG major exporter' },
      'JPN': { role: 'importer', note: 'LNG dependent' },
    }
  },
  rareEarth: {
    exporters: ['CHN', 'USA', 'MMR', 'THA', 'VNM', 'BRA'],
    importers: ['JPN', 'KOR', 'DEU', 'USA', 'FRA', 'GBR'],
    notes: {
      'CHN': { role: 'exporter', note: '90% world production, export controls' },
      'USA': { role: 'exporter', note: 'Lynas processing, growing production' },
      'JPN': { role: 'importer', note: 'Manufacturing dependent' },
    }
  },
  semiconductors: {
    exporters: ['TWN', 'KOR', 'USA', 'JPN', 'SGP', 'MYS', 'VNM'],
    importers: ['USA', 'CHN', 'DEU', 'GBR', 'FRA', 'JPN', 'IND', 'MEX'],
    notes: {
      'TWN': { role: 'exporter', note: 'TSMC dominance, geopolitical risk' },
      'KOR': { role: 'exporter', note: 'Samsung, SK Hynix' },
      'CHN': { role: 'importer', note: 'Heavy import dependence' },
    }
  },
  lithium: {
    exporters: ['CHL', 'ARG', 'AUS', 'CHN'],
    importers: ['CHN', 'USA', 'KOR', 'JPN', 'DEU', 'NOR', 'FIN'],
    notes: {
      'CHL': { role: 'exporter', note: 'Lithium Triangle leader' },
      'ARG': { role: 'exporter', note: 'Lithium Triangle member' },
      'AUS': { role: 'exporter', note: 'Spodumene production' },
      'CHN': { role: 'importer', note: 'Battery manufacturing demand' },
    }
  },
  food: {
    exporters: ['USA', 'BRA', 'ARG', 'AUS', 'IDN', 'THA', 'UKR', 'KAZ', 'VNM'],
    importers: ['CHN', 'JPN', 'KOR', 'MEX', 'EGY', 'IDN', 'BGD', 'PHL'],
    notes: {
      'USA': { role: 'exporter', note: 'Grains, meat, agricultural exports' },
      'UKR': { role: 'exporter', note: 'Grains, export critical for global food security' },
      'CHN': { role: 'importer', note: 'Soybean, grain imports critical' },
    }
  }
};

function generateFile(resourceData) {
  const resourceMap = {};

  Object.entries(resourceData).forEach(([resourceType, data]) => {
    // Exporters
    data.exporters.forEach(cca3 => {
      if (!resourceMap[cca3]) resourceMap[cca3] = {};
      if (!resourceMap[cca3][resourceType]) resourceMap[cca3][resourceType] = [];
      
      const note = data.notes[cca3]?.note || `Major ${resourceType} exporter`;
      resourceMap[cca3][resourceType].push({ role: 'exporter', note });
    });

    // Importers
    data.importers.forEach(cca3 => {
      if (!resourceMap[cca3]) resourceMap[cca3] = {};
      if (!resourceMap[cca3][resourceType]) resourceMap[cca3][resourceType] = [];
      
      const note = data.notes[cca3]?.note || `Major ${resourceType} importer`;
      resourceMap[cca3][resourceType].push({ role: 'importer', note });
    });
  });

  const content = `// Auto-generated from public data sources
// Sources: USGS Mineral Commodity Summaries, IEA Energy Statistics, World Bank
// Updated: ${new Date().toISOString()}

export const resourceData = ${JSON.stringify(resourceMap, null, 2)}

export const resourceColors = {
  oil: '#1a1a1a',
  gas: '#FF6B35',
  rareEarth: '#8B4513',
  semiconductors: '#0052CC',
  lithium: '#FFFFFF',
  food: '#228B22'
}

export const getCountryResources = (cca3) => {
  return resourceData[cca3] || {}
}

export const hasResourceData = (cca3) => {
  return Object.keys(resourceData[cca3] || {}).length > 0
}

export const getResourcesByType = (resourceType) => {
  const result = {}
  Object.entries(resourceData).forEach(([cca3, resources]) => {
    if (resources[resourceType]) {
      result[cca3] = resources[resourceType]
    }
  })
  return result
}
`;

  fs.writeFileSync('./src/data/resources.js', content);
  console.log('✓ Generated resources.js with structured resource data');
}

generateFile(RESOURCES);

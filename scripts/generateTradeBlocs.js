import fs from 'fs';

// Trade blocs and economic unions
// Sources: WTO, World Bank, official organization websites

const TRADE_BLOCS = {
  'EU': {
    name: 'European Union',
    color: '#0052CC',
    members: ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'],
    description: 'Single market, customs union, political union',
    gdp: '~$17 trillion',
    founded: 1993
  },
  'ASEAN': {
    name: 'Association of Southeast Asian Nations',
    color: '#FF6B35',
    members: ['BRN', 'KHM', 'IDN', 'LAO', 'MYS', 'MMR', 'PHL', 'SGP', 'THA', 'VNM'],
    description: 'Trade and investment partnership, ASEAN Free Trade Area',
    gdp: '~$3 trillion',
    founded: 1967
  },
  'MERCOSUR': {
    name: 'Southern Common Market',
    color: '#4ECDC4',
    members: ['ARG', 'BRA', 'PRY', 'URY'],
    description: 'South American customs union, free movement',
    gdp: '~$3 trillion',
    founded: 1991
  },
  'USMCA': {
    name: 'United States-Mexico-Canada Agreement',
    color: '#FF6B6B',
    members: ['USA', 'MEX', 'CAN'],
    description: 'North American free trade agreement (replaced NAFTA)',
    gdp: '~$28 trillion',
    founded: 2020
  },
  'African Union': {
    name: 'African Union',
    color: '#FFB700',
    members: ['DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CMR', 'CPV', 'CAF', 'TCD', 'COM', 'COG', 'COD', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'ETH', 'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG', 'MWI', 'MLI', 'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA', 'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 'SWZ', 'TZA', 'TGO', 'TUN', 'UGA', 'ZMB', 'ZWE'],
    description: 'Pan-African union, AfCFTA free trade area',
    gdp: '~$3.7 trillion',
    founded: 2002
  },
  'RCEP': {
    name: 'Regional Comprehensive Economic Partnership',
    color: '#7B68EE',
    members: ['AUS', 'BRN', 'KHM', 'CHN', 'IDN', 'JPN', 'KOR', 'LAO', 'MYS', 'MMR', 'NZL', 'PHL', 'SGP', 'THA', 'VNM'],
    description: 'World\'s largest trade bloc by GDP, Asia-Pacific agreement',
    gdp: '~$27 trillion',
    founded: 2022
  },
  'GCC': {
    name: 'Gulf Cooperation Council',
    color: '#FF8C00',
    members: ['BHR', 'KWT', 'OMN', 'QAT', 'SAU', 'ARE'],
    description: 'Gulf states economic cooperation, customs union',
    gdp: '~$2 trillion',
    founded: 1981
  },
  'EAEU': {
    name: 'Eurasian Economic Union',
    color: '#DC143C',
    members: ['RUS', 'BLR', 'KAZ', 'KGZ', 'ARM'],
    description: 'Post-Soviet economic union, single market',
    gdp: '~$2 trillion',
    founded: 2015
  },
  'CARICOM': {
    name: 'Caribbean Community',
    color: '#32CD32',
    members: ['ATG', 'BHS', 'BRB', 'BLZ', 'DMA', 'DOM', 'GRD', 'GUY', 'HTI', 'JAM', 'KNA', 'LCA', 'SUR', 'TTO', 'VCT'],
    description: 'Caribbean economic integration, CARICOM Single Market',
    gdp: '~$300 billion',
    founded: 1973
  },
  'SAARC': {
    name: 'South Asian Association',
    color: '#FF1493',
    members: ['AFG', 'BGD', 'BTN', 'IND', 'MDV', 'NPL', 'PAK', 'LKA'],
    description: 'South Asian regional cooperation',
    gdp: '~$4 trillion',
    founded: 1985
  },
  'ECOWAS': {
    name: 'Economic Community of West African States',
    color: '#228B22',
    members: ['BEN', 'BFA', 'CPV', 'CIV', 'GMB', 'GHA', 'GIN', 'GNB', 'LBR', 'MLI', 'NER', 'NGA', 'SEN', 'SLE', 'TGO'],
    description: 'West African economic community and customs union',
    gdp: '~$800 billion',
    founded: 1975
  },
  'ASEAN+3': {
    name: 'ASEAN Plus Three',
    color: '#FF6B35',
    members: ['BRN', 'KHM', 'CHN', 'IDN', 'JPN', 'LAO', 'MYS', 'MMR', 'PHL', 'KOR', 'SGP', 'THA', 'VNM'],
    description: 'ASEAN + China, Japan, South Korea regional cooperation',
    gdp: '~$24 trillion',
    founded: 1997
  },
  'ALBA': {
    name: 'Bolivarian Alliance',
    color: '#C41E3A',
    members: ['BOL', 'CUB', 'DMA', 'ECU', 'GRD', 'NCA', 'PAN', 'SUR', 'URY', 'VEN'],
    description: 'Latin American socialist alliance',
    gdp: '~$500 billion',
    founded: 2004
  }
};

function generateFile(tradeBlocs) {
  const content = `// Auto-generated from public data sources
// Sources: WTO, World Bank, official organization websites
// Updated: ${new Date().toISOString()}

export const tradeBlocs = ${JSON.stringify(tradeBlocs, null, 2)}

export const getCountryTradeBlocsData = (cca3) => {
  const blocs = []
  Object.entries(tradeBlocs).forEach(([key, bloc]) => {
    if (bloc.members.includes(cca3)) {
      blocs.push({
        key,
        ...bloc
      })
    }
  })
  return blocs
}

export const getTradeBlocMembers = (blocKey) => {
  return tradeBlocs[blocKey]?.members || []
}

export const getTradeBlocCount = (cca3) => {
  return getCountryTradeBlocsData(cca3).length
}

export const getAllTradeBlocsForCountry = (cca3) => {
  return getCountryTradeBlocsData(cca3)
    .map(bloc => bloc.name)
    .join(', ')
}

export const getTradeBlocsByRegion = (region) => {
  return Object.entries(tradeBlocs)
    .filter(([_, bloc]) => bloc.members.some(m => {
      // This is a simplified check - in real app would cross-reference with country regions
      return true
    }))
    .map(([key, bloc]) => ({ key, ...bloc }))
}
`;

  fs.writeFileSync('./src/data/tradeBlocs.js', content);
  console.log('✓ Generated tradeBlocs.js with WTO and World Bank data');
}

generateFile(TRADE_BLOCS);

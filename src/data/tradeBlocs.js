// Trade blocs and economic unions membership
// Fallback data when Wikidata API unavailable
export const tradeBlocs = {
  'EU': {
    name: 'European Union',
    color: '#0052CC',
    members: ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'],
    description: 'Single market, customs union',
    gdp: '~$17 trillion'
  },
  'ASEAN': {
    name: 'Association of Southeast Asian Nations',
    color: '#FF6B35',
    members: ['BRN', 'KHM', 'IDN', 'LAO', 'MYS', 'MMR', 'PHL', 'SGP', 'THA', 'VNM'],
    description: 'Trade and investment partnership',
    gdp: '~$3 trillion'
  },
  'MERCOSUR': {
    name: 'Southern Common Market',
    color: '#4ECDC4',
    members: ['ARG', 'BRA', 'PRY', 'URY'],
    description: 'South American customs union',
    gdp: '~$3 trillion'
  },
  'USMCA': {
    name: 'United States-Mexico-Canada Agreement',
    color: '#FF6B6B',
    members: ['USA', 'MEX', 'CAN'],
    description: 'Replaces NAFTA, free trade',
    gdp: '~$28 trillion'
  },
  'African Union': {
    name: 'African Union',
    color: '#FFB700',
    members: ['DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CMR', 'CPV', 'CAF', 'TCD', 'COM', 'COG', 'COD', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'ETH', 'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG', 'MWI', 'MLI', 'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA', 'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 'SWZ', 'TZA', 'TGO', 'TUN', 'UGA', 'ZMB', 'ZWE'],
    description: 'Pan-African trade and development',
    gdp: '~$3.7 trillion'
  },
  'RCEP': {
    name: 'Regional Comprehensive Economic Partnership',
    color: '#7B68EE',
    members: ['AUS', 'BRN', 'KHM', 'CHN', 'IDN', 'JPN', 'KOR', 'LAO', 'MYS', 'MMR', 'NZL', 'PHL', 'SGP', 'THA', 'VNM'],
    description: 'World\'s largest trade bloc by GDP',
    gdp: '~$27 trillion'
  },
  'GCC': {
    name: 'Gulf Cooperation Council',
    color: '#FF8C00',
    members: ['BHR', 'KWT', 'OMN', 'QAT', 'SAU', 'ARE'],
    description: 'Gulf states economic cooperation',
    gdp: '~$2 trillion'
  },
  'EAEU': {
    name: 'Eurasian Economic Union',
    color: '#DC143C',
    members: ['RUS', 'BLR', 'KAZ', 'KGZ', 'ARM'],
    description: 'Post-Soviet economic union',
    gdp: '~$2 trillion'
  },
  'CARICOM': {
    name: 'Caribbean Community',
    color: '#32CD32',
    members: ['ATG', 'BHS', 'BRB', 'BLZ', 'DMA', 'DOM', 'GRD', 'GUY', 'HTI', 'JAM', 'KNA', 'LCA', 'SUR', 'TTO', 'VCT'],
    description: 'Caribbean economic integration',
    gdp: '~$300 billion'
  },
  'SAARC': {
    name: 'South Asian Association',
    color: '#FF1493',
    members: ['AFG', 'BGD', 'BTN', 'IND', 'MDV', 'NPL', 'PAK', 'LKA'],
    description: 'South Asian regional cooperation',
    gdp: '~$4 trillion'
  }
}

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

// Dynamic fetching from Wikidata with fallback
export const getCountryTradeBlocsDataDynamic = async (countryLabel) => {
  try {
    const { getCachedWikidataData } = await import('../utils/wikidata')
    const wikidataBlocs = await getCachedWikidataData(countryLabel, 'tradeBlocs')
    
    if (wikidataBlocs && wikidataBlocs.length > 0) {
      // Map Wikidata labels to our bloc data
      return wikidataBlocs
        .map(label => {
          // Try to find matching bloc in our database
          for (const [key, bloc] of Object.entries(tradeBlocs)) {
            if (bloc.name.toLowerCase().includes(label.toLowerCase()) || 
                label.toLowerCase().includes(bloc.name.toLowerCase())) {
              return { key, ...bloc }
            }
          }
          // Return custom bloc if not found
          return {
            key: label,
            name: label,
            color: '#999999',
            members: [],
            description: 'International organization'
          }
        })
        .filter(b => b)
    }
  } catch (err) {
    console.debug('Wikidata fetch failed, using fallback:', err)
  }
  
  // Fallback to hardcoded data
  return getCountryTradeBlocsData(countryLabel)
}

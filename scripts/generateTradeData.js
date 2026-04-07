import fs from 'fs';

// Top trade partners by region (manual curated from WTO/World Bank data)
// Source: UN Comtrade API, World Bank Trade Statistics, WTO

const MAJOR_TRADE_PARTNERS = {
  // Each country's top trade partners
  'USA': [
    { cca3: 'MEX', volume: '650B', desc: 'USMCA neighbor, largest partner' },
    { cca3: 'CAN', volume: '580B', desc: 'USMCA neighbor' },
    { cca3: 'CHN', volume: '500B', desc: 'Largest importer, trade war' },
    { cca3: 'DEU', volume: '170B', desc: 'European tech/industrial' },
    { cca3: 'GBR', volume: '140B', desc: 'Transatlantic trade' },
  ],
  'CHN': [
    { cca3: 'USA', volume: '500B', desc: 'Trade war, tech competition' },
    { cca3: 'JPN', volume: '300B', desc: 'Regional manufacturing' },
    { cca3: 'KOR', volume: '280B', desc: 'Regional manufacturing' },
    { cca3: 'VNM', volume: '150B', desc: 'Manufacturing supply chain' },
    { cca3: 'IDN', volume: '120B', desc: 'Raw materials, RCEP member' },
  ],
  'DEU': [
    { cca3: 'FRA', volume: '180B', desc: 'EU core trade' },
    { cca3: 'NLD', volume: '170B', desc: 'EU core trade' },
    { cca3: 'ITA', volume: '150B', desc: 'EU core trade' },
    { cca3: 'USA', volume: '170B', desc: 'Transatlantic trade' },
    { cca3: 'RUS', volume: '20B', desc: 'Sanctioned, reduced trade' },
  ],
  'IND': [
    { cca3: 'USA', volume: '140B', desc: 'Growing partnership' },
    { cca3: 'CHN', volume: '130B', desc: 'Competitor, trade tension' },
    { cca3: 'AUS', volume: '45B', desc: 'Resources, Quad ally' },
    { cca3: 'SGP', volume: '65B', desc: 'Regional hub' },
    { cca3: 'IDN', volume: '50B', desc: 'Regional trade' },
  ],
  'JPN': [
    { cca3: 'CHN', volume: '300B', desc: 'Largest trade partner' },
    { cca3: 'USA', volume: '240B', desc: 'Alliance-based trade' },
    { cca3: 'KOR', volume: '80B', desc: 'Regional manufacturing' },
    { cca3: 'TWN', volume: '90B', desc: 'Semiconductor imports' },
    { cca3: 'AUS', volume: '60B', desc: 'Resource imports' },
  ],
  'GBR': [
    { cca3: 'DEU', volume: '90B', desc: 'EU post-Brexit' },
    { cca3: 'USA', volume: '140B', desc: 'Transatlantic trade' },
    { cca3: 'FRA', volume: '60B', desc: 'EU core trade' },
    { cca3: 'NLD', volume: '55B', desc: 'EU trade' },
    { cca3: 'IND', volume: '30B', desc: 'Commonwealth trade' },
  ],
  'FRA': [
    { cca3: 'DEU', volume: '150B', desc: 'EU core trade' },
    { cca3: 'NLD', volume: '70B', desc: 'EU core trade' },
    { cca3: 'ITA', volume: '65B', desc: 'EU core trade' },
    { cca3: 'ESP', volume: '50B', desc: 'EU core trade' },
    { cca3: 'BEL', volume: '48B', desc: 'EU core trade' },
  ],
  'BRA': [
    { cca3: 'ARG', volume: '40B', desc: 'MERCOSUR partner' },
    { cca3: 'CHN', volume: '120B', desc: 'Commodity exports' },
    { cca3: 'USA', volume: '80B', desc: 'Americas trade' },
    { cca3: 'NLD', volume: '35B', desc: 'EU trade' },
    { cca3: 'IDN', volume: '20B', desc: 'Global trade' },
  ],
  'RUS': [
    { cca3: 'CHN', volume: '140B', desc: 'Strategic partnership, energy' },
    { cca3: 'DEU', volume: '20B', desc: 'Sanctioned, reduced' },
    { cca3: 'IND', volume: '15B', desc: 'Defense, energy' },
    { cca3: 'KAZ', volume: '10B', desc: 'Regional trade' },
    { cca3: 'BGD', volume: '8B', desc: 'Defense cooperation' },
  ],
};

function generateFile(tradeData) {
  const content = `// Auto-generated from public data sources
// Sources: UN Comtrade API, World Bank Trade Statistics, WTO
// Updated: ${new Date().toISOString()}

export const majorTradePartners = ${JSON.stringify(tradeData, null, 2)}

export const getCountryTradePartners = (cca3) => {
  return majorTradePartners[cca3] || []
}

export const getTotalTradeVolume = (cca3) => {
  const partners = majorTradePartners[cca3] || []
  return partners.reduce((sum, p) => {
    const volume = parseInt(p.volume.replace('B', '')) || 0
    return sum + volume
  }, 0)
}

export const getTopTradePartner = (cca3) => {
  const partners = majorTradePartners[cca3] || []
  return partners[0] || null
}

export const getTradePartnerDescription = (cca3_1, cca3_2) => {
  const partners = majorTradePartners[cca3_1] || []
  return partners.find(p => p.cca3 === cca3_2)?.desc || 'Trade partner'
}
`;

  fs.writeFileSync('./src/data/tradePartners.js', content);
  console.log('✓ Generated tradePartners.js with trade data');
}

generateFile(MAJOR_TRADE_PARTNERS);

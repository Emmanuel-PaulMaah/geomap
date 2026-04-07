import fs from 'fs';

// Critical supply chain chokepoints - strategic maritime routes and geographic bottlenecks
// Sources: IMO (International Maritime Organization), World Bank, US Energy Information Admin, shipping industry reports

const CHOKE_POINTS = [
  {
    id: 'suez',
    name: 'Suez Canal',
    type: 'canal',
    lat: 29.9569,
    lng: 32.3841,
    country: 'EGY',
    worldTrade: 12,
    description: 'Connects Europe to Asia. 12% of world trade passes through.',
    riskLevel: 'critical',
    commodities: ['Oil', 'Natural Gas', 'Manufactured Goods', 'Grain'],
    notes: 'Blockage disrupts global trade. 2021 Ever Given incident cost $400B+. Egypt controls revenue.',
    alternatives: 'Cape of Good Hope (adds 2 weeks transit time, $1M+ per ship)'
  },
  {
    id: 'panama',
    name: 'Panama Canal',
    type: 'canal',
    lat: 9.0820,
    lng: -79.5201,
    country: 'PAN',
    worldTrade: 6,
    description: 'Connects Atlantic to Pacific. 6% of world trade passes through.',
    riskLevel: 'critical',
    commodities: ['Oil', 'Manufactured Goods', 'Grain', 'Containers'],
    notes: 'Critical for USA-Asia trade. Climate change reducing water levels. Panama controls passage.',
    alternatives: 'Cape Horn (adds 2+ weeks, extreme weather hazard)'
  },
  {
    id: 'hormuz',
    name: 'Strait of Hormuz',
    type: 'strait',
    lat: 26.1667,
    lng: 56.5333,
    country: 'IRN/OMN',
    worldTrade: 21,
    description: 'Connects Persian Gulf to Indian Ocean. 21% of world oil passes through.',
    riskLevel: 'critical',
    commodities: ['Oil (90%)', 'Natural Gas', 'Petrochemicals'],
    notes: 'Narrowest point 33 miles. Iran controls one side, Oman other. USA Navy patrols.',
    alternatives: 'Pipelines (limited), alternate routes add weeks'
  },
  {
    id: 'malacca',
    name: 'Strait of Malacca',
    type: 'strait',
    lat: 3.5,
    lng: 102.5,
    country: 'MYS/IDN/SGP',
    worldTrade: 25,
    description: 'Narrowest chokepoint. 25% of world trade, 30% of maritime oil shipments.',
    riskLevel: 'critical',
    commodities: ['Oil', 'Natural Gas', 'Electronics', 'Manufactured Goods'],
    notes: 'Only 550m wide at narrowest. Malaysia, Indonesia, Singapore control. Chinese concern for USA presence.',
    alternatives: 'Sunda Strait (congested alternative)'
  },
  {
    id: 'bab-mandab',
    name: 'Bab el-Mandeb',
    type: 'strait',
    lat: 12.8,
    lng: 43.5,
    country: 'YEM/DJI/ERI',
    worldTrade: 12,
    description: 'Gateway to Suez Canal. 12% of world trade.',
    riskLevel: 'high',
    commodities: ['Oil', 'Natural Gas', 'Containers'],
    notes: 'Houthi missiles pose threat (2024+). Yemen instability. Gateway to Suez.',
    alternatives: 'Suez blockade forces around Africa'
  },
  {
    id: 'turkish',
    name: 'Turkish Straits (Bosporus/Dardanelles)',
    type: 'strait',
    lat: 41.1,
    lng: 29.0,
    country: 'TUR',
    worldTrade: 3,
    description: 'Connects Black Sea to Mediterranean. 3% of world trade.',
    riskLevel: 'high',
    commodities: ['Oil', 'Grain', 'Coal'],
    notes: 'Turkey controls via Montreaux Convention. Critical for Ukraine grain exports. Russia/Ukraine affects flow.',
    alternatives: 'Pipelines to Mediterranean'
  },
  {
    id: 'gibraltar',
    name: 'Strait of Gibraltar',
    type: 'strait',
    lat: 36.1,
    lng: -5.3,
    country: 'ESP/MAR',
    worldTrade: 13,
    description: 'Europe-Africa passage. 13% of world trade.',
    riskLevel: 'medium',
    commodities: ['Oil', 'Manufactured Goods', 'Containers'],
    notes: 'Spain and Morocco control. NATO presence. EU trade gateway.',
    alternatives: 'Circumnavigate Africa (months longer)'
  },
  {
    id: 'sunda',
    name: 'Sunda Strait',
    type: 'strait',
    lat: -6.2,
    lng: 105.8,
    country: 'IDN',
    worldTrade: 4,
    description: 'Alternative to Malacca. 4% of trade.',
    riskLevel: 'medium',
    commodities: ['Oil', 'Manufactured Goods'],
    notes: 'More congested alternative to Malacca. Indonesia controls.',
    alternatives: 'Lombok Strait (even longer)'
  },
  {
    id: 'english-channel',
    name: 'English Channel',
    type: 'strait',
    lat: 51.0,
    lng: 1.5,
    country: 'GBR/FRA',
    worldTrade: 11,
    description: 'Europe\'s gateway to Atlantic. 11% of world trade.',
    riskLevel: 'medium',
    commodities: ['Oil', 'Natural Gas', 'Containers'],
    notes: 'UK-France control. Busiest shipping lane. Piracy/smuggling concern.',
    alternatives: 'North Sea route'
  },
  {
    id: 'great-belt',
    name: 'Great Belt/Little Belt (Denmark)',
    type: 'strait',
    lat: 55.0,
    lng: 11.0,
    country: 'DNK',
    worldTrade: 8,
    description: 'Access to Baltic Sea. 8% of global trade.',
    riskLevel: 'medium',
    commodities: ['Oil', 'Grain', 'Containers'],
    notes: 'Denmark controls via Montreaux-style agreement. Baltic access for Scandinavia/Russia.',
    alternatives: 'Long route around Scandinavia'
  },
  {
    id: 'gulf-aden',
    name: 'Gulf of Aden',
    type: 'sea',
    lat: 12.5,
    lng: 50.0,
    country: 'YEM/OMN/DJI',
    worldTrade: 12,
    description: 'Between Red Sea and Arabian Sea. 12% of world trade.',
    riskLevel: 'high',
    commodities: ['Oil', 'Containers', 'General Cargo'],
    notes: 'Piracy (reduced 2010s), Houthi missiles (2024+). Gateway to Suez and Hormuz.',
    alternatives: 'Longer routes around Africa'
  },
  {
    id: 'lombok',
    name: 'Lombok Strait',
    type: 'strait',
    lat: -8.7,
    lng: 115.2,
    country: 'IDN',
    worldTrade: 2,
    description: 'Alternative to Malacca for Australia trade.',
    riskLevel: 'low',
    commodities: ['Oil', 'Manufactured Goods'],
    notes: 'Deeper water than Malacca, less congested but longer route.',
    alternatives: 'Malacca Strait (shorter but congested)'
  }
];

function generateFile(chokePoints) {
  const content = `// Auto-generated from public data sources
// Sources: IMO (International Maritime Organization), World Bank, US Energy Information Admin, Shipping industry reports
// Updated: ${new Date().toISOString()}

export const chokePoints = ${JSON.stringify(chokePoints, null, 2)}

export const getChokePointsByRisk = (riskLevel) => {
  return chokePoints.filter(cp => cp.riskLevel === riskLevel)
}

export const getChokePointsByType = (type) => {
  return chokePoints.filter(cp => cp.type === type)
}

export const getChokePointsByCountry = (cca3) => {
  return chokePoints.filter(cp => cp.country.includes(cca3))
}

export const getChokePointsByCommodity = (commodity) => {
  return chokePoints.filter(cp => cp.commodities.includes(commodity))
}

export const getTotalWorldTradeViaChokePoints = () => {
  return chokePoints.reduce((sum, cp) => sum + cp.worldTrade, 0)
}

export const chokePointRiskColor = {
  'critical': '#d32f2f',  // Red
  'high': '#ff9800',      // Orange
  'medium': '#ffc107',    // Amber
  'low': '#4caf50'        // Green
}

export const chokePointRiskDescription = {
  'critical': 'Critical - Major global trade disruption if blocked',
  'high': 'High - Significant regional trade impact',
  'medium': 'Medium - Moderate local trade impact',
  'low': 'Low - Limited impact, alternatives readily available'
}
`;

  fs.writeFileSync('./src/data/supplyChainChokepoints.js', content);
  console.log('✓ Generated supplyChainChokepoints.js with IMO and World Bank data');
}

generateFile(CHOKE_POINTS);

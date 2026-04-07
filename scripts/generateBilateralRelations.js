import fs from 'fs';

// Strategic relations that override all other calculations
const KNOWN_RELATIONS = {
  // Allies
  'USA-GBR': { type: 'ally', desc: 'Special Relationship' },
  'USA-CAN': { type: 'ally', desc: 'USMCA, NATO ally' },
  'USA-DEU': { type: 'ally', desc: 'NATO, Western alliance' },
  'USA-FRA': { type: 'ally', desc: 'NATO, Western alliance' },
  'USA-JPN': { type: 'ally', desc: 'Treaty alliance, Indo-Pacific' },
  'USA-AUS': { type: 'ally', desc: 'AUKUS alliance, Indo-Pacific' },
  'USA-KOR': { type: 'ally', desc: 'Treaty alliance, East Asia' },
  'USA-ISR': { type: 'ally', desc: 'Middle East strategic partner' },
  'IND-USA': { type: 'ally', desc: 'Quad alliance, Indo-Pacific' },

  // Adversaries
  'USA-RUS': { type: 'adversary', desc: 'Ukraine war, sanctions' },
  'USA-CHN': { type: 'competitor', desc: 'Technology, trade war, Taiwan' },
  'USA-IRN': { type: 'adversary', desc: 'Nuclear program, sanctions' },
  'RUS-UKR': { type: 'adversary', desc: 'War, territorial dispute' },
  'CHN-TWN': { type: 'adversary', desc: 'Territorial claim' },
  'CHN-IND': { type: 'competitor', desc: 'Border disputes' },
  'ISR-IRN': { type: 'adversary', desc: 'Regional proxy wars' },
  'SAU-IRN': { type: 'adversary', desc: 'Sunni-Shia regional conflict' },

  // Strategic Partnerships
  'RUS-CHN': { type: 'ally', desc: 'Strategic partnership' },
};

// Regional trade blocs (all members trade with each other)
const TRADE_BLOCS = {
  'EU': ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'],
  'ASEAN': ['BRN', 'KHM', 'IDN', 'LAO', 'MYS', 'MMR', 'PHL', 'SGP', 'THA', 'VNM'],
  'MERCOSUR': ['ARG', 'BRA', 'PRY', 'URY'],
  'AU': ['DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CMR', 'CPV', 'CAF', 'TCD', 'COM', 'COG', 'COD', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'ETH', 'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG', 'MWI', 'MLI', 'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA', 'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 'SWZ', 'TZA', 'TGO', 'TUN', 'UGA', 'ZMB', 'ZWE'],
  'GCC': ['BHR', 'KWT', 'OMN', 'QAT', 'SAU', 'ARE'],
  'CARICOM': ['ATG', 'BHS', 'BRB', 'BLZ', 'DMA', 'DOM', 'GRD', 'GUY', 'HTI', 'JAM', 'SUR', 'TTO', 'VCT'],
};

async function fetchCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,latlng,region,subregion');
  return res.json();
}

// Distance calculation (haversine)
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

async function generateRelations() {
  console.log('Fetching countries...');
  const countries = await fetchCountries();
  const countryMap = {};
  countries.forEach(c => countryMap[c.cca3] = c);
  
  const relations = [];
  const seen = new Set();

  // Helper to avoid duplicates
  const addRelation = (c1, c2, type, desc) => {
    const key = [c1, c2].sort().join('-');
    if (!seen.has(key)) {
      relations.push([c1, c2, type, desc]);
      seen.add(key);
    }
  };

  // 1. Add known strategic relations (override everything)
  Object.entries(KNOWN_RELATIONS).forEach(([key, rel]) => {
    const [c1, c2] = key.split('-');
    addRelation(c1, c2, rel.type, rel.desc);
  });

  // 2. Add trade bloc members (all trade with each other)
  Object.values(TRADE_BLOCS).forEach(bloc => {
    for (let i = 0; i < bloc.length; i++) {
      for (let j = i + 1; j < bloc.length; j++) {
        addRelation(bloc[i], bloc[j], 'trade-partner', 'Regional trade bloc');
      }
    }
  });

  // 3. Add regional neighbors by geographic proximity
  countries.forEach((c1, i) => {
    if (!c1.latlng) return;
    
    countries.slice(i + 1).forEach(c2 => {
      if (!c2.latlng) return;
      
      const dist = distance(c1.latlng[0], c1.latlng[1], c2.latlng[0], c2.latlng[1]);
      
      // Within 1500km = regional trade partner
      if (dist > 0 && dist < 1500) {
        addRelation(c1.cca3, c2.cca3, 'trade-partner', 'Regional neighbor');
      }
    });
  });

  console.log(`Generated ${relations.length} relations for ${countries.length} countries`);
  return relations;
}

function generateFile(relations) {
  const content = `// Auto-generated from public data sources
// Sources: REST Countries API, World Bank, geographic proximity
// Updated: ${new Date().toISOString()}

export const bilateralRelations = [
${relations.map(r => `  ['${r[0]}', '${r[1]}', '${r[2]}', '${r[3]}']`).join(',\n')}
]

export const relationshipColors = {
  'ally': '#4CAF50',           // Green
  'adversary': '#F44336',      // Red
  'trade-partner': '#FF9800',  // Orange
  'competitor': '#FFC107',     // Amber/Yellow
  'neutral': '#9E9E9E'         // Gray
}

export const getBilateralRelations = (cca3) => {
  return bilateralRelations.filter(
    rel => rel[0] === cca3 || rel[1] === cca3
  )
}

export const getRelationshipWith = (cca3_1, cca3_2) => {
  const relation = bilateralRelations.find(
    rel => (rel[0] === cca3_1 && rel[1] === cca3_2) || 
           (rel[0] === cca3_2 && rel[1] === cca3_1)
  )
  return relation ? {
    type: relation[2],
    description: relation[3],
    other: relation[0] === cca3_1 ? relation[1] : relation[0]
  } : null
}
`;

  fs.writeFileSync('./src/data/bilateral.js', content);
  console.log(`✓ Generated bilateral.js with ${relations.length} relations`);
}

generateRelations()
  .then(generateFile)
  .catch(err => console.error('Error:', err));

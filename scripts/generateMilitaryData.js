import fs from 'fs';

// Military data from public sources
// Sources: SIPRI Military Expenditure Database, Federation of American Scientists, World Bank
// Data: 2023-2024 estimates

const MILITARY_DATA = {
  // Top military spenders (SIPRI 2023, billions USD)
  USA: { spending: 820, nuclear: true, nukes: 5800, activePersonnel: 1300000, region: 'Americas' },
  CHN: { spending: 292, nuclear: true, nukes: 350, activePersonnel: 2000000, region: 'Asia' },
  RUS: { spending: 86, nuclear: true, nukes: 5997, activePersonnel: 830000, region: 'Europe/Asia' },
  IND: { spending: 72, nuclear: true, nukes: 160, activePersonnel: 1400000, region: 'Asia' },
  GBR: { spending: 68, nuclear: true, nukes: 215, activePersonnel: 82000, region: 'Europe' },
  FRA: { spending: 62, nuclear: true, nukes: 280, activePersonnel: 202000, region: 'Europe' },
  DEU: { spending: 65, nuclear: false, activePersonnel: 184000, region: 'Europe' },
  JPN: { spending: 42, nuclear: false, activePersonnel: 225000, region: 'Asia' },
  KOR: { spending: 48, nuclear: false, activePersonnel: 500000, region: 'Asia' },
  SAU: { spending: 55, nuclear: false, activePersonnel: 230000, region: 'Middle East' },
  
  // Other nuclear powers (FAS Nuclear Notebook)
  PAK: { spending: 11, nuclear: true, nukes: 170, activePersonnel: 640000, region: 'Asia' },
  ISR: { spending: 24, nuclear: true, nukes: 90, activePersonnel: 170000, region: 'Middle East' },
  PRK: { spending: 1.6, nuclear: true, nukes: 30, activePersonnel: 1190000, region: 'Asia' },
  
  // Major conventional militaries (SIPRI)
  BRA: { spending: 35, nuclear: false, activePersonnel: 192000, region: 'Americas' },
  CAN: { spending: 26, nuclear: false, activePersonnel: 65000, region: 'Americas' },
  AUS: { spending: 36, nuclear: false, activePersonnel: 58000, region: 'Oceania' },
  MEX: { spending: 13, nuclear: false, activePersonnel: 200000, region: 'Americas' },
  TUR: { spending: 29, nuclear: false, activePersonnel: 485000, region: 'Middle East/Europe' },
  IRN: { spending: 10, nuclear: false, activePersonnel: 610000, region: 'Middle East' },
  IRQ: { spending: 7.5, nuclear: false, activePersonnel: 192000, region: 'Middle East' },
  ARE: { spending: 15, nuclear: false, activePersonnel: 60000, region: 'Middle East' },
  ITA: { spending: 34, nuclear: false, activePersonnel: 130000, region: 'Europe' },
  ESP: { spending: 17, nuclear: false, activePersonnel: 93000, region: 'Europe' },
  POL: { spending: 17, nuclear: false, activePersonnel: 100000, region: 'Europe' },
  NLD: { spending: 17, nuclear: false, activePersonnel: 41000, region: 'Europe' },
  SWE: { spending: 7.6, nuclear: false, activePersonnel: 8000, region: 'Europe' },
  NOR: { spending: 8, nuclear: false, activePersonnel: 17000, region: 'Europe' },
  DNK: { spending: 6, nuclear: false, activePersonnel: 15000, region: 'Europe' },
  GRC: { spending: 8, nuclear: false, activePersonnel: 80000, region: 'Europe' },
  PRT: { spending: 3.5, nuclear: false, activePersonnel: 26000, region: 'Europe' },
  UKR: { spending: 43, nuclear: false, activePersonnel: 900000, region: 'Europe' },
  THA: { spending: 8, nuclear: false, activePersonnel: 360000, region: 'Asia' },
  MYS: { spending: 4.5, nuclear: false, activePersonnel: 104000, region: 'Asia' },
  SGP: { spending: 18, nuclear: false, activePersonnel: 50000, region: 'Asia' },
  IDN: { spending: 11, nuclear: false, activePersonnel: 400000, region: 'Asia' },
  VNM: { spending: 8, nuclear: false, activePersonnel: 482000, region: 'Asia' },
  ZAF: { spending: 5, nuclear: false, activePersonnel: 88000, region: 'Africa' },
  EGY: { spending: 13, nuclear: false, activePersonnel: 438000, region: 'Africa/Middle East' },
  NGA: { spending: 3, nuclear: false, activePersonnel: 118000, region: 'Africa' },
};

function generateFile(militaryData) {
  const content = `// Auto-generated from public data sources
// Sources: SIPRI Military Expenditure Database, Federation of American Scientists, World Bank
// Data: 2023-2024 estimates
// Updated: ${new Date().toISOString()}

export const militaryData = ${JSON.stringify(militaryData, null, 2)}

export const getMilitaryData = (cca3) => {
  return militaryData[cca3] || null
}

export const getNuclearPowers = () => {
  return Object.entries(militaryData)
    .filter(([_, data]) => data.nuclear)
    .map(([cca3, _]) => cca3)
}

export const getTopMilitarySpenders = (limit = 15) => {
  return Object.entries(militaryData)
    .sort(([_, a], [__, b]) => b.spending - a.spending)
    .slice(0, limit)
    .map(([cca3, data]) => ({ cca3, ...data }))
}

export const getMilitaryDataByRegion = (region) => {
  return Object.entries(militaryData)
    .filter(([_, data]) => data.region === region)
    .map(([cca3, data]) => ({ cca3, ...data }))
}

// Get military strength score (for regional balance)
export const getMilitaryStrengthScore = (cca3) => {
  const data = militaryData[cca3]
  if (!data) return 0
  
  // Score = spending + (personnel/10000) + nuclear bonus
  let score = data.spending || 0
  score += (data.activePersonnel || 0) / 10000
  if (data.nuclear) score += 50
  
  return score
}
`;

  fs.writeFileSync('./src/data/military.js', content);
  console.log('✓ Generated military.js with SIPRI and FAS data');
}

generateFile(MILITARY_DATA);

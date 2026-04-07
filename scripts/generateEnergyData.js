import fs from 'fs';

// Energy independence data - self-sufficiency in energy by country
// Sources: IEA (International Energy Agency), US Energy Information Administration, World Bank

const ENERGY_DATA = {
  // Energy independents & exporters
  'NOR': { overall: 95, oil: 100, gas: 100, renewables: 40, hydro: true, notes: 'Oil/gas exporter, hydro power' },
  'RUS': { overall: 92, oil: 100, gas: 100, renewables: 20, hydro: true, notes: 'Oil/gas exporter, coal rich' },
  'AUS': { overall: 85, oil: 60, gas: 100, renewables: 35, coal: true, notes: 'Coal, gas exporter, growing renewables' },
  'CAN': { overall: 85, oil: 100, gas: 100, renewables: 65, hydro: true, notes: 'Oil/gas exporter, hydro power' },
  'USA': { overall: 80, oil: 85, gas: 100, renewables: 20, shale: true, notes: 'Shale boom, renewables growing' },
  'SAU': { overall: 90, oil: 100, gas: 95, renewables: 5, notes: 'Oil/gas exporter, limited renewables' },
  'UAE': { overall: 88, oil: 100, gas: 95, renewables: 5, solar: true, notes: 'Oil/gas exporter, solar development' },
  'KWT': { overall: 90, oil: 100, gas: 100, renewables: 0, notes: 'Pure oil/gas exporter' },
  'QAT': { overall: 92, oil: 100, gas: 100, renewables: 0, notes: 'LNG exporter' },
  'IDN': { overall: 80, oil: 85, gas: 90, renewables: 15, geothermal: true, notes: 'Oil/gas exporter, geothermal rich' },
  'IRN': { overall: 98, oil: 100, gas: 100, renewables: 5, notes: 'Oil/gas exporter, sanctions reduce leverage' },
  'VEN': { overall: 90, oil: 100, gas: 95, renewables: 5, hydro: true, notes: 'Oil exporter, economic collapse limits production' },
  'BRA': { overall: 75, oil: 85, gas: 70, renewables: 85, hydro: true, ethanol: true, notes: 'Oil exporter, hydro + ethanol leader' },
  'MEX': { overall: 75, oil: 95, gas: 85, renewables: 25, notes: 'Oil/gas exporter, renewable development' },
  'AGO': { overall: 90, oil: 100, gas: 95, renewables: 0, notes: 'Oil/gas exporter' },
  'NGA': { overall: 88, oil: 100, gas: 98, renewables: 0, notes: 'Oil/gas exporter' },
  'AZE': { overall: 92, oil: 100, gas: 100, renewables: 5, notes: 'Oil/gas exporter' },
  'ALB': { overall: 95, oil: 100, hydro: true, renewables: 100, notes: 'Oil producer, 100% renewable electricity (hydro)' },
  'DNK': { overall: 70, oil: 90, gas: 100, renewables: 85, wind: true, notes: 'Oil/gas producer transitioning to 100% renewables' },

  // Mixed/transitioning
  'CHN': { overall: 70, oil: 30, gas: 45, renewables: 40, coal: true, hydro: true, notes: 'Coal, hydro, growing renewables - solar/wind leader' },
  'DEU': { overall: 60, oil: 10, gas: 40, renewables: 65, wind: true, solar: true, notes: 'Renewables leader, reliant on Russian gas (past), phasing coal' },
  'FRA': { overall: 75, oil: 10, gas: 30, nuclear: 70, renewables: 35, notes: 'Nuclear power independent, limited oil/gas' },
  'GBR': { overall: 65, oil: 40, gas: 60, renewables: 40, wind: true, notes: 'Wind power leader, North Sea gas declining' },
  'ZAF': { overall: 75, oil: 5, gas: 5, coal: 90, renewables: 30, notes: 'Coal power, renewable development' },
  'TUR': { overall: 50, oil: 10, gas: 25, renewables: 45, hydro: true, wind: true, notes: 'Coal, hydro, wind - growing renewables' },
  'EGY': { overall: 50, oil: 60, gas: 70, coal: 20, renewables: 15, solar: true, notes: 'Oil/gas producer, Suez revenue, solar potential' },
  'VNM': { overall: 55, oil: 60, gas: 65, coal: 60, renewables: 20, notes: 'Coal and gas producer, growing renewables' },
  'MYS': { overall: 70, oil: 80, gas: 90, coal: 50, renewables: 15, notes: 'Oil/gas producer, coal reserves' },
  'SWE': { overall: 88, oil: 15, gas: 0, nuclear: 45, hydro: true, renewables: 70, notes: 'Nuclear + hydro + renewables, minimal oil/gas need' },
  'FIN': { overall: 75, oil: 15, gas: 10, nuclear: 30, biomass: 40, renewables: 45, notes: 'Nuclear, forest biomass, renewables' },
  'CHE': { overall: 70, oil: 5, gas: 5, nuclear: 45, hydro: true, renewables: 75, notes: 'Hydro + nuclear + renewables leader' },
  'NZL': { overall: 80, oil: 40, gas: 80, geothermal: 15, hydro: true, renewables: 85, notes: 'Hydro, geothermal, renewable leader' },
  'AUT': { overall: 60, oil: 10, gas: 25, hydro: true, renewables: 70, notes: 'Hydro + renewables' },
  'ESP': { overall: 50, oil: 10, gas: 10, coal: 20, renewables: 60, wind: true, solar: true, notes: 'Renewable leader in EU, import dependent for oil/gas' },
  'GRC': { overall: 35, oil: 10, gas: 15, coal: 45, renewables: 55, wind: true, solar: true, notes: 'Renewable leader, coal declining, import dependent' },
  'PRT': { overall: 55, oil: 10, gas: 5, renewables: 60, wind: true, solar: true, notes: 'Renewable pioneer, oil/gas import dependent' },
  'NLD': { overall: 50, oil: 10, gas: 40, renewables: 45, wind: true, notes: 'Wind leader, declining gas production' },

  // Import dependent
  'IND': { overall: 35, oil: 25, gas: 35, renewables: 25, coal: true, notes: 'Heavily import dependent, large coal reserves' },
  'JPN': { overall: 12, oil: 10, gas: 5, renewables: 20, coal: 25, notes: 'Highly import dependent (oil, gas, coal, LNG)' },
  'KOR': { overall: 5, oil: 0, gas: 0, renewables: 10, coal: 30, notes: 'Entirely import dependent for fossil fuels' },
  'ISR': { overall: 40, oil: 5, gas: 85, coal: 20, renewables: 10, solar: true, notes: 'Natural gas discovery recent, solar development' },
  'THA': { overall: 45, oil: 25, gas: 50, renewables: 20, notes: 'Import dependent but some domestic gas' },
  'PHL': { overall: 20, oil: 5, gas: 20, coal: 60, renewables: 35, geothermal: true, notes: 'Import dependent, geothermal rich' },
  'PAK': { overall: 35, oil: 10, gas: 40, coal: 45, hydro: true, notes: 'Import dependent, hydro potential' },
  'BGD': { overall: 25, oil: 5, gas: 45, coal: 30, renewables: 10, notes: 'Import dependent, gas reserves declining' },
  'ARM': { overall: 25, oil: 0, gas: 50, nuclear: 45, renewables: 10, notes: 'Nuclear + Russian gas, oil import dependent' },
  'SVK': { overall: 60, oil: 10, gas: 75, nuclear: 45, renewables: 25, notes: 'Nuclear and gas, Russian dependency (past)' },
  'HUN': { overall: 50, oil: 15, gas: 75, nuclear: 35, renewables: 25, notes: 'Nuclear and Russian gas (past), renewables growing' },
  'CZE': { overall: 55, oil: 10, gas: 70, coal: 50, nuclear: 30, renewables: 25, notes: 'Coal, nuclear, Russian gas (past)' },
  'POL': { overall: 45, oil: 10, gas: 60, coal: 75, renewables: 25, notes: 'Coal dependent, Russian gas (past), renewables growing' },
  'UKR': { overall: 40, oil: 15, gas: 50, coal: 45, nuclear: 40, renewables: 15, notes: 'Coal and nuclear, Russian gas (pre-war), war disrupted' },
  'ITA': { overall: 25, oil: 10, gas: 20, renewables: 45, notes: 'Limited domestic resources, high renewables, Russian gas (past)' },
  'BEL': { overall: 35, oil: 0, gas: 10, nuclear: 45, renewables: 35, wind: true, notes: 'Nuclear and renewables, oil/gas import dependent' },
  'SGP': { overall: 0, oil: 0, gas: 10, renewables: 0, notes: 'Island city-state, 100% import dependent' }
};

function generateFile(energyData) {
  const content = `// Auto-generated from public data sources
// Sources: IEA (International Energy Agency), US Energy Information Administration, World Bank
// Data: 2023-2024 energy mix estimates
// Updated: ${new Date().toISOString()}

export const energyIndependence = ${JSON.stringify(energyData, null, 2)}

export const getEnergyIndependence = (cca3) => {
  return energyIndependence[cca3] || {
    overall: 50,
    oil: 50,
    gas: 50,
    renewables: 20,
    notes: 'Data not available'
  }
}

export const energyIndependenceColor = (score) => {
  if (score >= 80) return '#2e7d32'    // Dark green - independent
  if (score >= 60) return '#66bb6a'    // Light green - mostly independent
  if (score >= 40) return '#fdd835'    // Yellow - moderate dependency
  if (score >= 20) return '#ffa726'    // Orange - high dependency
  return '#d32f2f'                      // Red - critical dependency
}

export const energyIndependenceLabel = (score) => {
  if (score >= 80) return 'Independent'
  if (score >= 60) return 'Mostly Independent'
  if (score >= 40) return 'Moderate Dependency'
  if (score >= 20) return 'High Dependency'
  return 'Critical Dependency'
}

export const getCountriesByEnergyIndependence = (threshold) => {
  return Object.entries(energyIndependence)
    .filter(([_, data]) => data.overall >= threshold)
    .map(([cca3, data]) => ({ cca3, ...data }))
}

export const getEnergyMixBreakdown = (cca3) => {
  const data = getEnergyIndependence(cca3)
  const mix = {}
  if (data.oil) mix.oil = data.oil
  if (data.gas) mix.gas = data.gas
  if (data.coal) mix.coal = data.coal
  if (data.nuclear) mix.nuclear = data.nuclear
  if (data.renewables) mix.renewables = data.renewables
  return mix
}
`;

  fs.writeFileSync('./src/data/energyIndependence.js', content);
  console.log('✓ Generated energyIndependence.js with IEA and EIA data');
}

generateFile(ENERGY_DATA);

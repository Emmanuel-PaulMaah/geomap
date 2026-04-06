// Geopolitical organization memberships and affiliations
export const geopoliticalData = {
  // NATO members
  nato: [
    'ALB', 'BEL', 'BGR', 'HRV', 'CZE', 'DNK', 'EST', 'FRA', 'DEU', 'GRC', 'HUN', 'ISL', 'ITA', 
    'LVA', 'LTU', 'LUX', 'MNE', 'NLD', 'NOR', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE', 'TUR', 'GBR', 'USA'
  ],
  
  // EU members
  eu: [
    'AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 
    'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'
  ],
  
  // BRICS members
  brics: ['BRA', 'RUS', 'IND', 'CHN', 'ZAF'],
  
  // G7 members
  g7: ['CAN', 'FRA', 'DEU', 'ITA', 'JPN', 'GBR', 'USA'],
  
  // G20 members
  g20: [
    'ARG', 'AUS', 'BRA', 'CAN', 'CHN', 'FRA', 'DEU', 'IND', 'IDN', 'ITA', 'JPN', 'KOR', 
    'MEX', 'RUS', 'SAU', 'ZAF', 'TUR', 'GBR', 'USA', 'EU'
  ],
  
  // ASEAN members
  asean: ['BRN', 'KHM', 'IDN', 'LAO', 'MYS', 'MMR', 'PHL', 'SGP', 'THA', 'VNM'],
  
  // Arab League members
  arabLeague: [
    'DZA', 'BHR', 'COM', 'DJI', 'EGY', 'IRQ', 'JOR', 'KWT', 'LBN', 'LBY', 'MOR', 'OMN', 
    'QAT', 'SAU', 'SOM', 'SDN', 'SYR', 'TUN', 'ARE', 'YEM', 'PSE'
  ],
  
  // African Union members
  africaunion: [
    'DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CMR', 'CPV', 'CAF', 'TCD', 'COM', 'COG', 'COD',
    'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'ETH', 'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'KEN', 'LSO',
    'LBR', 'LBY', 'MDG', 'MWI', 'MLI', 'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA',
    'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 'SWZ', 'TZA', 'TGO', 'TUN', 'UGA',
    'ZMB', 'ZWE'
  ],
  
  // Disputed/Contested territories
  disputed: {
    'PSE': 'Palestinian territories - disputed sovereignty',
    'XKX': 'Kosovo - disputed by Serbia',
    'TWN': 'Taiwan - claimed by mainland China',
    'CYP': 'Cyprus - divided (Northern Cyprus recognized by Turkey only)',
    'MKD': 'North Macedonia - historical name disputes',
    'ISR': 'Israel - borders disputed with Palestine'
  },
  
  // Under sanctions (major/recent)
  sanctions: {
    'RUS': 'Western sanctions (2022+)',
    'IRN': 'US/international sanctions',
    'PRK': 'International sanctions',
    'SYR': 'International sanctions',
    'ZWE': 'International sanctions',
    'VEN': 'US/international sanctions'
  }
}

export const getCountryOrganizations = (cca3) => {
  const orgs = []
  
  if (geopoliticalData.nato.includes(cca3)) orgs.push('NATO')
  if (geopoliticalData.eu.includes(cca3)) orgs.push('EU')
  if (geopoliticalData.brics.includes(cca3)) orgs.push('BRICS')
  if (geopoliticalData.g7.includes(cca3)) orgs.push('G7')
  if (geopoliticalData.g20.includes(cca3)) orgs.push('G20')
  if (geopoliticalData.asean.includes(cca3)) orgs.push('ASEAN')
  if (geopoliticalData.arabLeague.includes(cca3)) orgs.push('Arab League')
  if (geopoliticalData.africaunion.includes(cca3)) orgs.push('African Union')
  
  return orgs
}

export const getCountryIssues = (cca3) => {
  const issues = []
  
  if (geopoliticalData.disputed[cca3]) {
    issues.push({ type: 'disputed', text: geopoliticalData.disputed[cca3] })
  }
  if (geopoliticalData.sanctions[cca3]) {
    issues.push({ type: 'sanctions', text: geopoliticalData.sanctions[cca3] })
  }
  
  return issues
}

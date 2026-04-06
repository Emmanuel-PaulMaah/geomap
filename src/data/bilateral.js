// Bilateral relations between countries
// Format: [country1, country2, relationshipType, description]
// Relationship types: 'ally', 'adversary', 'neutral', 'trade-partner', 'competitor'

export const bilateralRelations = [
  // NATO/Western Allies
  ['USA', 'GBR', 'ally', 'Special Relationship'],
  ['USA', 'CAN', 'ally', 'USMCA, NATO ally'],
  ['USA', 'DEU', 'ally', 'NATO, Western alliance'],
  ['USA', 'FRA', 'ally', 'NATO, Western alliance'],
  ['USA', 'JPN', 'ally', 'Treaty alliance, Indo-Pacific'],
  ['USA', 'KOR', 'ally', 'Treaty alliance, East Asia'],
  ['USA', 'AUS', 'ally', 'AUKUS alliance, Indo-Pacific'],
  ['GBR', 'FRA', 'ally', 'EU, Western alliance'],
  ['GBR', 'DEU', 'ally', 'NATO, Europe'],
  ['FRA', 'DEU', 'ally', 'EU core, Franco-German axis'],
  ['USA', 'ISR', 'ally', 'Middle East strategic partner'],

  // Eastern Alliance
  ['RUS', 'CHN', 'ally', 'Strategic partnership against West'],
  ['RUS', 'IRN', 'ally', 'Syria, sanctions resistance'],
  ['CHN', 'RUS', 'trade-partner', 'Energy, trade'],
  ['CHN', 'KOR', 'trade-partner', 'Major trade'],
  ['CHN', 'VNM', 'competitor', 'Territorial disputes, trade'],

  // US Adversaries
  ['USA', 'RUS', 'adversary', 'Ukraine war, sanctions, Cold War 2.0'],
  ['USA', 'CHN', 'competitor', 'Technology, trade war, Taiwan'],
  ['USA', 'IRN', 'adversary', 'Nuclear program, sanctions'],
  ['USA', 'PRK', 'adversary', 'Nuclear weapons, isolation'],
  ['USA', 'VEN', 'adversary', 'Sanctions, regional power'],

  // China Relations
  ['CHN', 'IND', 'competitor', 'Border disputes, Asian hegemony'],
  ['CHN', 'JPN', 'competitor', 'Historical tensions, economic'],
  ['CHN', 'TWN', 'adversary', 'Territorial claim, civil war unresolved'],
  ['CHN', 'PHL', 'competitor', 'South China Sea disputes'],
  ['CHN', 'VNM', 'competitor', 'South China Sea, history'],

  // Middle East
  ['ISR', 'IRN', 'adversary', 'Regional proxy wars, nuclear'],
  ['ISR', 'PSE', 'adversary', 'Occupation, Palestinian state'],
  ['SAU', 'IRN', 'adversary', 'Sunni-Shia, regional hegemony, Yemen'],
  ['SAU', 'USA', 'ally', 'Oil, regional security'],
  ['UAE', 'IRN', 'competitor', 'Regional balance'],
  ['QAT', 'SAU', 'competitor', 'Regional tensions, blockade ended'],

  // Europe
  ['RUS', 'UKR', 'adversary', 'War, territorial dispute'],
  ['RUS', 'POL', 'competitor', 'NATO expansion fears, border'],
  ['RUS', 'BLR', 'ally', 'Lukashenko client state'],
  ['UKR', 'POL', 'ally', 'NATO integration, Western'],
  ['GBR', 'RUS', 'adversary', 'Salisbury poisoning, sanctions'],

  // Asia-Pacific
  ['JPN', 'KOR', 'competitor', 'Historical tensions, trade'],
  ['JPN', 'RUS', 'competitor', 'Kuril Islands, sanctions'],
  ['IND', 'PAK', 'adversary', 'Kashmir, terrorism, wars'],
  ['IND', 'CHN', 'competitor', 'Border, Asian hegemony'],
  ['IND', 'USA', 'ally', 'Quad alliance, Indo-Pacific'],
  ['IND', 'RUS', 'trade-partner', 'Military equipment, neutrality'],

  // Regional Powers
  ['BRA', 'ARG', 'trade-partner', 'MERCOSUR'],
  ['MEX', 'USA', 'trade-partner', 'USMCA, migration'],
  ['IDN', 'CHN', 'trade-partner', 'ASEAN, South China Sea disputes'],
  ['THA', 'USA', 'ally', 'Treaty ally, Southeast Asia'],
  ['SGP', 'USA', 'ally', 'Strategic location, trade'],
  ['MYS', 'CHN', 'trade-partner', 'Belt and Road'],

  // African & Others
  ['ZAF', 'USA', 'trade-partner', 'Southern Africa influence'],
  ['EGY', 'USA', 'ally', 'Suez Canal, Middle East'],
  ['NGR', 'USA', 'ally', 'West Africa, oil, security'],
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

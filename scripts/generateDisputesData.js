import fs from 'fs';

// Territorial disputes and contested areas
// Sources: UCDP (Uppsala Conflict Data Program), UN Geospatial, International Crisis Group, news reports

const TERRITORIAL_DISPUTES = [
  {
    id: 'palestine',
    name: 'Palestinian Territories',
    claimants: ['PSE', 'ISR'],
    location: [31.95, 35.23],
    status: 'active',
    severity: 'critical',
    description: 'Palestinian statehood disputed. Gaza and West Bank under different controls. Israel claims security. Palestine claims self-determination.',
    since: 1948
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    claimants: ['TWN', 'CHN'],
    location: [23.7, 120.96],
    status: 'active',
    severity: 'critical',
    description: 'People\'s Republic of China claims Taiwan as renegade province. Taiwan functions as independent state. De facto independent, not internationally recognized.',
    since: 1949
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    claimants: ['IND', 'PAK'],
    location: [34.5, 77.5],
    status: 'active',
    severity: 'critical',
    description: 'India-Pakistan border dispute since independence. Three wars fought. China also claims portion (Aksai Chin). No resolution, multiple ceasefires.',
    since: 1947
  },
  {
    id: 'crimea',
    name: 'Crimea',
    claimants: ['RUS', 'UKR'],
    location: [44.89, 34.28],
    status: 'active',
    severity: 'critical',
    description: 'Russian annexation in 2014 after Ukrainian Euromaidan. Ukraine rejects. Spark of 2022 full-scale war. Disputed control.',
    since: 2014
  },
  {
    id: 'donbas',
    name: 'Donbas (Donetsk & Luhansk)',
    claimants: ['UKR', 'RUS'],
    location: [48.0, 38.5],
    status: 'active',
    severity: 'critical',
    description: 'Eastern Ukraine. Russian-backed breakaway republics claimed independence (2022). Contested in ongoing war. Major 2022 conflict flashpoint.',
    since: 2014
  },
  {
    id: 'western-sahara',
    name: 'Western Sahara',
    claimants: ['MAR', 'ESH'],
    location: [24.5, -13.0],
    status: 'active',
    severity: 'high',
    description: 'Morocco claims and administers. Sahrawi people seek independence (POLISARIO). UN calls for referendum. Africa\'s last colonial dispute.',
    since: 1975
  },
  {
    id: 'golan',
    name: 'Golan Heights',
    claimants: ['ISR', 'SYR'],
    location: [33.2, 35.8],
    status: 'active',
    severity: 'high',
    description: 'Israeli-occupied since 1967 Six-Day War. Israel annexed 1981. Syria refuses recognition. US recognized Israeli sovereignty 2019.',
    since: 1967
  },
  {
    id: 'south-china-sea',
    name: 'South China Sea Islands',
    claimants: ['CHN', 'VNM', 'PHL', 'MYS', 'BRN'],
    location: [10.0, 110.0],
    status: 'active',
    severity: 'high',
    description: 'Multiple overlapping claims. China most aggressive (9-dash line). Paracel and Spratly Islands. US freedom of navigation operations. Fishing rights and oil.',
    since: 1945
  },
  {
    id: 'kuril-islands',
    name: 'Kuril Islands',
    claimants: ['RUS', 'JPN'],
    location: [50.0, 156.0],
    status: 'active',
    severity: 'medium',
    description: 'Russia-Japan border dispute. Four southern islands disputed (Sakhalin). Both claim sovereignty. Cold War legacy. Sanctions hamper negotiations.',
    since: 1945
  },
  {
    id: 'falkland',
    name: 'Falkland Islands (Malvinas)',
    claimants: ['GBR', 'ARG'],
    location: [-51.5, -59.5],
    status: 'dormant',
    severity: 'medium',
    description: 'Argentina claims as Malvinas. British administered. 1982 war won by UK. Argentina still presses claim. Low-intensity dispute.',
    since: 1833
  },
  {
    id: 'northern-cyprus',
    name: 'Northern Cyprus',
    claimants: ['CYP', 'TUR'],
    location: [35.2, 33.9],
    status: 'active',
    severity: 'high',
    description: 'Turkish invasion 1974. Turkish Republic of Northern Cyprus declared 1983 (Turkey only recognizes). Cyprus isolated in north. EU-Turkey tensions.',
    since: 1974
  },
  {
    id: 'jammu-ladakh',
    name: 'Jammu & Ladakh Border (India-China)',
    claimants: ['IND', 'CHN'],
    location: [35.5, 77.5],
    status: 'active',
    severity: 'high',
    description: 'Eastern Ladakh border clashes 2020, 2022. Aksai Chin claimed by China. India claims territory. Rising military tensions.',
    since: 1962
  },
  {
    id: 'arunachal',
    name: 'Arunachal Pradesh',
    claimants: ['IND', 'CHN'],
    location: [28.2, 94.0],
    status: 'active',
    severity: 'medium',
    description: 'Northeast India. China claims as "South Tibet". India administers. Low-level dispute, occasional incursions. Strategic border state.',
    since: 1962
  },
  {
    id: 'senkaku',
    name: 'Senkaku Islands',
    claimants: ['JPN', 'CHN', 'TWN'],
    location: [25.7, 123.5],
    status: 'active',
    severity: 'high',
    description: 'Japan administers (US ally). China claims based on 1895. Taiwan also claims. Increasing Chinese military probing. East China Sea resource play.',
    since: 1895
  },
  {
    id: 'paracel',
    name: 'Paracel Islands',
    claimants: ['CHN', 'VNM'],
    location: [16.5, 111.5],
    status: 'active',
    severity: 'high',
    description: 'South China Sea. Vietnam and China both claim. China controls militarily. 1974 battle won by China. Strategic shipping lanes.',
    since: 1945
  },
  {
    id: 'spratly',
    name: 'Spratly Islands',
    claimants: ['CHN', 'VNM', 'PHL', 'MYS', 'BRN'],
    location: [8.6, 111.5],
    status: 'active',
    severity: 'high',
    description: 'South China Sea. Multiple claimants. China has largest military presence. Vietnam, Philippines also occupy islands. Oil, fish, shipping lanes.',
    since: 1945
  },
  {
    id: 'abkhazia-s-ossetia',
    name: 'Abkhazia & South Ossetia (Georgia)',
    claimants: ['GEO', 'RUS'],
    location: [42.5, 44.0],
    status: 'active',
    severity: 'high',
    description: 'Russian-backed breakaway regions of Georgia. 2008 Russia-Georgia war. Russia recognizes independence (others don\'t). Frozen conflict.',
    since: 1992
  },
  {
    id: 'nagorno-karabakh',
    name: 'Nagorno-Karabakh',
    claimants: ['AZE', 'ARM'],
    location: [39.5, 47.0],
    status: 'active',
    severity: 'high',
    description: 'Azerbaijan enclave claimed by Armenia (ethnic Armenians). Wars in 1988, 2020, 2023. Azerbaijan gained territory 2020. Russia peacekeeping failed 2023.',
    since: 1988
  },
  {
    id: 'west-bank',
    name: 'West Bank Settlements',
    claimants: ['ISR', 'PSE'],
    location: [31.95, 35.2],
    status: 'active',
    severity: 'critical',
    description: 'Israeli settlements in Palestinian territory. Considered illegal by UN. Palestinians see as occupation. Major obstacle to peace.',
    since: 1967
  }
];

const RECENT_CONFLICTS = [
  {
    name: 'Ukraine War',
    location: [49.0, 31.0],
    start: 2022,
    status: 'ongoing',
    description: 'Russia invaded February 2022. Major humanitarian crisis. NATO supply Ukraine. Nuclear-armed powers at brink.'
  },
  {
    name: 'Gaza War',
    location: [31.9, 34.5],
    start: 2023,
    status: 'ongoing',
    description: 'Israel vs Hamas. October 7 attack, Israeli response. Major civilian casualties. Regional escalation risk.'
  },
  {
    name: 'Yemen Civil War',
    location: [15.0, 48.0],
    start: 2015,
    status: 'ongoing',
    description: 'Saudi-UAE vs Houthis (Iran-backed). Humanitarian catastrophe. Regional proxy war.'
  },
  {
    name: 'Syria Civil War',
    location: [34.8, 39.0],
    start: 2011,
    status: 'ceasefire',
    description: 'Assad regime vs rebels. Russia intervened 2015. Chemical weapons use. Regional intervention.'
  },
  {
    name: 'Myanmar Genocide',
    location: [21.9, 95.9],
    start: 2017,
    status: 'unresolved',
    description: 'Rohingya ethnic cleansing. 700k+ fled to Bangladesh. International condemnation. Military coup 2021.'
  }
];

function generateFile(disputes, conflicts) {
  const content = `// Auto-generated from public data sources
// Sources: UCDP (Uppsala Conflict Data Program), UN Geospatial, International Crisis Group, News reports
// Updated: ${new Date().toISOString()}

export const territorialDisputes = ${JSON.stringify(disputes, null, 2)}

export const recentConflicts = ${JSON.stringify(conflicts, null, 2)}

export const getCountryDisputes = (cca3) => {
  return territorialDisputes.filter(d => d.claimants.includes(cca3))
}

export const getDisputesBySeverity = (severity) => {
  return territorialDisputes.filter(d => d.severity === severity)
}

export const getCriticalDisputes = () => {
  return territorialDisputes.filter(d => d.severity === 'critical' || d.status === 'active')
}

export const disputeSeverityColor = {
  critical: '#F44336',  // Red
  high: '#FF9800',      // Orange
  medium: '#FFC107',    // Yellow
  low: '#4CAF50'        // Green
}

export const getConflictsByStatus = (status) => {
  return recentConflicts.filter(c => c.status === status)
}

export const getOngoingConflicts = () => {
  return recentConflicts.filter(c => c.status === 'ongoing')
}
`;

  fs.writeFileSync('./src/data/disputes.js', content);
  console.log('✓ Generated disputes.js with UCDP and ICG data');
}

generateFile(TERRITORIAL_DISPUTES, RECENT_CONFLICTS);

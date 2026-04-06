// Regional power dynamics - identifies hegemons, rising/declining powers per region
// Based on military spending, GDP, regional influence, diplomatic weight

export const regionalPowers = {
  Europe: {
    hegemon: 'DEU',
    hegemonyBasis: 'Economic power (largest EU economy), EU leadership, industrial base',
    keyPlayers: [
      { cca3: 'DEU', status: 'hegemon', power: 95, description: 'Dominant economic & industrial power' },
      { cca3: 'FRA', status: 'major', power: 85, description: 'Nuclear power, UN Security Council, military' },
      { cca3: 'GBR', status: 'major', power: 85, description: 'Nuclear power, post-Brexit still influential' },
      { cca3: 'RUS', status: 'declining', power: 65, description: 'Military power but economically isolated (sanctions)' },
      { cca3: 'POL', status: 'rising', power: 60, description: 'NATO forward state, rapid military buildup' },
      { cca3: 'ITA', status: 'major', power: 70, description: 'EU member, NATO ally, southern anchor' }
    ],
    dynamics: 'Germany economically dominant but politically divided. France/UK check German power. Russia isolated post-Ukraine. Poland rising as NATO forward defense.'
  },

  'East Asia': {
    hegemon: 'CHN',
    hegemonyBasis: 'GDP #2 globally, massive military spending, nuclear power, manufacturing hub',
    keyPlayers: [
      { cca3: 'CHN', status: 'hegemon', power: 95, description: 'Economic & military superpower, regional dominance' },
      { cca3: 'JPN', status: 'major', power: 80, description: 'Advanced economy, US ally, military buildup (article 9)' },
      { cca3: 'KOR', status: 'major', power: 75, description: 'Advanced economy, US ally, military tech' },
      { cca3: 'TWN', status: 'critical', power: 70, description: 'Semiconductor superpower (TSMC), US ally, Chinese threat' },
      { cca3: 'PRK', status: 'rogue', power: 40, description: 'Nuclear power, isolated, Chinese client' }
    ],
    dynamics: 'China hegemon but Japan/Korea/Taiwan US alliance constrains it. Taiwan flashpoint. US presence critical.'
  },

  'South Asia': {
    hegemon: 'IND',
    hegemonyBasis: 'Largest military (personnel), nuclear power, regional demographic weight, GDP growth',
    keyPlayers: [
      { cca3: 'IND', status: 'hegemon', power: 90, description: 'Regional military dominance, nuclear power, rising economy' },
      { cca3: 'PAK', status: 'rival', power: 70, description: 'Nuclear power, but economically weaker than India' },
      { cca3: 'BGD', status: 'secondary', power: 50, description: 'Population weight, but military weak' },
      { cca3: 'AFG', status: 'weak', power: 30, description: 'Contested, Taliban control, Pakistan/India rivalry' }
    ],
    dynamics: 'India clear hegemon but Pakistan nuclear deterrent prevents dominance. Kashmir unresolved. Taliban Afghanistan destabilizes region.'
  },

  'Southeast Asia': {
    hegemon: 'IDN',
    hegemonyBasis: 'Largest economy (ASEAN), most populous, ASEAN chair rotates',
    keyPlayers: [
      { cca3: 'IDN', status: 'hegemon', power: 75, description: 'Largest ASEAN economy, military regional power' },
      { cca3: 'THA', status: 'major', power: 65, description: 'Military strong, historical power, US ally' },
      { cca3: 'VNM', status: 'rising', power: 70, description: 'Economic growth, strategic vs China, manufacturing hub' },
      { cca3: 'SGP', status: 'major', power: 65, description: 'Economic hub, strategic chokepoint (Strait of Malacca)' },
      { cca3: 'MYS', status: 'secondary', power: 60, description: 'Moderate power, strategic location' },
      { cca3: 'PHL', status: 'contested', power: 55, description: 'US ally, South China Sea disputes, rising but weak state' }
    ],
    dynamics: 'Indonesia soft hegemon but ASEAN consensus-based. Vietnam rising as China counterweight. Singapore economic crucial. South China Sea tensions.'
  },

  'Middle East': {
    hegemon: 'SAU',
    hegemonyBasis: 'Oil dominance, largest military spending (region), regional diplomatic weight',
    keyPlayers: [
      { cca3: 'SAU', status: 'hegemon', power: 85, description: 'Oil power, military spending, OPEC leader, Sunni leader' },
      { cca3: 'IRN', status: 'rival', power: 75, description: 'Regional military, nuclear program, Shia leader, isolated' },
      { cca3: 'ISR', status: 'major', power: 80, description: 'Military dominance, nuclear power, US ally, contested' },
      { cca3: 'ARE', status: 'rising', power: 70, description: 'Military buildup, diplomatic innovation, Abraham Accords' },
      { cca3: 'TUR', status: 'rising', power: 75, description: 'NATO member, military power, regional ambitions' },
      { cca3: 'EGY', status: 'major', power: 70, description: 'Suez Canal strategic, Sunni Arab leader, military' },
      { cca3: 'IRQ', status: 'contested', power: 50, description: 'Oil rich but fragile, Iran/USA competition' }
    ],
    dynamics: 'Saudi Arabia vs Iran Sunni-Shia cold war. Israel dominant militarily but isolated. Turkey rising. US presence critical. Oil = leverage.'
  },

  Africa: {
    hegemon: 'ZAF',
    hegemonyBasis: 'Largest economy, military power, technological lead, regional influence',
    keyPlayers: [
      { cca3: 'ZAF', status: 'hegemon', power: 75, description: 'Largest economy, military tech, regional leader' },
      { cca3: 'NGA', status: 'rising', power: 70, description: 'Most populous, growing economy, resource wealth, instability' },
      { cca3: 'EGY', status: 'major', power: 75, description: 'Arab world leader, Suez control, military' },
      { cca3: 'ETH', status: 'rising', power: 65, description: 'Large population, regional diplomatic hub, conflicts' },
      { cca3: 'KEN', status: 'secondary', power: 55, description: 'East Africa leader, relative stability' },
      { cca3: 'DZA', status: 'major', power: 70, description: 'North Africa large economy, military, post-Arab Spring' }
    ],
    dynamics: 'South Africa economic leader but limited influence. Nigeria rising but unstable. Egypt strong but Suez-focused. Fragmentation limits continent power.'
  },

  Americas: {
    hegemon: 'USA',
    hegemonyBasis: 'Global superpower, military dominance, economic size, nuclear power',
    keyPlayers: [
      { cca3: 'USA', status: 'hegemon', power: 100, description: 'Superpower, military dominance, economic weight' },
      { cca3: 'CAN', status: 'major', power: 75, description: 'G7, advanced economy, NATO, US ally' },
      { cca3: 'BRA', status: 'major', power: 75, description: 'Largest South America, emerging power, BRICS' },
      { cca3: 'MEX', status: 'secondary', power: 60, description: 'USMCA member, unstable but strategic' },
      { cca3: 'ARG', status: 'secondary', power: 65, description: 'South America power, MERCOSUR, economic troubles' },
      { cca3: 'CHL', status: 'secondary', power: 60, description: 'South America relative stability, free trade leader' }
    ],
    dynamics: 'USA absolute hegemon. Canada junior partner. Brazil rising but internal instability. Latin America secondary tier, US influence declining slightly.'
  },

  'Central Asia': {
    hegemon: 'KAZ',
    hegemonyBasis: 'Largest economy, resource wealth (oil), relative stability, EAEU member',
    keyPlayers: [
      { cca3: 'KAZ', status: 'hegemon', power: 70, description: 'Oil/gas wealth, stability, bridge between Russia/China' },
      { cca3: 'UZB', status: 'major', power: 65, description: 'Largest population, resource wealth, regional hub' },
      { cca3: 'TJK', status: 'secondary', power: 40, description: 'Tajikistan mountain state, border conflicts' },
      { cca3: 'KGZ', status: 'secondary', power: 35, description: 'Mountain state, instability, resource poor' },
      { cca3: 'TKM', status: 'secondary', power: 50, description: 'Gas exports, isolation, resource wealth' }
    ],
    dynamics: 'Kazakhstan hegemon but Russia/China competition. Uzbekistan population weight. Border conflicts destabilize. Resources create leverage.'
  }
}

export const getCountryRegionalStatus = (cca3) => {
  for (const [region, data] of Object.entries(regionalPowers)) {
    const player = data.keyPlayers.find(p => p.cca3 === cca3)
    if (player) {
      return {
        region,
        ...player,
        hegemon: data.hegemon,
        hegemonyBasis: data.hegemonyBasis,
        dynamics: data.dynamics,
        allPlayers: data.keyPlayers
      }
    }
  }
  return null
}

export const getRegionalPowersByRegion = (region) => {
  return regionalPowers[region] || null
}

export const statusColor = {
  hegemon: '#FF6B6B',      // Red
  major: '#FFA500',        // Orange
  rising: '#4CAF50',       // Green
  declining: '#FFEB3B',    // Yellow
  secondary: '#90CAF9',    // Light Blue
  rival: '#FF6B6B',        // Red
  contested: '#FF9800',    // Orange
  rogue: '#9C27B0',        // Purple
  weak: '#BDBDBD'          // Gray
}

export const statusDescription = {
  hegemon: 'Regional hegemon - dominant military & economic power',
  major: 'Major regional power - significant influence',
  rising: 'Rising power - growing influence, challenging status quo',
  declining: 'Declining power - losing regional influence',
  secondary: 'Secondary player - moderate influence',
  rival: 'Regional rival - competing for dominance',
  contested: 'Contested status - strength disputed or unstable',
  rogue: 'Rogue state - isolated, unpredictable',
  weak: 'Weak player - minimal regional influence'
}

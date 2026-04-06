// Critical supply chains showing key dependencies
// Format: { product, stages: [{ stage, countries: [cca3...], risk: 'low'|'medium'|'critical' }] }

export const supplyChains = {
  semiconductors: {
    name: 'Semiconductors (Chips)',
    description: 'Essential for all electronics',
    stages: [
      {
        stage: 'Design & Engineering',
        countries: ['USA', 'TWN', 'KOR', 'JPN'],
        risk: 'low',
        notes: 'ARM (UK), RISC-V (open), Intel (USA), AMD (USA)'
      },
      {
        stage: 'Manufacturing (Advanced)',
        countries: ['TWN', 'KOR', 'USA'],
        risk: 'critical',
        notes: 'TSMC (TWN) 54%, Samsung (KOR) 20%, Intel (USA) 8%'
      },
      {
        stage: 'Manufacturing (Mature)',
        countries: ['IDN', 'MYS', 'SGP', 'THA', 'VNM'],
        risk: 'medium',
        notes: 'Southeast Asia for older process nodes'
      },
      {
        stage: 'Equipment & Materials',
        countries: ['NLD', 'JPN', 'USA', 'DEU'],
        risk: 'medium',
        notes: 'ASML (NLD) lithography, Tokyo Electron (JPN)'
      },
      {
        stage: 'Assembly & Testing',
        countries: ['IDN', 'MYS', 'THA', 'VNM', 'PHL'],
        risk: 'medium',
        notes: 'Final assembly before distribution'
      }
    ]
  },
  
  evBatteries: {
    name: 'EV Batteries',
    description: 'Critical for electric vehicle transition',
    stages: [
      {
        stage: 'Lithium Mining',
        countries: ['CHI', 'AUS', 'ARG'],
        risk: 'critical',
        notes: '90% supply: Chile, Australia, Argentina (Lithium Triangle)'
      },
      {
        stage: 'Cobalt Mining',
        countries: ['COD', 'ZMB', 'RUS'],
        risk: 'critical',
        notes: 'DRC 70%, mining in war zones, ethical concerns'
      },
      {
        stage: 'Nickel Mining',
        countries: ['IDN', 'PHL', 'RUS', 'MMR'],
        risk: 'critical',
        notes: 'Indonesia 35%, needed for energy density'
      },
      {
        stage: 'Refining & Processing',
        countries: ['CHN', 'IDN', 'RUS'],
        risk: 'critical',
        notes: 'China dominates battery material processing'
      },
      {
        stage: 'Battery Assembly',
        countries: ['CHN', 'KOR', 'JPN', 'DEU'],
        risk: 'medium',
        notes: 'China 80%, shifting to Europe/USA'
      }
    ]
  },

  oil: {
    name: 'Oil & Refining',
    description: 'Energy security, geopolitical leverage',
    stages: [
      {
        stage: 'Extraction',
        countries: ['SAU', 'RUS', 'USA', 'IRN', 'IRQ', 'KWT', 'ARE', 'VEN'],
        risk: 'critical',
        notes: 'Geopolitically volatile supply'
      },
      {
        stage: 'Refining',
        countries: ['USA', 'NLD', 'IND', 'SGP', 'RUS', 'CHN'],
        risk: 'medium',
        notes: 'Bottleneck for specialty fuels'
      },
      {
        stage: 'Distribution & Transport',
        countries: ['SGP', 'NLD', 'JPN'],
        risk: 'medium',
        notes: 'Strait of Hormuz chokepoint (35% supply)'
      }
    ]
  },

  food: {
    name: 'Food & Grain',
    description: 'Global food security vulnerable to shocks',
    stages: [
      {
        stage: 'Wheat Production',
        countries: ['RUS', 'UKR', 'USA', 'ARG', 'AUS'],
        risk: 'critical',
        notes: 'Russia+Ukraine 30% global supply (Ukraine war impact)'
      },
      {
        stage: 'Corn/Maize',
        countries: ['USA', 'ARG', 'BRA', 'UKR'],
        risk: 'critical',
        notes: 'Animal feed, ethanol, staple grain'
      },
      {
        stage: 'Soybeans',
        countries: ['BRA', 'USA', 'ARG', 'CHN'],
        risk: 'high',
        notes: 'Animal feed, China 70% of imports'
      },
      {
        stage: 'Fertilizer',
        countries: ['RUS', 'CHN', 'IND', 'MAR'],
        risk: 'critical',
        notes: 'Russia/Belarus sanctions impact crop yields'
      }
    ]
  },

  pharmaceuticals: {
    name: 'Pharmaceuticals & APIs',
    description: 'Drug supply chains vulnerable to disruption',
    stages: [
      {
        stage: 'Active Pharmaceutical Ingredients (APIs)',
        countries: ['IND', 'CHN', 'IRN'],
        risk: 'critical',
        notes: 'India 50% generics, China 70% API components'
      },
      {
        stage: 'Manufacturing',
        countries: ['IND', 'CHN', 'DEU', 'USA', 'IRL'],
        risk: 'medium',
        notes: 'Concentration in India and China'
      },
      {
        stage: 'Packaging & Distribution',
        countries: ['DEU', 'USA', 'GBR'],
        risk: 'low',
        notes: 'More distributed'
      }
    ]
  },

  rareLandMetals: {
    name: 'Rare Earth & Strategic Metals',
    description: 'Defense, renewable energy, electronics',
    stages: [
      {
        stage: 'Mining',
        countries: ['CHN', 'USA', 'MYS', 'AUS'],
        risk: 'critical',
        notes: 'China 90% production'
      },
      {
        stage: 'Processing & Refining',
        countries: ['CHN', 'USA'],
        risk: 'critical',
        notes: 'China monopoly on processing'
      },
      {
        stage: 'Alloys & Components',
        countries: ['JPN', 'KOR', 'DEU'],
        risk: 'medium',
        notes: 'Magnets, catalysts for industry'
      }
    ]
  }
}

export const getSupplyChainByProduct = (productKey) => {
  return supplyChains[productKey] || null
}

export const getCountrySupplyChainRole = (cca3) => {
  const roles = {}
  
  Object.entries(supplyChains).forEach(([productKey, product]) => {
    product.stages.forEach(stage => {
      if (stage.countries.includes(cca3)) {
        if (!roles[productKey]) {
          roles[productKey] = []
        }
        roles[productKey].push({
          stage: stage.stage,
          risk: stage.risk,
          notes: stage.notes
        })
      }
    })
  })
  
  return roles
}

// Mock shipping data service
// Ready to integrate with real AIS APIs (MarineTraffic, Spire Global, etc.)
// Data format matches real AIS data structure

export const getShippingDataForChokepoint = (chokePointId) => {
  // In production, this would call a real API:
  // fetch(`/api/shipping/${chokePointId}?hours=24`)
  
  const mockData = {
    'suez': {
      id: 'suez',
      name: 'Suez Canal',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 45,
        avgDelayMinutes: 8,
        trafficDensity: 'moderate', // low, moderate, high, critical
        vesselBreakdown: {
          containerShips: 18,
          tankers: 12,
          bulkCarriers: 10,
          roRoShips: 3,
          other: 2
        },
        flagStates: {
          PAN: 12,  // Panama
          LBR: 8,   // Liberia
          HKG: 6,   // Hong Kong
          SG: 5,    // Singapore
          KR: 4,    // South Korea
          NOR: 4,   // Norway
          other: 6
        }
      },
      hourly: [
        { hour: -24, count: 38 },
        { hour: -23, count: 40 },
        { hour: -22, count: 42 },
        { hour: -21, count: 41 },
        { hour: -20, count: 39 },
        { hour: -19, count: 43 },
        { hour: -18, count: 45 },
        { hour: -17, count: 44 },
        { hour: -16, count: 46 },
        { hour: -15, count: 48 },
        { hour: -14, count: 47 },
        { hour: -13, count: 49 },
        { hour: -12, count: 48 },
        { hour: -11, count: 46 },
        { hour: -10, count: 44 },
        { hour: -9, count: 45 },
        { hour: -8, count: 47 },
        { hour: -7, count: 46 },
        { hour: -6, count: 44 },
        { hour: -5, count: 42 },
        { hour: -4, count: 40 },
        { hour: -3, count: 43 },
        { hour: -2, count: 44 },
        { hour: -1, count: 45 },
        { hour: 0, count: 45 }
      ],
      anomalies: [],
      averageTransitTime: 14, // hours
      capturedVessels: [
        {
          mmsi: 211378120,
          name: 'MSC GULSUN',
          type: 'Container Ship',
          flag: 'PAN',
          length: 400,
          cargo: 'General Cargo',
          from: 'Port Said',
          to: 'Suez',
          eta: 6
        },
        {
          mmsi: 235092704,
          name: 'OCEAN NETWORK EXPRESS',
          type: 'Container Ship',
          flag: 'SG',
          length: 368,
          cargo: 'Containers',
          from: 'Europe',
          to: 'Asia',
          eta: 8
        },
        {
          mmsi: 636013278,
          name: 'STENA IMPRESSION',
          type: 'Tanker',
          flag: 'KY',
          length: 228,
          cargo: 'Oil Products',
          from: 'Middle East',
          to: 'Europe',
          eta: 4
        }
      ]
    },
    'malacca': {
      id: 'malacca',
      name: 'Strait of Malacca',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 94,
        avgDelayMinutes: 2,
        trafficDensity: 'high',
        vesselBreakdown: {
          containerShips: 35,
          tankers: 28,
          bulkCarriers: 20,
          roRoShips: 8,
          other: 3
        },
        flagStates: {
          PAN: 25,
          LBR: 18,
          HKG: 14,
          SG: 12,
          KR: 8,
          other: 17
        }
      },
      hourly: [
        { hour: -24, count: 82 },
        { hour: -23, count: 85 },
        { hour: -22, count: 88 },
        { hour: -21, count: 86 },
        { hour: -20, count: 84 },
        { hour: -19, count: 89 },
        { hour: -18, count: 91 },
        { hour: -17, count: 90 },
        { hour: -16, count: 93 },
        { hour: -15, count: 95 },
        { hour: -14, count: 92 },
        { hour: -13, count: 97 },
        { hour: -12, count: 95 },
        { hour: -11, count: 91 },
        { hour: -10, count: 88 },
        { hour: -9, count: 89 },
        { hour: -8, count: 92 },
        { hour: -7, count: 90 },
        { hour: -6, count: 87 },
        { hour: -5, count: 84 },
        { hour: -4, count: 81 },
        { hour: -3, count: 86 },
        { hour: -2, count: 89 },
        { hour: -1, count: 92 },
        { hour: 0, count: 94 }
      ],
      anomalies: [
        {
          type: 'unusual_traffic',
          severity: 'low',
          message: 'Traffic 8% higher than 7-day average',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ],
      averageTransitTime: 8,
      capturedVessels: [
        {
          mmsi: 245306000,
          name: 'EVER GIVEN',
          type: 'Container Ship',
          flag: 'PAN',
          length: 400,
          cargo: 'Containers',
          from: 'China',
          to: 'Europe',
          eta: 3
        },
        {
          mmsi: 311000001,
          name: 'NORDIC ORION',
          type: 'Bulk Carrier',
          flag: 'SG',
          length: 199,
          cargo: 'Coal',
          from: 'Australia',
          to: 'China',
          eta: 5
        }
      ]
    },
    'hormuz': {
      id: 'hormuz',
      name: 'Strait of Hormuz',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 68,
        avgDelayMinutes: 12,
        trafficDensity: 'high',
        vesselBreakdown: {
          tankers: 42,
          containerShips: 15,
          bulkCarriers: 8,
          roRoShips: 2,
          other: 1
        },
        flagStates: {
          LBR: 16,
          PAN: 14,
          HKG: 10,
          SGP: 9,
          KR: 6,
          NOR: 5,
          other: 8
        }
      },
      hourly: [
        { hour: -24, count: 55 },
        { hour: -23, count: 58 },
        { hour: -22, count: 61 },
        { hour: -21, count: 59 },
        { hour: -20, count: 57 },
        { hour: -19, count: 63 },
        { hour: -18, count: 65 },
        { hour: -17, count: 64 },
        { hour: -16, count: 67 },
        { hour: -15, count: 69 },
        { hour: -14, count: 66 },
        { hour: -13, count: 71 },
        { hour: -12, count: 70 },
        { hour: -11, count: 68 },
        { hour: -10, count: 65 },
        { hour: -9, count: 64 },
        { hour: -8, count: 67 },
        { hour: -7, count: 66 },
        { hour: -6, count: 62 },
        { hour: -5, count: 60 },
        { hour: -4, count: 58 },
        { hour: -3, count: 62 },
        { hour: -2, count: 65 },
        { hour: -1, count: 67 },
        { hour: 0, count: 68 }
      ],
      anomalies: [],
      averageTransitTime: 18,
      capturedVessels: [
        {
          mmsi: 312645000,
          name: 'AMOCO CADIZ',
          type: 'Tanker',
          flag: 'LBR',
          length: 292,
          cargo: 'Crude Oil',
          from: 'Persian Gulf',
          to: 'Japan',
          eta: 12
        }
      ]
    },
    'panama': {
      id: 'panama',
      name: 'Panama Canal',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 38,
        avgDelayMinutes: 6,
        trafficDensity: 'moderate',
        vesselBreakdown: {
          containerShips: 16,
          tankers: 10,
          bulkCarriers: 8,
          roRoShips: 3,
          other: 1
        },
        flagStates: {
          PAN: 10,
          LBR: 8,
          HKG: 6,
          SG: 5,
          other: 9
        }
      },
      hourly: [
        { hour: -24, count: 32 },
        { hour: -23, count: 34 },
        { hour: -22, count: 36 },
        { hour: -21, count: 35 },
        { hour: -20, count: 33 },
        { hour: -19, count: 37 },
        { hour: -18, count: 39 },
        { hour: -17, count: 38 },
        { hour: -16, count: 40 },
        { hour: -15, count: 42 },
        { hour: -14, count: 39 },
        { hour: -13, count: 44 },
        { hour: -12, count: 42 },
        { hour: -11, count: 40 },
        { hour: -10, count: 37 },
        { hour: -9, count: 36 },
        { hour: -8, count: 39 },
        { hour: -7, count: 38 },
        { hour: -6, count: 35 },
        { hour: -5, count: 33 },
        { hour: -4, count: 31 },
        { hour: -3, count: 35 },
        { hour: -2, count: 37 },
        { hour: -1, count: 39 },
        { hour: 0, count: 38 }
      ],
      anomalies: [
        {
          type: 'delay',
          severity: 'medium',
          message: 'Above-average delays due to maintenance work',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
        }
      ],
      averageTransitTime: 10,
      capturedVessels: [
        {
          mmsi: 367501110,
          name: 'CMA CGM ANTOINE',
          type: 'Container Ship',
          flag: 'FR',
          length: 400,
          cargo: 'Containers',
          from: 'Asia',
          to: 'Europe',
          eta: 7
        }
      ]
    }
  }
  
  return mockData[chokePointId] || null
}

export const getAllShippingData = () => {
  return {
    'suez': getShippingDataForChokepoint('suez'),
    'malacca': getShippingDataForChokepoint('malacca'),
    'hormuz': getShippingDataForChokepoint('hormuz'),
    'panama': getShippingDataForChokepoint('panama')
  }
}

// Helper functions for analysis
export const getTrafficTrend = (chokePointId) => {
  const data = getShippingDataForChokepoint(chokePointId)
  if (!data) return null
  
  const last24h = data.hourly.slice(-24)
  const avg = last24h.reduce((sum, h) => sum + h.count, 0) / last24h.length
  const current = data.current.shipsInTransit
  
  return {
    average: avg,
    current: current,
    trend: current > avg ? 'increasing' : current < avg ? 'decreasing' : 'stable',
    percentFromAvg: ((current - avg) / avg * 100).toFixed(1)
  }
}

export const getVesselTypePercentages = (chokePointId) => {
  const data = getShippingDataForChokepoint(chokePointId)
  if (!data) return null
  
  const breakdown = data.current.vesselBreakdown
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0)
  
  return Object.entries(breakdown).map(([type, count]) => ({
    type,
    count,
    percentage: ((count / total) * 100).toFixed(1)
  }))
}

export const getTopFlagStates = (chokePointId) => {
  const data = getShippingDataForChokepoint(chokePointId)
  if (!data) return null
  
  const flags = data.current.flagStates
  const total = Object.values(flags).reduce((a, b) => a + b, 0)
  
  return Object.entries(flags)
    .map(([flag, count]) => ({
      flag,
      count,
      percentage: ((count / total) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count)
}

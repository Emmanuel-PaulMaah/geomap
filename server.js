import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import WebSocket from 'ws'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// In-memory cache for aggregated vessel data
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// AISStream.io WebSocket configuration
const AISSTREAM_URL = 'wss://stream.aisstream.io/v0/stream'

// Chokepoint coordinates and boundaries for filtering vessels
const CHOKEPOINTS = {
  suez: {
    lat: 29.9, lng: 32.55, name: 'Suez Canal',
    bounds: { minLat: 29.3, maxLat: 30.5, minLng: 31.5, maxLng: 33.5 }
  },
  malacca: {
    lat: 2.7, lng: 101.3, name: 'Strait of Malacca',
    bounds: { minLat: 0.5, maxLat: 4.0, minLng: 98.5, maxLng: 105.0 }
  },
  hormuz: {
    lat: 26.1, lng: 56.5, name: 'Strait of Hormuz',
    bounds: { minLat: 25.0, maxLat: 27.5, minLng: 54.5, maxLng: 58.5 }
  },
  panama: {
    lat: 9.0, lng: -79.5, name: 'Panama Canal',
    bounds: { minLat: 8.0, maxLat: 10.0, minLng: -81.5, maxLng: -77.5 }
  }
}

// Vessel storage for each chokepoint (real-time)
const vesselsByChokepoint = {
  suez: [],
  malacca: [],
  hormuz: [],
  panama: []
}

// Track WebSocket connection status
let wsConnected = false
let wsClient = null
let reconnectAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_DELAY = 5000
let firstMessageLogged = false
let messageCount = 0

/**
 * Initialize AISStream.io WebSocket connection
 * Receives real-time AIS vessel data globally
 */
function initializeAISStream() {
  console.log('🔌 Connecting to AISStream.io...')

  wsClient = new WebSocket(AISSTREAM_URL)

  wsClient.onopen = () => {
    wsConnected = true
    reconnectAttempts = 0
    console.log('✅ Connected to AISStream.io WebSocket')

    // Send subscription message to AISStream.io
    // Requires API key - get free key at https://aisstream.io/authenticate
    const apiKey = process.env.AISSTREAM_API_KEY
    
    if (!apiKey) {
      console.log('ℹ️  No AISSTREAM_API_KEY configured')
      console.log('🔗 Get a free API key: https://aisstream.io/authenticate')
      console.log('📄 Add to .env: AISSTREAM_API_KEY=your_key')
      console.log('⚠️  Using mock data for now\n')
      wsConnected = false
      wsClient.close()
      return
    }

    const subscriptionMessage = {
      APIKey: apiKey,
      BoundingBoxes: [
        // Suez
        [[29.3, 31.5], [30.5, 33.5]],
        // Malacca
        [[0.5, 98.5], [4.0, 105.0]],
        // Hormuz
        [[25.0, 54.5], [27.5, 58.5]],
        // Panama
        [[8.0, -81.5], [10.0, -77.5]]
      ]
    }
    
    wsClient.send(JSON.stringify(subscriptionMessage))
    console.log('📊 Subscribed to AIS data for 4 chokepoints')
    console.log('⏳ Waiting for vessel data (~10-30 seconds)...')
  }

  wsClient.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)
      messageCount++
      
      // Debug: log first message to see format
      if (!firstMessageLogged) {
        console.log('📨 First message from AISStream:', JSON.stringify(message).substring(0, 300))
        firstMessageLogged = true
      }
      
      // Check for error messages
      if (message.error) {
        console.error('❌ AISStream error:', message.error)
        return
      }
      
      // AISStream.io sends messages with Message field containing the actual AIS data
      const aisData = message.Message ? JSON.parse(message.Message) : message
      
      // Handle AIS message type (Types 1-3 are position reports)
      if (aisData.Type === 1 || aisData.Type === 2 || aisData.Type === 3) {
        const vessel = {
          mmsi: aisData.MMSI,
          vesselName: aisData.VesselName || 'Unknown',
          shipType: getShipType(aisData.ShipType),
          flag: aisData.Flag || 'XX',
          length: aisData.Length || 0,
          width: aisData.Width || 0,
          cargo: aisData.Cargo || 'General Cargo',
          latitude: aisData.Latitude,
          longitude: aisData.Longitude,
          speed: aisData.SOG || 0,
          course: aisData.COG || 0,
          heading: aisData.Heading || 360,
          draught: aisData.Draught || 0,
          destination: aisData.Destination || 'Unknown',
          timestamp: new Date(aisData.timestamp || Date.now())
        }

        // Route vessel to appropriate chokepoint(s)
        const routed = routeVesselToChokepoints(vessel)

        // Log first vessels routed to each chokepoint
        if (routed && Object.values(routed).some(v => v)) {
          const routedTo = Object.entries(routed)
            .filter(([, count]) => count > 0)
            .map(([cp, count]) => `${cp}(+${count})`)
            .join(', ')
          if (routedTo) {
            console.log(`📍 Vessel routed: ${vessel.mmsi} (${vessel.shipType}) → ${routedTo}`)
          }
        }
      }
    } catch (error) {
      // Silently ignore parse errors (keep stream flowing)
    }
  }

  wsClient.onerror = (error) => {
    wsConnected = false
    console.error('❌ WebSocket error:', error.message || error)
  }

  wsClient.onclose = () => {
    wsConnected = false
    console.log('⚠️  Disconnected from AISStream.io')

    // Attempt reconnection
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++
      console.log(`🔄 Reconnection attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} in ${RECONNECT_DELAY}ms...`)
      setTimeout(initializeAISStream, RECONNECT_DELAY)
    } else {
      console.log('❌ Max reconnection attempts reached. Falling back to mock data.')
    }
  }
}

/**
 * Convert AIS ShipType code to human-readable string
 */
function getShipType(code) {
  if (!code) return 'Vessel'

  const shipTypes = {
    30: 'Fishing Vessel',
    31: 'Tug',
    32: 'Tug/Tow',
    33: 'Military Ops',
    34: 'Sailboat',
    35: 'Pleasure',
    36: 'Pleasure',
    37: 'High Speed Craft',
    38: 'High Speed Craft',
    39: 'High Speed Craft',
    50: 'Pilot Vessel',
    51: 'Search & Rescue',
    52: 'Tug',
    53: 'Port Tender',
    54: 'Anti-Pollution',
    55: 'Law Enforcement',
    56: 'Medical Transport',
    57: 'Non-Combat',
    58: 'Non-Combat',
    59: 'Passenger Ship',
    60: 'Passenger Ship',
    61: 'Passenger Ship',
    62: 'Passenger Ship',
    63: 'Passenger Ship',
    64: 'Passenger Ship',
    65: 'Passenger Ship',
    66: 'Passenger Ship',
    67: 'Passenger Ship',
    68: 'Passenger Ship',
    69: 'Passenger Ship',
    70: 'Cargo Ship',
    71: 'Cargo Ship',
    72: 'Cargo Ship',
    73: 'Cargo Ship',
    74: 'Cargo Ship',
    75: 'Cargo Ship',
    76: 'Cargo Ship',
    77: 'Cargo Ship',
    78: 'Cargo Ship',
    79: 'Cargo Ship',
    80: 'Tanker',
    81: 'Tanker',
    82: 'Tanker',
    83: 'Tanker',
    84: 'Tanker',
    85: 'Tanker',
    86: 'Tanker',
    87: 'Tanker',
    88: 'Tanker',
    89: 'Tanker'
  }

  return shipTypes[code] || 'Vessel'
}

/**
 * Categorize vessel type for UI display
 */
function categorizeVessel(vessel) {
  const name = vessel.shipType.toLowerCase()

  if (name.includes('tanker')) return 'tankers'
  if (name.includes('container') || name.includes('cargo')) return 'containerShips'
  if (name.includes('bulk') || name.includes('bulk carrier')) return 'bulkCarriers'
  if (name.includes('roro') || name.includes('vehicle')) return 'roRoShips'
  if (name.includes('passenger')) return 'other'
  if (name.includes('fishing')) return 'other'
  if (name.includes('tug')) return 'other'

  return 'other'
}

/**
 * Route vessel to chokepoint(s) based on current position
 * Returns object showing which chokepoints received the vessel
 */
function routeVesselToChokepoints(vessel) {
  const { latitude, longitude } = vessel
  const routed = {}

  if (!latitude || !longitude) return routed

  Object.entries(CHOKEPOINTS).forEach(([id, chokepoint]) => {
    const { bounds } = chokepoint

    // Check if vessel is within chokepoint bounds
    if (latitude >= bounds.minLat && latitude <= bounds.maxLat &&
        longitude >= bounds.minLng && longitude <= bounds.maxLng) {

      routed[id] = true

      // Check if vessel already exists, update it
      const existingIdx = vesselsByChokepoint[id].findIndex(v => v.mmsi === vessel.mmsi)

      if (existingIdx >= 0) {
        vesselsByChokepoint[id][existingIdx] = vessel
      } else {
        // Add new vessel (limit to last 100 per chokepoint)
        if (vesselsByChokepoint[id].length >= 100) {
          vesselsByChokepoint[id].shift()
        }
        vesselsByChokepoint[id].push(vessel)
      }

      // Invalidate cache when data changes
      cache.delete(`shipping_${id}`)
    }
  })

  return routed
}

/**
 * Get shipping data for chokepoint (from live WebSocket or mock)
 */
async function getShippingDataForChokepoint(chokePointId) {
  const chokepoint = CHOKEPOINTS[chokePointId]
  if (!chokepoint) return null

  // Check cache first
  const cacheKey = `shipping_${chokePointId}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  // Get live vessels from WebSocket or use mock
  const vessels = wsConnected ? vesselsByChokepoint[chokePointId] : null

  if (!wsConnected || !vessels || vessels.length === 0) {
    // Fall back to mock data
    const mockData = getMockShippingData(chokePointId)
    cache.set(cacheKey, {
      data: mockData,
      timestamp: Date.now()
    })
    return mockData
  }

  // Build response from live vessels
  const vesselBreakdown = {
    containerShips: 0,
    tankers: 0,
    bulkCarriers: 0,
    roRoShips: 0,
    other: 0
  }

  const flagStates = {}
  const capturedVessels = []

  // Process vessel data
  vessels.forEach(vessel => {
    // Count by type
    const category = categorizeVessel(vessel)
    vesselBreakdown[category]++

    // Count by flag
    flagStates[vessel.flag] = (flagStates[vessel.flag] || 0) + 1

    // Store notable vessels (limit to 10)
    if (capturedVessels.length < 10) {
      capturedVessels.push({
        mmsi: vessel.mmsi,
        name: vessel.vesselName,
        type: vessel.shipType,
        flag: vessel.flag,
        length: vessel.length,
        cargo: vessel.cargo,
        from: 'Unknown',
        to: vessel.destination,
        eta: Math.floor(Math.random() * 24) + 1
      })
    }
  })

  // Calculate average delay (realistic simulation)
  const avgDelayMinutes = Math.floor(Math.random() * 20)

  // Determine traffic density
  let trafficDensity = 'low'
  if (vessels.length > 100) trafficDensity = 'critical'
  else if (vessels.length > 70) trafficDensity = 'high'
  else if (vessels.length > 40) trafficDensity = 'moderate'

  // Generate hourly trend (last 24 hours)
  const hourly = Array.from({ length: 25 }, (_, i) => ({
    hour: i - 24,
    count: Math.max(vessels.length - Math.floor(Math.random() * 20), 0)
  }))

  const data = {
    id: chokePointId,
    name: chokepoint.name,
    lastUpdated: new Date(),
    current: {
      shipsInTransit: vessels.length,
      avgDelayMinutes,
      trafficDensity,
      vesselBreakdown,
      flagStates
    },
    hourly,
    anomalies: detectAnomalies(vessels),
    averageTransitTime: 12 + Math.floor(Math.random() * 8),
    capturedVessels,
    source: 'aisstream'
  }

  // Cache the result
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  })

  return data
}

/**
 * Detect anomalies in vessel data
 */
function detectAnomalies(vessels) {
  const anomalies = []

  // Check for unusual congestion
  if (vessels.length > 120) {
    anomalies.push({
      type: 'congestion',
      severity: 'high',
      message: `Critical congestion: ${vessels.length} vessels detected`,
      timestamp: new Date()
    })
  }

  // Check for tanker concentration
  const tankers = vessels.filter(v => v.shipType.includes('Tanker')).length
  if (tankers > vessels.length * 0.6 && vessels.length > 10) {
    anomalies.push({
      type: 'tanker_surge',
      severity: 'medium',
      message: `High tanker concentration: ${tankers} tankers (${((tankers/vessels.length)*100).toFixed(1)}%)`,
      timestamp: new Date()
    })
  }

  return anomalies
}

/**
 * Mock data for development/offline mode
 */
function getMockShippingData(chokePointId) {
  const mockDataSets = {
    suez: {
      id: 'suez',
      name: 'Suez Canal',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 45 + Math.floor(Math.random() * 10),
        avgDelayMinutes: 8 + Math.floor(Math.random() * 5),
        trafficDensity: 'moderate',
        vesselBreakdown: {
          containerShips: 18,
          tankers: 12,
          bulkCarriers: 10,
          roRoShips: 3,
          other: 2
        },
        flagStates: {
          PAN: 12,
          LBR: 8,
          HKG: 6,
          SG: 5,
          KR: 4,
          NOR: 4,
          other: 6
        }
      },
      hourly: Array.from({ length: 25 }, (_, i) => ({
        hour: i - 24,
        count: 38 + Math.floor(Math.random() * 14)
      })),
      anomalies: [],
      averageTransitTime: 14,
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
        }
      ],
      source: 'mock'
    },
    malacca: {
      id: 'malacca',
      name: 'Strait of Malacca',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 94 + Math.floor(Math.random() * 15),
        avgDelayMinutes: 2 + Math.floor(Math.random() * 3),
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
      hourly: Array.from({ length: 25 }, (_, i) => ({
        hour: i - 24,
        count: 82 + Math.floor(Math.random() * 25)
      })),
      anomalies: [],
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
        }
      ],
      source: 'mock'
    },
    hormuz: {
      id: 'hormuz',
      name: 'Strait of Hormuz',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 68 + Math.floor(Math.random() * 12),
        avgDelayMinutes: 12 + Math.floor(Math.random() * 8),
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
      hourly: Array.from({ length: 25 }, (_, i) => ({
        hour: i - 24,
        count: 55 + Math.floor(Math.random() * 25)
      })),
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
      ],
      source: 'mock'
    },
    panama: {
      id: 'panama',
      name: 'Panama Canal',
      lastUpdated: new Date(),
      current: {
        shipsInTransit: 38 + Math.floor(Math.random() * 8),
        avgDelayMinutes: 6 + Math.floor(Math.random() * 4),
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
      hourly: Array.from({ length: 25 }, (_, i) => ({
        hour: i - 24,
        count: 32 + Math.floor(Math.random() * 14)
      })),
      anomalies: [],
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
      ],
      source: 'mock'
    }
  }

  return mockDataSets[chokePointId] || null
}

/**
 * API Routes
 */

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    wsConnected,
    dataSource: wsConnected ? 'AISStream.io Live' : 'Mock Data'
  })
})

// Get shipping data for a specific chokepoint
app.get('/api/shipping/:chokePointId', async (req, res) => {
  const { chokePointId } = req.params

  try {
    const data = await getShippingDataForChokepoint(chokePointId)

    if (!data) {
      return res.status(404).json({ error: 'Chokepoint not found' })
    }

    res.json({
      success: true,
      data,
      wsConnected,
      apiVersion: 'v1'
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      error: 'Failed to fetch shipping data',
      message: error.message
    })
  }
})

// Get all chokepoints data
app.get('/api/shipping', async (req, res) => {
  try {
    const chokePointIds = ['suez', 'malacca', 'hormuz', 'panama']
    const allData = {}

    for (const id of chokePointIds) {
      allData[id] = await getShippingDataForChokepoint(id)
    }

    res.json({
      success: true,
      data: allData,
      wsConnected
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      error: 'Failed to fetch shipping data',
      message: error.message
    })
  }
})

// Clear cache (for testing/manual refresh)
app.post('/api/cache/clear', (req, res) => {
  cache.clear()
  res.json({ success: true, message: 'Cache cleared' })
})

// Get WebSocket status
app.get('/api/status/ws', (req, res) => {
  res.json({
    connected: wsConnected,
    reconnectAttempts,
    maxReconnectAttempts: MAX_RECONNECT_ATTEMPTS,
    vesselCounts: {
      suez: vesselsByChokepoint.suez.length,
      malacca: vesselsByChokepoint.malacca.length,
      hormuz: vesselsByChokepoint.hormuz.length,
      panama: vesselsByChokepoint.panama.length
    }
  })
})

const PORT = process.env.PORT || 3001

// Start server and WebSocket
app.listen(PORT, () => {
  console.log(`🚢 Shipping Data Server running on http://localhost:${PORT}`)
  console.log(`📊 API: http://localhost:${PORT}/api/shipping/:chokePointId`)
  console.log(`🔌 WebSocket: Connecting to AISStream.io...`)
  console.log('')

  // Initialize WebSocket connection to AISStream.io
  initializeAISStream()
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...')
  if (wsClient) {
    wsClient.close()
  }
  process.exit(0)
})

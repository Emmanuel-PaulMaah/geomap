# Advanced Visualizations Guide

Documentation for new supply chain and energy visualizations added to the geopolitical command center.

---

## Supply Chain Chokepoints

### What It Shows

Critical maritime routes, straits, and canals that control global trade flow. These are geographic bottlenecks where disruptions can cascade through the global economy.

### 12 Major Chokepoints Tracked

| Chokepoint | Location | World Trade | Risk Level | Key Commodity |
|------------|----------|-------------|-----------|--------------|
| **Strait of Malacca** | Malaysia/Indonesia/Singapore | 25% | Critical | Oil, Electronics |
| **Suez Canal** | Egypt | 12% | Critical | Oil, Manufactured Goods |
| **Panama Canal** | Panama | 6% | Critical | Oil, Containers |
| **Strait of Hormuz** | Iran/Oman | 21% | Critical | Oil (90%) |
| **English Channel** | UK/France | 11% | Medium | Oil, Containers |
| **Red Sea/Bab el-Mandeb** | Yemen/Djibouti/Eritrea | 12% | High | Oil, LNG |
| **Turkish Straits** | Turkey | 3% | High | Oil, Grain |
| **Strait of Gibraltar** | Spain/Morocco | 13% | Medium | Oil, Goods |
| **Sunda Strait** | Indonesia | 4% | Medium | Oil, Goods |
| **Great Belt/Little Belt** | Denmark | 8% | Medium | Oil, Grain |
| **Gulf of Aden** | Yemen/Oman/Djibouti | 12% | High | Oil, Containers |
| **Lombok Strait** | Indonesia | 2% | Low | Oil, Goods |

### How to Use

1. **Toggle Supply Chain Chokepoints** in CommandPanel
2. **Pulsing markers** appear on map at each chokepoint
3. **Click marker** to see:
   - Name and type (canal/strait/sea)
   - % of world trade passing through
   - Risk level (color-coded)
   - Commodities affected
   - Historical context and strategic importance
   - Alternative routes and their costs

### Color Coding

- **Red (Critical)** — Any disruption causes global crisis
  - Malacca: 25% of world trade
  - Hormuz: 21% of oil
  - Suez: 12% of trade, no alternative exists

- **Orange (High)** — Significant disruption impact
  - Red Sea (Houthis, piracy)
  - Turkish Straits (geopolitical control)

- **Yellow (Medium)** — Regional impact
  - Gibraltar, English Channel (developed alternatives)

- **Green (Low)** — Niche but available alternatives

### Strategic Insights

**Why This Matters:**
- Shows global economic vulnerability
- Explains why controlling geography = leverage
- Identifies crisis triggers (Suez blockade = $400B hit)
- Reveals China's Strategic concerns (Malacca Dilemma)
- Shows US Navy deployment rationale (protect chokepoints)

**Real Examples:**
- 2021 Suez blockage: Ever Given ship costs global economy $400B+
- 2024 Red Sea: Houthi missiles disrupt Suez/Bab el-Mandeb alternative
- Strait of Hormuz: Iran threat → oil prices spike
- Taiwan's chips: 54% of advanced chip production passes through chokepoints

---

## Energy Independence

### What It Shows

How dependent each country is on imported energy (oil, natural gas, coal) vs. domestic production and renewables.

**Score Range:**
- **80-100%** — Independent (domestic sources, renewables)
- **60-79%** — Mostly Independent (some imports)
- **40-59%** — Moderate Dependency (significant imports)
- **20-39%** — High Dependency (heavily reliant)
- **0-19%** — Critical Dependency (nearly 100% imports)

### Data Tracked Per Country

```javascript
{
  overall: 80,           // Overall energy independence %
  oil: 85,               // Oil self-sufficiency %
  gas: 100,              // Natural gas self-sufficiency %
  renewables: 20,        // Renewable energy %
  nuclear: true,         // Has nuclear power
  hydro: true,           // Hydroelectric power
  coal: true,            // Coal reserves/use
  geothermal: true,      // Geothermal resources
  shale: true,           // Shale oil/gas
  solar: true,           // Solar development
  wind: true,            // Wind power
  ethanol: true,         // Biofuel production
  biomass: true,         // Forest/agricultural biomass
  notes: "Oil/gas exporter..."
}
```

### Energy Independence Spectrum

**Independent (80-100%)**
- Norway, Russia, Saudi Arabia, Australia, Canada
- Oil/gas exporters with hydro or renewables
- **Strategic position**: Energy leverage over importers

**Mostly Independent (60-79%)**
- USA (shale boom), China (coal), Denmark (wind)
- Mix of domestic production and growing renewables

**Moderate Dependency (40-59%)**
- Turkey, Brazil, France (nuclear), South Korea (nuclear)
- Some domestic sources but still import significant amounts

**High Dependency (20-39%)**
- India, Poland, Japan, Ukraine (pre-war)
- Limited domestic, heavy reliance on imports

**Critical Dependency (0-19%)**
- South Korea (0% domestic fossil fuels, 100% imports)
- Singapore (island city-state, 100% imports)
- Most island nations and small developed economies

### How to Use

1. **Toggle Energy Independence** in CommandPanel
2. **Legend appears** on left side showing color scale
3. **Select country** in InfoPanel to see:
   - Overall independence score with colored bar
   - Breakdown by oil, gas, renewables %
   - Energy sources (nuclear, hydro, coal, solar, wind, etc.)
   - Notes on vulnerability or strategic position

### Strategic Applications

**Finding Vulnerable Nations**
- High dependency = vulnerable to energy supply disruption
- Russia's leverage over Europe (natural gas)
- Japan's vulnerability (23 LNG import terminals)
- India's coal imports dependency

**Finding Energy Leaders**
- Norway, Denmark, Brazil: renewable transition leaders
- China: coal + hydro + fastest renewable growth
- France: nuclear independence (70% of electricity)
- Germany: renewable transition (66% of renewables in 2023)

**Geopolitical Leverage Points**
- OPEC countries control oil (65% of proven reserves)
- Russia controls gas (largest exporter)
- China controls rare earths for batteries/solar
- Middle East controls Strait of Hormuz oil (21% of world)

### Real Examples

**Case 1: Russia-Ukraine Energy War**
- Ukraine dependent on Russian gas (50% imports before war)
- Russia cut off supply (2009, 2015, 2022)
- Ukrainian vulnerability directly related to dependency score

**Case 2: Europe's Energy Crisis (2022)**
- Germany dependent on Russian gas (50% of natural gas)
- Russia invasion → supply cut → energy crisis
- Visible on Energy Independence toggle: Germany only 40% independent

**Case 3: China's Belt & Road Strategy**
- China controls rare earth mineral extraction (95% of world)
- Needed for renewables (solar panels, EV batteries, wind turbines)
- Countries seeking energy independence locked into China dependency
- Strategic lever masked behind "green energy" investments

**Case 4: Japan's Island Vulnerability**
- 100% energy import dependent
- 23 LNG import terminals (physical vulnerability)
- 2011 Fukushima → ended nuclear safety assumptions
- Critical chokepoint dependency (Strait of Malacca for Middle East oil)

---

## Combined Insights

### Using Both Visualizations Together

**Scenario: Understanding Global Economic Pressure Points**

1. Turn on **Supply Chain Chokepoints**
   → See where trade flows through

2. Turn on **Energy Independence**
   → See who needs what energy

3. Select a chokepoint, then check countries nearby
   → See who controls leverage

**Example: Malacca Strait Analysis**
- 25% of world trade
- Oil from Middle East to Asia passes through
- Malaysia, Indonesia, Singapore control choke point
- Check energy independence:
  - Japan: 12% independent (vulnerable to Malacca disruption)
  - South Korea: 5% independent (critical vulnerability)
  - China: 70% independent (less leverage over them)
- Understanding: US Navy protecting Malacca maintains global trade

**Example: Russia as Energy Weapon**
- Check Strait of Istanbul/Turkish Straits → natural gas pipeline gateway
- Toggle Energy Independence → see Europe's dependency
- See Red Sea/Hormuz for Middle East supply → bypasses Russia
- Understanding: Europe seeking LNG imports to reduce Russian leverage

---

## Data Completeness

### Chokepoints Coverage
✅ 12 major global chokepoints
✅ Arctic passages (not yet included - future)
✅ South China Sea disputes (overlaps with chokepoints)
✅ Regional canals and straits

### Energy Independence Coverage
✅ 150+ countries with energy data
✅ Breakdown by source (oil, gas, renewables, nuclear, hydro)
✅ Specific sources (shale, solar, wind, biomass, geothermal)
⚠️ Data as of 2023-2024 (yearly updates recommended)
⚠️ Percentages are estimates (exact figures vary by source)

---

## Educational Use Cases

### For Students
- **Geopolitics 101**: Why control of chokepoints matters
- **Economics**: Resource dependency = vulnerability
- **Environmental**: Renewable energy adoption by country
- **History**: Explain post-WWII US Navy strategy (protect trade routes)

### For Policy Analysis
- **Energy Security**: Which countries are vulnerable?
- **Supply Chain Risk**: Where are critical bottlenecks?
- **Strategic Alliances**: Who needs whose energy?
- **Economic Sanctions**: Which countries can be pressured via energy?

### For Strategic Planning
- **Conflict Analysis**: Who fights over chokepoints/resources?
- **Alliance Building**: Which countries have aligned interests?
- **Economic Warfare**: Energy cutoff strategies
- **Infrastructure**: Why countries build alternative routes

---

## Future Enhancements

Planned additions to these visualizations:

- [ ] Arctic Passages (as ice melts, new chokepoints emerge)
- [ ] Pipeline networks (oil/gas pipelines overlaid)
- [ ] Historical chokepoint disruptions (timeline of blockages)
- [ ] Economic impact calculations (GDP loss per chokepoint disruption)
- [ ] Renewable energy growth trends (trajectory visualization)
- [ ] Critical mineral dependencies (lithium, cobalt, rare earths)
- [ ] Alternative route analysis (economic cost of detours)
- [ ] Real-time shipping data (current traffic through chokepoints)
  - **Data Source**: AIS (Automatic Identification System) via MarineTraffic or Spire Global API
  - **Display**: Live ship counts per chokepoint with vessel type breakdown
  - **Metrics**: 
    - Current traffic density (ships per hour)
    - Average transit time delays
    - Vessel types (container ships, tankers, bulk carriers, RoRo)
    - Flag state distribution (ship ownership nationalities)
  - **Updates**: Real-time (5-15 min refresh) or historical trends (24h, 7d, 30d)
  - **Alerts**: Anomaly detection (unusual traffic patterns, disruptions)
  - **UI Elements**:
    - Live counter badges on chokepoint markers
    - Mini traffic chart per chokepoint (last 24 hours)
    - Vessel list popover with ship details (size, cargo, origin, destination)
    - Heatmap overlay showing congestion patterns

---

## References

### Data Sources
- UN Conference on Trade & Development (UNCTAD) — Trade flows
- International Energy Agency (IEA) — Energy statistics
- SIPRI — Military/strategic data
- Vessel tracking — Real-time shipping data
- National statistics bureaus — Country-specific energy data

### Further Reading
- "The World in 2050" — Commodity chokepoint analysis
- "Commodity Supercycles" — Resource geography importance
- "Energy Geopolitics" — Strategic resource control
- "Chokepoint" — Academic studies of maritime vulnerabilities

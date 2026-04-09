# GeoMap - Comprehensive Features Guide

## Overview

GeoMap is an interactive geopolitical command center that visualizes complex global relationships, resources, conflicts, and strategic information on an interactive world map. Built with React, Leaflet, and modern web technologies, it provides comprehensive geographic and geopolitical intelligence in one intuitive interface.

---

## Main Interface Components

### 1. **Interactive World Map (Center)**
The central component displays an interactive Leaflet map where you can:
- **Click on countries** to view detailed information
- **Zoom and pan** to explore specific regions
- **Toggle between map types** (dark and light themes available)
- **View visualization overlays** including bilateral relations, military power, trade blocs, and more
- **Select chokepoints** to analyze supply chain vulnerabilities

**Map Features:**
- Real-time country selection with visual feedback
- Country borders with optional highlighting
- Dynamic markers for various geopolitical features
- Multiple visualization layers that can be toggled independently

---

## 2. **Command Panel (Left Sidebar)**

The Command Panel provides all controls for filtering and visualization management.

### Search & Filter Section
- **Country Search**: Type country names to filter the map display
- **Region Filter**: Dropdown to filter countries by geographic region (Europe, Asia, Africa, Americas, Oceania)
- **Organization Filter**: Filter countries by membership in international organizations (NATO, ASEAN, MERCOSUR, AU, etc.)
- **Count Display**: Shows number of countries matching current filters

### Keyboard Shortcuts
- **ESC**: Clear all selections
- **Enter**: Focus on the map
- **Ctrl+F**: Focus on search bar

### Visualization Layers

Toggle any visualization on/off independently:

#### **Bilateral Relations**
- **Color-coded lines** connecting countries based on relationship type
- **Relation types**:
  - 🟢 **Ally** (green) - Strategic partnerships and alliances
  - 🔴 **Adversary** (red) - Hostile or competing relations
  - 🟡 **Trade Partner** (yellow) - Economic cooperation
  - 🟣 **Competitor** (purple) - Economic competition
- **Interactive legend** to show/hide specific relation types
- Shows connection strength between nations

#### **Resources & Trade**
- **Visualizes critical global resources**:
  - Oil and natural gas reserves/flows
  - Rare earth elements production
  - Semiconductor manufacturing capabilities
  - Agricultural exports
  - Strategic minerals (lithium, cobalt, etc.)
- **Color-coded indicators** for resource types
- **Exporter vs. Importer distinction** for each country's role in supply chains

#### **Military Power**
- **Military spending indicators** - Size relative to military budget
- **Active personnel counts** for each country
- **Nuclear capabilities** - Countries with nuclear arsenals highlighted
- **Regional military distribution** - Visual representation of military balance
- **Defense capability assessment** - Overview of military strength by region

#### **Trade Blocs**
- **Regional trade organization memberships**:
  - EU (European Union)
  - ASEAN (Southeast Asia)
  - MERCOSUR (South America)
  - African Union (AU)
  - GCC (Gulf Cooperation Council)
  - ECOWAS (West Africa)
  - And more...
- **Shows economic interdependencies** within regions
- **Highlights trade corridors** and economic partnerships

#### **Territorial Disputes**
- **Marks active territorial conflicts** and border disputes
- **Severity levels**: Low, Medium, High
- **Dispute status**: Frozen conflicts, active negotiations, ongoing tensions
- **Duration information** - How long disputes have existed
- **Data source**: UCDP (Uppsala Conflict Data Program), ICG (International Crisis Group)

#### **Regional Power Analysis**
- **Identifies regional hegemons** - Dominant powers in each region
- **Power score visualization** - Relative strength compared to neighbors
- **Status categories**:
  - 🟢 **Hegemon** - Regional dominant power
  - 🟡 **Major Power** - Significant regional influence
  - 🟡 **Regional Power** - Notable regional actor
  - ⚪ **Minor Power** - Limited regional influence
- **Regional dynamics** - Context on power relationships
- **Hegemony basis** - Factors contributing to regional dominance

#### **Supply Chain Chokepoints**
- **Critical global strategic bottlenecks**:
  - Suez Canal - 12% of world maritime trade
  - Panama Canal - 5% of world maritime trade
  - Strait of Malacca - 25% of oil, 30% of LNG shipping
  - Strait of Hormuz - 21% of oil consumption
  - Turkish Straits (Bosporus) - Russian energy exports
  - And more...
- **Chokepoint information**:
  - Percentage of world trade affected
  - Risk level assessment
  - Type (maritime, land, air)
  - Commodities flowing through
  - Strategic implications
  - Alternative routes available
- **Real-time traffic monitoring** - View shipping traffic patterns when selected
- **Color-coded risk levels**: Low, Medium, High, Critical

#### **Energy Independence**
- **Overall energy independence score** (0-100%)
- **Energy source breakdown**:
  - Oil dependency
  - Natural gas reliance
  - Renewable energy percentage
  - Nuclear power usage
  - Coal, hydroelectric, geothermal, solar, wind, etc.
- **Color-coded status**:
  - 🔴 Red - High energy dependency (vulnerable)
  - 🟡 Yellow - Moderate independence
  - 🟢 Green - High independence (secure)
- **Strategic implications** for geopolitical stability

---

## 3. **Info Panel (Right Sidebar)**

When you click on a country or chokepoint, the Info Panel displays detailed information.

### For Countries:

#### **Basic Information**
- Country flag and official name
- Country biography/overview from curated data

#### **Geographic Data**
- Region and subregion classification
- Capital city
- Total area (km²)
- Land borders and neighboring countries

#### **Demographics**
- Population size
- Population density
- Growth rate

#### **Cultural Information**
- Official languages
- Ethnic groups breakdown
- Major religions

#### **Geopolitical Profile**
- International organization memberships
- Key geopolitical issues and tensions
- Alignment in global conflicts

#### **Neighbor Analysis**
- List of neighboring countries
- Quick access to view neighbor details
- Border dispute information

#### **Resources & Trade**
- Critical resources produced (exports)
- Major resource dependencies (imports)
- Role in global supply chains
- Strategic minerals and commodities
- Agricultural capabilities

#### **Trade Blocs**
- Organization memberships
- Trade agreement details
- Economic partnership status

#### **Supply Chain Role**
- Producer vs. Consumer status
- Position in critical supply chains
- Dependency vulnerabilities

#### **Military Profile**
- Military spending (billions USD)
- Active military personnel
- **Nuclear status** (if applicable)
- Regional military power ranking
- Defense capabilities overview
- **Data sources**: SIPRI (Stockholm International Peace Research Institute), FAS (Federation of American Scientists)

#### **Territorial Disputes**
- List of all active territorial disputes
- Severity assessment (Low/Medium/High)
- Dispute description and history
- Current status and timeline
- Parties involved

#### **Regional Power Status**
- Regional hegemon or power classification
- Power score (0-100)
- Regional influence description
- Hegemon basis (economic, military, political)
- Regional dynamics and competitive landscape

#### **Energy Independence**
- Overall independence score
- Energy source breakdown (visual bars)
- Major energy sources listed
- Strategic energy notes
- Vulnerabilities and strengths

#### **Bilateral Relations Stats**
- Count of allied countries
- Count of adversarial relationships
- Count of trade partners
- Count of competitors
- Provides quick overview of international standing

---

### For Chokepoints:

#### **Strategic Information**
- Chokepoint name and location
- Type (maritime, land route, etc.)
- Percentage of world trade flowing through
- Risk level assessment
- Country/region controlling the chokepoint

#### **Detailed Context**
- Description of strategic importance
- Commodities primarily transported
- Strategic implications for global trade
- Alternative routes if this chokepoint closes
- Potential disruption scenarios

#### **Real-Time Traffic Display**
Click "View Real-Time Traffic" to see:
- Active shipping routes
- Current traffic volume
- Shipping patterns
- Peak usage periods
- Alternative pathway analysis

---

## 4. **Deep Dive Analysis**

Click **"Deep Dive"** button in the Info Panel to access comprehensive country analysis.

### What's Included:

#### **Comparative Analytics**
- **Add countries** to compare side-by-side
- **Visual comparisons** of metrics
- **Radar charts** showing relative strengths
- **Bar graphs** for numeric comparisons

#### **Economic Data**
- GDP and economic metrics
- Major industries
- Export/import data
- Economic growth trends
- Unemployment rates
- Inequality indices (Gini coefficient)
- HDI (Human Development Index)

#### **Governance & Politics**
- Government type (Democracy, Autocracy, etc.)
- Head of state/government
- Founding date and history
- Dissolution information (if applicable)
- International agreements signed

#### **Demographics Deep Dive**
- Population trends and growth
- Age distribution
- Life expectancy
- Fertility rates
- Infant mortality rates
- Literacy rates
- Urban vs. rural population split

#### **Infrastructure & Development**
- Road network length (km)
- Rail network length (km)
- Airport information
- Internet access and TLD
- Electrification rates
- Major cities and populations
- Transportation infrastructure maps

#### **Environmental Metrics**
- Forest coverage percentage
- Agricultural land percentage
- CO2 emissions
- Renewable energy percentage
- Climate zones
- Major natural features (rivers, mountains)
- Highest and lowest points

#### **Cultural & Social**
- National anthem and flag details
- Major religions and ethnic composition
- National sports
- Patron saints (where applicable)
- UNESCO World Heritage Sites
- Nobel Prize laureates
- Major cultural contributions

#### **Global Indices**
- Corruption Perception Index
- Press Freedom Index
- Human Development Index (HDI)
- Gini Coefficient (inequality)
- World Heritage Sites count
- Nobel laureates

#### **Connectivity Metrics**
- Internet domain (.uk, .cn, etc.)
- International dialing code
- Electricity access percentage
- Measurement system used
- Driving side (left/right)

#### **Natural Features**
- Largest cities by population
- Major rivers
- Mountain ranges
- Water bodies
- Climate zones
- Geographical extremes

---

## 5. **Panel Management**

### Toggle Panels
- **Command Panel**: Hide/show using the **X** button or chevron toggle
- **Info Panel**: Hide/show using the **X** button or chevron toggle
- **Floating toggles** appear when panels are hidden to easily restore them

### Collapsible Sections
Most panels have **collapsible sections** marked with:
- **▼** Chevron (expanded)
- **▶** Chevron (collapsed)

Click to expand/collapse individual information sections to focus on what you need.

---

## How to Use GeoMap

### Basic Workflow:

1. **Search or Filter** countries using the Command Panel
   - Search by name, region, or organization membership

2. **Toggle Visualizations** to see different aspects
   - Start with one layer, then add more
   - Experiment with combinations

3. **Click on a Country** to view details in the Info Panel
   - Review all available information
   - Expand/collapse sections as needed

4. **Compare with Neighbors** by clicking on adjacent countries
   - Understand regional dynamics
   - See contrast in resources, military power, etc.

5. **Analyze Chokepoints** for supply chain vulnerabilities
   - Click a chokepoint on the map
   - View strategic importance and traffic
   - Understand global trade dependencies

6. **Deep Dive** into specific country analysis
   - Compare multiple countries
   - Analyze charts and metrics
   - Export or document findings

### Advanced Features:

**Filtering by Organization:**
- Click any organization membership in the Info Panel
- Map automatically filters to show only members
- Clear filter using the badge in Command Panel

**Combining Visualizations:**
- Mix multiple layers (e.g., Military + Resources + Bilateral Relations)
- Identify correlations between different metrics
- Understand geopolitical patterns

**Keyboard Navigation:**
- **ESC** to clear all selections and reset view
- **Enter** to focus map for zooming/panning
- **Ctrl+F** to jump to search bar

---

## Data Sources

GeoMap aggregates data from authoritative sources:

| Data Type | Sources |
|-----------|---------|
| Geographic Data | REST Countries API, OpenStreetMap |
| Geopolitical Info | Wikipedia, Wikidata |
| Military Info | SIPRI, FAS (Federation of American Scientists) |
| Trade & Resources | World Bank, USGS, IEA (International Energy Agency) |
| Conflicts/Disputes | UCDP, ICG (International Crisis Group) |
| Energy Data | IEA, EIA (U.S. Energy Information Administration) |
| Economic Data | IMF, World Bank, OECD |
| Environmental Data | UN, World Bank, Climate databases |

---

## Key Concepts Explained

### Trade Blocs
Regional economic organizations that facilitate trade, investment, and political cooperation:
- **EU** - Highest integration (tariff-free trade, free movement)
- **ASEAN** - Southeast Asia economic cooperation
- **MERCOSUR** - South American trade union
- **AU** - African continental union
- **GCC** - Gulf oil-producing nations

### Chokepoints
Geographic bottlenecks controlling global trade:
- Most critical for energy and maritime commerce
- Disruption could impact world economy
- Strategic leverage for controlling nations
- Subject to geopolitical tensions

### Regional Powers
Nations dominating their regions through:
- **Military capability** - Armed force projection
- **Economic influence** - Trade and investment power
- **Political influence** - Diplomatic reach and alliances
- **Cultural influence** - Soft power and attraction

### Bilateral Relations
Two-nation relationships classified as:
- **Allies** - Strategic partnerships, defense agreements
- **Adversaries** - Political opposition, territorial disputes, ideological conflict
- **Trade Partners** - Economic cooperation and mutual benefit
- **Competitors** - Economic or political rivalry

### Energy Independence
A country's ability to meet its energy needs without imports:
- **Score 0-100%** (100 = completely self-sufficient)
- Critical for economic security
- Vulnerable countries depend on imports/unstable suppliers
- Determines foreign policy constraints

---

## Tips for Effective Analysis

1. **Start Simple**: Enable one visualization, understand the patterns, then add layers

2. **Use Search**: Find specific countries or regions of interest quickly

3. **Compare Regions**: Look at how neighboring countries differ

4. **Follow Trade Routes**: Use chokepoints to understand dependencies

5. **Check Organizations**: Filter by international organization membership for strategic groupings

6. **Deep Dive Comparisons**: Compare 2-3 countries to understand competitive dynamics

7. **Note Patterns**: Look for correlations between military power, resources, and regional status

8. **Update Context**: Combine current visualization with historical knowledge for deeper insights

---

## Browser Recommendations

For optimal performance:
- **Desktop browsers**: Chrome, Firefox, Edge, Safari (latest versions)
- **Mobile**: Map is responsive but best experienced on larger screens
- **Minimum resolution**: 1024x768 (better at 1920x1080)

---

## Troubleshooting

**Map not loading countries?**
- Clear search/filters and try again
- Refresh the browser page

**Data appears outdated?**
- Data is pulled from live APIs and databases
- Refresh page to get latest cached data

**Visualizations overlapping?**
- Collapse some visualization layers
- Use zoom to see specific areas more clearly

**Information not showing for a country?**
- Some countries may have limited data in certain categories
- This is accurate to data availability, not an error

---

## Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| **ESC** | Clear selection and reset |
| **Enter** | Focus map |
| **Ctrl+F** | Focus search input |
| **Click country** | Select and view details |
| **Click chokepoint** | View strategic information |
| **Zoom** | Scroll wheel or pinch (mobile) |

---

## Feature Summary

| Feature | Purpose | Location |
|---------|---------|----------|
| Search | Find countries by name | Command Panel |
| Region Filter | Filter by geographic region | Command Panel |
| Organization Filter | Filter by membership | Command Panel/Info Panel |
| Bilateral Relations | Show international alliances/conflicts | Visualizations |
| Resources | View resource production/dependency | Visualizations |
| Military Power | Military capability assessment | Visualizations |
| Trade Blocs | Economic organization membership | Visualizations |
| Territorial Disputes | Active conflicts | Visualizations |
| Regional Power | Regional dominance analysis | Visualizations |
| Chokepoints | Supply chain bottlenecks | Visualizations |
| Energy Independence | Self-sufficiency assessment | Visualizations |
| Deep Dive | Comprehensive country analysis | Info Panel button |
| Country Bio | General country information | Info Panel |

---

**Version**: 1.0  
**Last Updated**: April 2026  
**Project**: GeoMap - Geopolitical Intelligence Platform

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const appPath = path.join(root, 'src', 'App.jsx')
const mapPath = path.join(root, 'src', 'components', 'WorldMap.jsx')
const cssPath = path.join(root, 'src', 'components', 'WorldMap.css')

function read(file) {
  if (!fs.existsSync(file)) throw new Error(`Missing file: ${file}`)
  return fs.readFileSync(file, 'utf8')
}

function backup(file, contents) {
  const backupPath = `${file}.before-country-selector-fix`
  if (!fs.existsSync(backupPath)) fs.writeFileSync(backupPath, contents)
}

function replaceOnce(source, pattern, replacement, label) {
  const matches = source.match(pattern)
  if (!matches) throw new Error(`Could not find ${label}. Your local file may differ from main.`)
  return source.replace(pattern, replacement)
}

let app = read(appPath)
let map = read(mapPath)
let css = read(cssPath)

backup(appPath, app)
backup(mapPath, map)
backup(cssPath, css)

// App.jsx: track a visible country-data error.
app = replaceOnce(
  app,
  /const \[loading, setLoading\] = useState\(true\)/,
  `const [loading, setLoading] = useState(true)\n  const [countriesError, setCountriesError] = useState(null)`,
  'loading state in App.jsx'
)

// App.jsx: replace the fragile fetch with validated, abortable loading.
app = replaceOnce(
  app,
  /useEffect\(\(\) => \{\s*fetch\('https:\/\/restcountries\.com\/v3\.1\/all\?fields=name,cca2,cca3,region,subregion,capital,population,area,languages,latlng'\)[\s\S]*?\}, \[\]\)/,
  `useEffect(() => {\n    const controller = new AbortController()\n\n    async function loadCountries() {\n      try {\n        setLoading(true)\n        setCountriesError(null)\n\n        const response = await fetch(\n          'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,region,subregion,capital,population,area,languages,latlng,flags',\n          { signal: controller.signal }\n        )\n\n        if (!response.ok) {\n          throw new Error(\n            \`Country API failed: \${response.status} \${response.statusText}\`\n          )\n        }\n\n        const data = await response.json()\n\n        if (!Array.isArray(data)) {\n          throw new TypeError('Country API returned an invalid response')\n        }\n\n        const validCountries = data.filter(country =>\n          country?.cca3 &&\n          country?.name?.common &&\n          Array.isArray(country?.latlng) &&\n          country.latlng.length >= 2 &&\n          Number.isFinite(country.latlng[0]) &&\n          Number.isFinite(country.latlng[1])\n        )\n\n        if (validCountries.length === 0) {\n          throw new Error('Country API returned no valid map coordinates')\n        }\n\n        setCountries(validCountries)\n      } catch (error) {\n        if (error.name !== 'AbortError') {\n          console.error('Failed to load countries:', error)\n          setCountries([])\n          setCountriesError(error.message)\n        }\n      } finally {\n        if (!controller.signal.aborted) {\n          setLoading(false)\n        }\n      }\n    }\n\n    loadCountries()\n\n    return () => controller.abort()\n  }, [])`,
  'country fetch effect in App.jsx'
)

// App.jsx: make filtering defensive and normalize organization IDs reliably.
app = replaceOnce(
  app,
  /const filteredCountries = Array\.isArray\(countries\) \? countries\.filter\(c => \{[\s\S]*?\}\) : \[\]/,
  `const normalizedSearch = searchQuery.trim().toLowerCase()\n\n  const filteredCountries = countries.filter(country => {\n    const commonName = country?.name?.common ?? ''\n    const officialName = country?.name?.official ?? ''\n\n    const matchesSearch =\n      commonName.toLowerCase().includes(normalizedSearch) ||\n      officialName.toLowerCase().includes(normalizedSearch)\n\n    const matchesRegion = !regionFilter || country.region === regionFilter\n\n    let matchesOrganization = true\n    if (selectedOrganization) {\n      const orgKey = selectedOrganization\n        .toLowerCase()\n        .replace(/[^a-z0-9]/g, '')\n      const orgMembers = geopoliticalData[orgKey] ?? []\n      matchesOrganization = orgMembers.includes(country.cca3)\n    }\n\n    return matchesSearch && matchesRegion && matchesOrganization\n  })`,
  'country filtering in App.jsx'
)

app = app.replace(
  /const regions = Array\.isArray\(countries\) \? \[\.\.\.new Set\(countries\.map\(c => c\.region\)\.filter\(Boolean\)\)\] : \[\]/,
  `const regions = [...new Set(countries.map(country => country.region).filter(Boolean))]`
)

// App.jsx: pass complete data separately from filtered marker data, plus error state.
app = replaceOnce(
  app,
  /countries=\{filteredCountries\}\s*selectedCountry=/,
  `countries={filteredCountries}\n          allCountries={countries}\n          selectedCountry=`,
  'WorldMap countries props in App.jsx'
)

app = replaceOnce(
  app,
  /loading=\{loading\}/,
  `loading={loading}\n          error={countriesError}`,
  'WorldMap loading prop in App.jsx'
)

// WorldMap.jsx: update zoom state only after zooming ends.
map = map.replace(/map\.on\('zoom', handleZoom\)/, "map.on('zoomend', handleZoom)")
map = map.replace(/map\.off\('zoom', handleZoom\)/, "map.off('zoomend', handleZoom)")

// WorldMap.jsx: accept allCountries and error.
map = replaceOnce(
  map,
  /countries, selectedCountry, onCountrySelect, loading,/,
  `countries, allCountries = countries, selectedCountry, onCountrySelect, loading, error,`,
  'WorldMap props'
)

map = replaceOnce(
  map,
  /RelatedCountriesHighlight\(\{ selectedCountry, countries \}\)/,
  `RelatedCountriesHighlight({ selectedCountry, countries: allCountries })`,
  'relationship helper data source'
)

// WorldMap.jsx: expose API failures instead of silently rendering an empty map.
map = replaceOnce(
  map,
  /if \(loading\) \{[\s\S]*?\n  \}/,
  `if (loading) {\n    return (\n      <div className="map-loading">\n        <div className="spinner"></div>\n        <p>Loading world data...</p>\n      </div>\n    )\n  }\n\n  if (error) {\n    return (\n      <div className="map-loading map-error" role="alert">\n        <p>Country selectors could not be loaded.</p>\n        <small>{error}</small>\n        <button type="button" onClick={() => window.location.reload()}>\n          Retry\n        </button>\n      </div>\n    )\n  }`,
  'WorldMap loading block'
)

// WorldMap.jsx: make the rendered dot match Leaflet's computed icon size.
map = replaceOnce(
  map,
  /html: `<div class="marker-inner \$\{isSelected \? 'selected' : ''\} \$\{relationshipType \? `related-\$\{relationshipType\}` : ''\}"><\/div>`,/,
  `html: \`<div class="marker-inner \${isSelected ? 'selected' : ''} \${relationshipType ? \`related-\${relationshipType}\` : ''}" style="--marker-size: \${markerSize}px"></div>\`,`,
  'country marker HTML'
)

// WorldMap.css: dynamic marker size and error presentation.
css = replaceOnce(
  css,
  /\.marker-inner \{\s*width: 10px;\s*height: 10px;/,
  `.marker-inner {\n  width: var(--marker-size, 10px);\n  height: var(--marker-size, 10px);\n  box-sizing: border-box;`,
  'marker dimensions in WorldMap.css'
)

if (!css.includes('.map-error button')) {
  css += `\n\n.map-error {\n  padding: 32px;\n  text-align: center;\n}\n\n.map-error p {\n  margin: 0;\n  color: var(--text-primary);\n}\n\n.map-error small {\n  max-width: 560px;\n  color: var(--accent-red);\n  overflow-wrap: anywhere;\n}\n\n.map-error button {\n  padding: 10px 16px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-light);\n  color: var(--text-primary);\n}\n\n.map-error button:hover {\n  border-color: var(--accent-red);\n  color: var(--accent-red);\n}\n`
}

fs.writeFileSync(appPath, app)
fs.writeFileSync(mapPath, map)
fs.writeFileSync(cssPath, css)

console.log('Patched:')
console.log(`- ${path.relative(root, appPath)}`)
console.log(`- ${path.relative(root, mapPath)}`)
console.log(`- ${path.relative(root, cssPath)}`)
console.log('\nBackups use the suffix: .before-country-selector-fix')
console.log('\nNext: npm run lint && npm run build && npm run dev')

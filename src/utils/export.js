import { getMilitaryData } from '../data/military'
import { getCountryRegionalStatus } from '../data/regionalPowers'
import { getCountryDisputes } from '../data/disputes'

export const buildComparisonData = (countries) => {
  return countries.map(country => ({
    name: country.name.common,
    officialName: country.name.official,
    cca3: country.cca3,
    cca2: country.cca2,
    region: country.region,
    subregion: country.subregion,
    capital: country.capital?.[0],
    population: country.population,
    area: country.area,
    languages: country.languages ? Object.values(country.languages).join(', ') : '',
    
    // Military
    militarySpending: getMilitaryData(country.cca3)?.spending || null,
    activePersonnel: getMilitaryData(country.cca3)?.activePersonnel || null,
    nuclear: getMilitaryData(country.cca3)?.nuclear ? 'Yes' : 'No',
    nukes: getMilitaryData(country.cca3)?.nukes || null,
    
    // Regional
    regionalStatus: getCountryRegionalStatus(country.cca3)?.status || '',
    powerScore: getCountryRegionalStatus(country.cca3)?.power || null,
    region_role: getCountryRegionalStatus(country.cca3)?.region || '',
    
    // Disputes
    disputeCount: getCountryDisputes(country.cca3).length
  }))
}

export const exportToCSV = (countries) => {
  const data = buildComparisonData(countries)
  
  // Get all keys
  const keys = Object.keys(data[0])
  
  // Create CSV header
  const header = keys.join(',')
  
  // Create CSV rows
  const rows = data.map(row => 
    keys.map(key => {
      const value = row[key]
      // Escape quotes and wrap in quotes if contains comma
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value === null ? '' : value
    }).join(',')
  )
  
  const csv = [header, ...rows].join('\n')
  
  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `countries_comparison_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToJSON = (countries) => {
  const data = buildComparisonData(countries)
  const json = JSON.stringify(data, null, 2)
  
  // Download
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `countries_comparison_${new Date().toISOString().split('T')[0]}.json`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

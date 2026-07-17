import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import countriesSource from 'world-countries'

const outputPath = resolve('src/data/countries.json')

function isValidCountry(country) {
  const latitude = country?.latlng?.[0]
  const longitude = country?.latlng?.[1]

  return (
    typeof country?.cca2 === 'string' &&
    typeof country?.cca3 === 'string' &&
    typeof country?.name?.common === 'string' &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  )
}

async function generateCountries() {
  if (!Array.isArray(countriesSource)) {
    throw new TypeError('world-countries did not return an array')
  }

  const countries = countriesSource
    .filter(isValidCountry)
    .map(country => ({
      name: {
        common: country.name.common,
        official: country.name.official ?? country.name.common,
      },
      cca2: country.cca2,
      cca3: country.cca3,
      region: country.region ?? '',
      subregion: country.subregion ?? '',
      capital: country.capital ?? [],
      population: country.population ?? 0,
      area: country.area ?? 0,
      languages: country.languages ?? {},
      latlng: country.latlng,
      flags: country.flags ?? {},
    }))
    .sort((a, b) => a.name.common.localeCompare(b.name.common))

  if (countries.length < 200) {
    throw new Error(
      `Only ${countries.length} valid countries found; refusing to write file`,
    )
  }

  await mkdir(dirname(outputPath), { recursive: true })

  await writeFile(
    outputPath,
    `${JSON.stringify(countries, null, 2)}\n`,
    'utf8',
  )

  console.log(`Generated ${countries.length} countries`)
  console.log(`Saved to ${outputPath}`)
}

generateCountries().catch(error => {
  console.error('Failed to generate countries.json')
  console.error(error)
  process.exitCode = 1
})

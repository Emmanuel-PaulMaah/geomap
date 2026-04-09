import fs from 'fs';

// Fetch country bios from Wikipedia API
// Source: Wikipedia REST API - https://en.wikipedia.org/api/rest_v1/page/summary/{title}

async function fetchCountryBio(countryName) {
  try {
    // Replace spaces with underscores for Wikipedia URL
    const wikiTitle = countryName.replace(/ /g, '_');
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.extract || null;
  } catch (err) {
    console.error(`Failed to fetch bio for ${countryName}:`, err.message);
    return null;
  }
}

async function fetchCountriesList() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3');
    return response.json();
  } catch (err) {
    console.error('Failed to fetch countries list:', err);
    return [];
  }
}

async function generateBios() {
  console.log('Fetching country bios from Wikipedia...');
  const countries = await fetchCountriesList();
  
  const bios = {};
  let count = 0;

  for (const country of countries) {
    const cca3 = country.cca3;
    const countryName = country.name.common;
    
    const bio = await fetchCountryBio(countryName);
    if (bio) {
        bios[cca3] = bio;
        count++;
        // eslint-disable-next-line no-undef
        process.stdout.write(`\r✓ Fetched ${count}/${countries.length} bios`);
      }
    
    // Rate limiting - be respectful to Wikipedia
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n✓ Fetched ${count} country bios`);

  const content = `// Auto-generated from Wikipedia API
// Source: Wikipedia REST API (https://en.wikipedia.org/api/rest_v1/page/summary/)
// Updated: ${new Date().toISOString()}

export const countryBios = ${JSON.stringify(bios, null, 2)}

export const getCountryBio = (cca3) => {
  return countryBios[cca3] || null
}

export const getBioSummary = (cca3, wordLimit = 50) => {
  const bio = countryBios[cca3]
  if (!bio) return null
  
  const words = bio.split(' ')
  return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '')
}
`;

  fs.writeFileSync('./src/data/countryBios.js', content);
  console.log('✓ Generated countryBios.js with Wikipedia data');
}

generateBios().catch(err => console.error('Error:', err));

// Wikidata SPARQL queries for comprehensive country data
// Endpoint: https://query.wikidata.org/sparql

export const wikidataQueries = {
  // Get country basic info
  basicInfo: (countryQID) => `
    SELECT ?country ?countryLabel ?capital ?capitalLabel ?area ?population ?founded ?independence ?lang ?langLabel ?timezone
    WHERE {
      wd:${countryQID} wdt:P1448 ?countryLabel .
      OPTIONAL { wd:${countryQID} wdt:P36 ?capital . ?capital rdfs:label ?capitalLabel . FILTER(LANG(?capitalLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P2046 ?area }
      OPTIONAL { wd:${countryQID} wdt:P1082 ?population }
      OPTIONAL { wd:${countryQID} wdt:P571 ?founded }
      OPTIONAL { wd:${countryQID} wdt:P3334 ?independence }
      OPTIONAL { wd:${countryQID} wdt:P37 ?lang . ?lang rdfs:label ?langLabel . FILTER(LANG(?langLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P421 ?timezone }
      FILTER(LANG(?countryLabel) = "en")
    }
    LIMIT 100
  `,

  // Get government & political info
  government: (countryQID) => `
    SELECT ?govType ?govTypeLabel ?headOfState ?headOfStateLabel ?headOfGov ?headOfGovLabel ?parliament ?parliamentLabel
    WHERE {
      wd:${countryQID} wdt:P122 ?govType .
      OPTIONAL { wd:${countryQID} wdt:P35 ?headOfState . ?headOfState rdfs:label ?headOfStateLabel . FILTER(LANG(?headOfStateLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P6 ?headOfGov . ?headOfGov rdfs:label ?headOfGovLabel . FILTER(LANG(?headOfGovLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P194 ?parliament . ?parliament rdfs:label ?parliamentLabel . FILTER(LANG(?parliamentLabel) = "en") }
      ?govType rdfs:label ?govTypeLabel . FILTER(LANG(?govTypeLabel) = "en")
    }
    LIMIT 10
  `,

  // Get demographic info
  demographics: (countryQID) => `
    SELECT ?ethGroup ?ethGroupLabel ?ethPercent ?religion ?religionLabel ?religPercent
    WHERE {
      OPTIONAL { wd:${countryQID} wdt:P172 ?ethGroup . ?ethGroup rdfs:label ?ethGroupLabel . FILTER(LANG(?ethGroupLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P1532 ?ethPercent }
      OPTIONAL { wd:${countryQID} wdt:P140 ?religion . ?religion rdfs:label ?religionLabel . FILTER(LANG(?religionLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P1532 ?religPercent }
    }
    LIMIT 50
  `,

  // Get economic indicators
  economy: (countryQID) => `
    SELECT ?gdp ?gdpPerCapita ?currency ?currencyLabel ?industry ?industryLabel ?unemploy ?lifeExpect ?literacy
    WHERE {
      OPTIONAL { wd:${countryQID} wdt:P2131 ?gdp }
      OPTIONAL { wd:${countryQID} wdt:P2132 ?gdpPerCapita }
      OPTIONAL { wd:${countryQID} wdt:P38 ?currency . ?currency rdfs:label ?currencyLabel . FILTER(LANG(?currencyLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P452 ?industry . ?industry rdfs:label ?industryLabel . FILTER(LANG(?industryLabel) = "en") }
      OPTIONAL { wd:${countryQID} wdt:P1198 ?unemploy }
      OPTIONAL { wd:${countryQID} wdt:P2250 ?lifeExpect }
      OPTIONAL { wd:${countryQID} wdt:P1748 ?literacy }
    }
    LIMIT 20
  `,

  // Get UN and international orgs
  organizations: (countryQID) => `
    SELECT ?org ?orgLabel ?joinDate
    WHERE {
      wd:${countryQID} wdt:P463 ?org . ?org rdfs:label ?orgLabel . FILTER(LANG(?orgLabel) = "en")
      OPTIONAL { wd:${countryQID} pq:P580 ?joinDate }
    }
    ORDER BY ?orgLabel
    LIMIT 100
  `,

  // Get neighboring countries
  borders: (countryQID) => `
    SELECT ?border ?borderLabel
    WHERE {
      wd:${countryQID} wdt:P47 ?border . ?border rdfs:label ?borderLabel . FILTER(LANG(?borderLabel) = "en")
    }
    ORDER BY ?borderLabel
  `,

  // Get major cities
  cities: (countryQID) => `
    SELECT ?city ?cityLabel ?population ?coord
    WHERE {
      ?city wdt:P17 wd:${countryQID} ;
            rdfs:label ?cityLabel ;
            wdt:P1082 ?population ;
            wdt:P625 ?coord .
      FILTER(LANG(?cityLabel) = "en")
    }
    ORDER BY DESC(?population)
    LIMIT 20
  `
};

// Fetch from Wikidata SPARQL endpoint
export async function queryWikidata(sparqlQuery) {
  try {
    const url = new URL('https://query.wikidata.org/sparql');
    url.searchParams.set('query', sparqlQuery);
    url.searchParams.set('format', 'json');

    const response = await fetch(url.toString(), {
      headers: { 'User-Agent': 'MapGeopolitical/1.0' }
    });

    if (!response.ok) {
      console.error(`Wikidata query failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.results?.bindings || [];
  } catch (err) {
    console.error('Wikidata query error:', err);
    return null;
  }
}

// Get QID (Wikidata ID) from country code
export async function getCountryQID(countryName) {
  try {
    const url = new URL('https://www.wikidata.org/w/api.php');
    url.searchParams.set('action', 'wbsearchentities');
    url.searchParams.set('search', countryName);
    url.searchParams.set('language', 'en');
    url.searchParams.set('format', 'json');

    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.search && data.search.length > 0) {
      return data.search[0].id; // Return first match QID
    }
    return null;
  } catch (err) {
    console.error(`Failed to get QID for ${countryName}:`, err);
    return null;
  }
}

// Format Wikidata result binding
export function formatBinding(binding) {
  const result = {};
  Object.entries(binding).forEach(([key, value]) => {
    if (value.type === 'literal') {
      result[key] = isNaN(value.value) ? value.value : parseFloat(value.value);
    } else if (value.type === 'uri') {
      result[key] = value.value.split('/').pop(); // Get QID
    }
  });
  return result;
}

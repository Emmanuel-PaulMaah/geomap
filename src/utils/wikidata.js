// Wikidata SPARQL queries and utilities for country deep dive

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
  `,

  // Get airports
  airports: (countryQID) => `
    SELECT ?airport ?airportLabel ?type
    WHERE {
      ?airport wdt:P17 wd:${countryQID} ;
               rdfs:label ?airportLabel ;
               wdt:P31 ?type .
      ?type rdfs:label ?typeLabel . FILTER(LANG(?typeLabel) = "en")
      FILTER(LANG(?airportLabel) = "en")
      FILTER(CONTAINS(LCASE(STR(?type)), "airport") || CONTAINS(LCASE(STR(?typeLabel)), "airport"))
    }
    LIMIT 30
  `,

  // Get languages
  languages: (countryQID) => `
    SELECT ?lang ?langLabel ?official
    WHERE {
      wd:${countryQID} wdt:P37 ?lang . ?lang rdfs:label ?langLabel . FILTER(LANG(?langLabel) = "en")
      OPTIONAL { wd:${countryQID} wdt:P37 ?lang . }
    }
    LIMIT 50
  `,

  // Get ethnic groups
  ethnicGroups: (countryQID) => `
    SELECT ?ethGroup ?ethGroupLabel
    WHERE {
      wd:${countryQID} wdt:P172 ?ethGroup . ?ethGroup rdfs:label ?ethGroupLabel . FILTER(LANG(?ethGroupLabel) = "en")
    }
    LIMIT 50
  `,

  // Get religions
  religions: (countryQID) => `
    SELECT ?religion ?religionLabel
    WHERE {
      wd:${countryQID} wdt:P140 ?religion . ?religion rdfs:label ?religionLabel . FILTER(LANG(?religionLabel) = "en")
    }
    LIMIT 30
  `,

  // Get waterways/rivers
  waterways: (countryQID) => `
    SELECT ?waterway ?waterwayLabel ?length
    WHERE {
      ?waterway wdt:P17 wd:${countryQID} ;
                rdfs:label ?waterwayLabel ;
                wdt:P31 ?type .
      ?type rdfs:label ?typeLabel . FILTER(LANG(?typeLabel) = "en")
      OPTIONAL { ?waterway wdt:P2043 ?length }
      FILTER(LANG(?waterwayLabel) = "en")
      FILTER(CONTAINS(LCASE(STR(?typeLabel)), "river") || CONTAINS(LCASE(STR(?typeLabel)), "lake") || CONTAINS(LCASE(STR(?typeLabel)), "waterway"))
    }
    LIMIT 20
  `,

  // Get natural resources
  resources: (countryQID) => `
    SELECT ?resource ?resourceLabel
    WHERE {
      wd:${countryQID} wdt:P2061 ?resource . ?resource rdfs:label ?resourceLabel . FILTER(LANG(?resourceLabel) = "en")
    }
    LIMIT 30
  `,

  // Get climate
  climate: (countryQID) => `
    SELECT ?climate ?climateLabel
    WHERE {
      wd:${countryQID} wdt:P5087 ?climate . ?climate rdfs:label ?climateLabel . FILTER(LANG(?climateLabel) = "en")
    }
    LIMIT 10
  `,

  // Get time zones
   timeZones: (countryQID) => `
     SELECT ?timezone ?timezoneLabel
     WHERE {
       wd:${countryQID} wdt:P421 ?timezone . ?timezone rdfs:label ?timezoneLabel . FILTER(LANG(?timezoneLabel) = "en")
     }
     LIMIT 10
   `,

  // Comprehensive detailed information
   countryDetails: (countryQID) => `
     SELECT ?attribute ?attributeLabel ?value ?valueLabel ?unit ?unitLabel
     WHERE {
       wd:${countryQID} ?prop ?value .
       ?prop rdfs:label ?attributeLabel . FILTER(LANG(?attributeLabel) = "en")
       OPTIONAL { ?value rdfs:label ?valueLabel . FILTER(LANG(?valueLabel) = "en") }
       OPTIONAL { ?value wikibase:quantityUnit ?unit . ?unit rdfs:label ?unitLabel . FILTER(LANG(?unitLabel) = "en") }
       OPTIONAL { ?value schema:description ?desc . FILTER(LANG(?desc) = "en") }
     }
     LIMIT 150
   `,

   // Metric system (SI adoption)
   metricSystem: (countryQID) => `
     SELECT ?system ?systemLabel
     WHERE {
       wd:${countryQID} wdt:P1535 ?system . ?system rdfs:label ?systemLabel . FILTER(LANG(?systemLabel) = "en")
     }
   `,

   // Average height by gender
   averageHeight: (countryQID) => `
     SELECT ?height ?heightLabel ?gender ?genderLabel
     WHERE {
       wd:${countryQID} wdt:P2048 ?height .
       OPTIONAL { ?height rdfs:label ?heightLabel . FILTER(LANG(?heightLabel) = "en") }
       OPTIONAL { wd:${countryQID} wdt:P21 ?gender . ?gender rdfs:label ?genderLabel . FILTER(LANG(?genderLabel) = "en") }
     }
     LIMIT 10
   `,

   // Life expectancy
   lifeExpectancy: (countryQID) => `
     SELECT ?expectancy
     WHERE {
       wd:${countryQID} wdt:P2250 ?expectancy
     }
   `,

   // Literacy rate
   literacyRate: (countryQID) => `
     SELECT ?rate
     WHERE {
       wd:${countryQID} wdt:P1748 ?rate
     }
   `,

   // Gini coefficient (income inequality)
   giniCoefficient: (countryQID) => `
     SELECT ?gini
     WHERE {
       wd:${countryQID} wdt:P1589 ?gini
     }
   `,

   // HDI (Human Development Index)
   hdi: (countryQID) => `
     SELECT ?hdi
     WHERE {
       wd:${countryQID} wdt:P1081 ?hdi
     }
   `,

   // Unemployment rate
   unemploymentRate: (countryQID) => `
     SELECT ?rate
     WHERE {
       wd:${countryQID} wdt:P1198 ?rate
     }
   `,

   // Population density
   populationDensity: (countryQID) => `
     SELECT ?density
     WHERE {
       wd:${countryQID} wdt:P1566 ?density
     }
   `,

   // Borders
   borderCount: (countryQID) => `
     SELECT (COUNT(?border) as ?count)
     WHERE {
       wd:${countryQID} wdt:P47 ?border
     }
   `,

   // Capital coordinates
   capitalCoordinates: (countryQID) => `
     SELECT ?capital ?capitalLabel ?coord
     WHERE {
       wd:${countryQID} wdt:P36 ?capital .
       ?capital rdfs:label ?capitalLabel . FILTER(LANG(?capitalLabel) = "en")
       OPTIONAL { ?capital wdt:P625 ?coord }
     }
   `,

   // Driving side (left vs right)
   drivingSide: (countryQID) => `
     SELECT ?side ?sideLabel
     WHERE {
       wd:${countryQID} wdt:P1622 ?side . ?side rdfs:label ?sideLabel . FILTER(LANG(?sideLabel) = "en")
     }
   `,

   // Electricity rate
   electricityRate: (countryQID) => `
     SELECT ?rate
     WHERE {
       wd:${countryQID} wdt:P1273 ?rate
     }
   `,

   // Internet TLD
   internetTLD: (countryQID) => `
     SELECT ?tld
     WHERE {
       wd:${countryQID} wdt:P78 ?tld
     }
   `,

   // Dialing code
   dialingCode: (countryQID) => `
     SELECT ?code
     WHERE {
       wd:${countryQID} wdt:P474 ?code
     }
   `,

   // Government type
   governmentType: (countryQID) => `
     SELECT ?govt ?govtLabel
     WHERE {
       wd:${countryQID} wdt:P122 ?govt . ?govt rdfs:label ?govtLabel . FILTER(LANG(?govtLabel) = "en")
     }
     LIMIT 5
   `,

   // Founding date/Independence
   founding: (countryQID) => `
     SELECT ?date ?label
     WHERE {
       wd:${countryQID} wdt:P571 ?date
       BIND("Founded" AS ?label)
     }
   `,

   // Dissolution/End date (if applicable)
   dissolution: (countryQID) => `
     SELECT ?date
     WHERE {
       wd:${countryQID} wdt:P576 ?date
     }
   `,

   // Colors (flag)
   flagColors: (countryQID) => `
     SELECT ?color ?colorLabel
     WHERE {
       wd:${countryQID} wdt:P1191 ?color . ?color rdfs:label ?colorLabel . FILTER(LANG(?colorLabel) = "en")
     }
     LIMIT 10
   `,

   // Patron saint
   patronSaint: (countryQID) => `
     SELECT ?saint ?saintLabel
     WHERE {
       wd:${countryQID} wdt:P417 ?saint . ?saint rdfs:label ?saintLabel . FILTER(LANG(?saintLabel) = "en")
     }
   `,

   // National anthem
   nationalAnthem: (countryQID) => `
     SELECT ?anthem ?anthemLabel
     WHERE {
       wd:${countryQID} wdt:P85 ?anthem . ?anthem rdfs:label ?anthemLabel . FILTER(LANG(?anthemLabel) = "en")
     }
   `,

   // National sports
   nationalSports: (countryQID) => `
     SELECT ?sport ?sportLabel
     WHERE {
       wd:${countryQID} wdt:P910 ?sport . ?sport rdfs:label ?sportLabel . FILTER(LANG(?sportLabel) = "en")
     }
     LIMIT 5
   `,

   // Highest point
   highestPoint: (countryQID) => `
     SELECT ?peak ?peakLabel ?elevation
     WHERE {
       wd:${countryQID} wdt:P610 ?peak . ?peak rdfs:label ?peakLabel . FILTER(LANG(?peakLabel) = "en")
       OPTIONAL { ?peak wdt:P2044 ?elevation }
     }
   `,

   // Lowest point
   lowestPoint: (countryQID) => `
     SELECT ?point ?pointLabel ?elevation
     WHERE {
       wd:${countryQID} wdt:P1589 ?point . ?point rdfs:label ?pointLabel . FILTER(LANG(?pointLabel) = "en")
       OPTIONAL { ?point wdt:P2044 ?elevation }
     }
   `,

   // Forest area percentage
   forestPercentage: (countryQID) => `
     SELECT ?percentage
     WHERE {
       wd:${countryQID} wdt:P1584 ?percentage
     }
   `,

   // Agricultural land percentage
   agriculturalLand: (countryQID) => `
     SELECT ?percentage
     WHERE {
       wd:${countryQID} wdt:P1583 ?percentage
     }
   `,

   // CO2 emissions
   co2Emissions: (countryQID) => `
     SELECT ?emissions
     WHERE {
       wd:${countryQID} wdt:P2805 ?emissions
     }
   `,

   // Renewable energy percentage
   renewableEnergy: (countryQID) => `
     SELECT ?percentage
     WHERE {
       wd:${countryQID} wdt:P6662 ?percentage
     }
   `,

   // UNESCO World Heritage Sites
   worldHeritageSites: (countryQID) => `
     SELECT (COUNT(?site) as ?count)
     WHERE {
       ?site wdt:P17 wd:${countryQID} ;
             wdt:P31 ?type .
       ?type wdt:P279* wd:Q9457 .
     }
   `,

   // Nobel prize laureates
   nobelLaureates: (countryQID) => `
     SELECT (COUNT(?person) as ?count)
     WHERE {
       ?person wdt:P31 wd:Q5 ;
               wdt:P166 ?prize ;
               wdt:P19|wdt:P27 wd:${countryQID} .
       ?prize wdt:P31 wd:Q7191 .
     }
   `,

   // Major religions
   majorReligions: (countryQID) => `
     SELECT ?religion ?religionLabel ?percentage
     WHERE {
       wd:${countryQID} wdt:P140 ?religion . ?religion rdfs:label ?religionLabel . FILTER(LANG(?religionLabel) = "en")
       OPTIONAL { wd:${countryQID} p:P140 ?stmt . ?stmt ps:P140 ?religion ; pq:P1545 ?percentage }
     }
     LIMIT 20
   `,

   // Urban population percentage
   urbanPopulation: (countryQID) => `
     SELECT ?percentage
     WHERE {
       wd:${countryQID} wdt:P1587 ?percentage
     }
   `,

   // Infant mortality rate
   infantMortality: (countryQID) => `
     SELECT ?rate
     WHERE {
       wd:${countryQID} wdt:P1192 ?rate
     }
   `,

   // Fertility rate
   fertilityRate: (countryQID) => `
     SELECT ?rate
     WHERE {
       wd:${countryQID} wdt:P1093 ?rate
     }
   `,

   // Beer consumption
   beerConsumption: (countryQID) => `
     SELECT ?consumption
     WHERE {
       wd:${countryQID} wdt:P4379 ?consumption
     }
   `,

   // Wine consumption
   wineConsumption: (countryQID) => `
     SELECT ?consumption
     WHERE {
       wd:${countryQID} wdt:P3869 ?consumption
     }
   `,

   // Rail network length
   railNetwork: (countryQID) => `
     SELECT ?length
     WHERE {
       wd:${countryQID} wdt:P1435 ?length
     }
   `,

   // Road network length
   roadNetwork: (countryQID) => `
     SELECT ?length
     WHERE {
       wd:${countryQID} wdt:P1566 ?length
     }
   `,

   // Major rivers
   majorRivers: (countryQID) => `
     SELECT ?river ?riverLabel
     WHERE {
       ?river wdt:P17 wd:${countryQID} ;
              rdfs:label ?riverLabel ;
              wdt:P31 ?type .
       ?type wdt:P279* wd:Q4022 .
       FILTER(LANG(?riverLabel) = "en")
     }
     LIMIT 10
   `,

   // Major mountains
   majorMountains: (countryQID) => `
     SELECT ?mountain ?mountainLabel
     WHERE {
       ?mountain wdt:P17 wd:${countryQID} ;
                 rdfs:label ?mountainLabel ;
                 wdt:P31 ?type .
       ?type wdt:P279* wd:Q8502 .
       FILTER(LANG(?mountainLabel) = "en")
     }
     LIMIT 10
   `,

   // Largest cities
   largestCities: (countryQID) => `
     SELECT ?city ?cityLabel ?population
     WHERE {
       ?city wdt:P17 wd:${countryQID} ;
             rdfs:label ?cityLabel ;
             wdt:P1082 ?population .
       FILTER(LANG(?cityLabel) = "en")
     }
     ORDER BY DESC(?population)
     LIMIT 10
   `,

   // Official holidays
   holidays: (countryQID) => `
     SELECT ?holiday ?holidayLabel
     WHERE {
       wd:${countryQID} wdt:P3405 ?holiday . ?holiday rdfs:label ?holidayLabel . FILTER(LANG(?holidayLabel) = "en")
     }
     LIMIT 20
   `,

   // Time of year standard
   timeStandard: (countryQID) => `
     SELECT ?timezone ?timezoneLabel
     WHERE {
       wd:${countryQID} wdt:P421 ?timezone . ?timezone rdfs:label ?timezoneLabel . FILTER(LANG(?timezoneLabel) = "en")
     }
     LIMIT 5
   `,

   // Speed limits
   speedLimits: (countryQID) => `
     SELECT ?limit ?limitLabel
     WHERE {
       wd:${countryQID} wdt:P1551 ?limit . ?limit rdfs:label ?limitLabel . FILTER(LANG(?limitLabel) = "en")
     }
   `,

   // Emergency service numbers
   emergencyNumbers: (countryQID) => `
     SELECT ?number
     WHERE {
       wd:${countryQID} wdt:P2852 ?number
     }
   `,

   // Population growth rate
   populationGrowth: (countryQID) => `
     SELECT ?rate
     WHERE {
       wd:${countryQID} wdt:P1098 ?rate
     }
   `,

   // Air quality index
   airQuality: (countryQID) => `
     SELECT ?index
     WHERE {
       wd:${countryQID} wdt:P2072 ?index
     }
   `,

   // Corruption perception index
   corruptionIndex: (countryQID) => `
     SELECT ?index
     WHERE {
       wd:${countryQID} wdt:P2035 ?index
     }
   `,

   // Press freedom index
   pressFreedom: (countryQID) => `
     SELECT ?index
     WHERE {
       wd:${countryQID} wdt:P2936 ?index
     }
   `,

   // Renewable electricity
   renewableElectricity: (countryQID) => `
     SELECT ?percentage
     WHERE {
       wd:${countryQID} wdt:P6661 ?percentage
     }
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

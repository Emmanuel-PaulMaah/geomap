import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { getCountryBio } from '../data/countryBios'
import './CountryBio.css'

function CountryBio({ country }) {
  const [expanded, setExpanded] = useState(false)
  const bio = getCountryBio(country.cca3)

  if (!bio) return null

  return (
    <div className="country-bio-section">
      <button
        className="bio-toggle"
        onClick={() => setExpanded(!expanded)}
        title={expanded ? 'Collapse' : 'Expand'}
      >
        <span className="toggle-icon">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
        <span className="bio-label">About</span>
      </button>
      {expanded && (
        <div className="bio-content">
          <p>{bio}</p>
        </div>
      )}
    </div>
  )
}

export default CountryBio

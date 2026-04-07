import { useState } from 'react'
import { X, ChevronDown, ChevronRight, Link2, Settings, Sword, Globe, Flag, Crown, Zap, Anchor } from 'lucide-react'
import BilateralLegend from './BilateralLegend'
import MilitaryLegend from './MilitaryLegend'
import DisputeLegend from './DisputeLegend'
import ChokePointLegend from './ChokePointLegend'
import EnergyVisualization from './EnergyVisualization'
import './CommandPanel.css'

function CommandPanel({
  searchQuery, setSearchQuery, regionFilter, setRegionFilter, regions, filteredCount,
  showBilateralRelations, setShowBilateralRelations,
  bilateralRelationTypes, setBilateralRelationTypes,
  showResources, setShowResources,
  showMilitary, setShowMilitary,
  showTradeBlocs, setShowTradeBlocs,
  showDisputes, setShowDisputes,
  showRegionalPower, setShowRegionalPower,
  showChokePoints, setShowChokePoints,
  showEnergyIndependence, setShowEnergyIndependence,
  expandedSections, toggleSection, onClose,
  selectedOrganization, onClearOrganizationFilter
}) {
  return (
    <div className="command-panel">
      <div className="panel-header">
        <h1>Commands</h1>
        <div className="header-controls">
          <span className="badge">{filteredCount} countries</span>
          {selectedOrganization && (
            <button
              className="org-filter-badge"
              onClick={onClearOrganizationFilter}
              title={`Click to clear ${selectedOrganization} filter`}
            >
              {selectedOrganization} ✕
            </button>
          )}
          <button
            className="close-btn"
            onClick={onClose}
            title="Close panel"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <label>Region Filter</label>
          <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
            <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
      </div>

      {/* Commands List Section */}
      <div className="collapsible-section">
        <button
          className="section-toggle"
          onClick={() => toggleSection('commands')}
          title={expandedSections.commands ? 'Collapse' : 'Expand'}
        >
          <span className="toggle-icon">
            {expandedSections.commands ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <span className="section-title">Keyboard Shortcuts</span>
        </button>
        {expandedSections.commands && (
          <div className="commands-list">
            <div className="command-item">
              <span className="cmd-key">ESC</span>
              <span className="cmd-desc">Clear selection</span>
            </div>
            <div className="command-item">
              <span className="cmd-key">Enter</span>
              <span className="cmd-desc">Focus map</span>
            </div>
            <div className="command-item">
              <span className="cmd-key">Ctrl+F</span>
              <span className="cmd-desc">Focus search</span>
            </div>
          </div>
        )}
      </div>

      {/* Visualizations Section */}
      <div className="collapsible-section">
        <button
          className="section-toggle"
          onClick={() => toggleSection('visualizations')}
          title={expandedSections.visualizations ? 'Collapse' : 'Expand'}
        >
          <span className="toggle-icon">
            {expandedSections.visualizations ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <span className="section-title">Visualizations</span>
        </button>
        {expandedSections.visualizations && (
          <div className="visualization-section">
            <div className="viz-button-group">
              <button
                className={`viz-btn ${showBilateralRelations ? 'active' : ''}`}
                onClick={() => setShowBilateralRelations(!showBilateralRelations)}
              >
                <span className="viz-icon"><Link2 size={16} /></span>
                Bilateral Relations
              </button>
              {showBilateralRelations && <BilateralLegend bilateralRelationTypes={bilateralRelationTypes} setBilateralRelationTypes={setBilateralRelationTypes} />}
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showResources ? 'active' : ''}`}
                onClick={() => setShowResources(!showResources)}
              >
                <span className="viz-icon"><Settings size={16} /></span>
                Resources & Trade
              </button>
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showMilitary ? 'active' : ''}`}
                onClick={() => setShowMilitary(!showMilitary)}
              >
                <span className="viz-icon"><Sword size={16} /></span>
                Military Power
              </button>
              {showMilitary && <MilitaryLegend />}
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showTradeBlocs ? 'active' : ''}`}
                onClick={() => setShowTradeBlocs(!showTradeBlocs)}
              >
                <span className="viz-icon"><Globe size={16} /></span>
                Trade Blocs
              </button>
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showDisputes ? 'active' : ''}`}
                onClick={() => setShowDisputes(!showDisputes)}
              >
                <span className="viz-icon"><Flag size={16} /></span>
                Territorial Disputes
              </button>
              {showDisputes && <DisputeLegend />}
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showRegionalPower ? 'active' : ''}`}
                onClick={() => setShowRegionalPower(!showRegionalPower)}
              >
                <span className="viz-icon"><Crown size={16} /></span>
                Regional Power
              </button>
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showChokePoints ? 'active' : ''}`}
                onClick={() => setShowChokePoints(!showChokePoints)}
              >
                <span className="viz-icon"><Anchor size={16} /></span>
                Supply Chain Chokepoints
              </button>
              {showChokePoints && <ChokePointLegend />}
            </div>

            <div className="viz-button-group">
              <button
                className={`viz-btn ${showEnergyIndependence ? 'active' : ''}`}
                onClick={() => setShowEnergyIndependence(!showEnergyIndependence)}
              >
                <span className="viz-icon"><Zap size={16} /></span>
                Energy Independence
              </button>
              {showEnergyIndependence && <EnergyVisualization />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommandPanel

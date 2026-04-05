import React from 'react';

const Toolbar = ({ zoom, onZoomChange, onRefresh }) => {
  const zoomLevels = ['Hours', 'Days', 'Months'];

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <b>Zoom: </b>
        {zoomLevels.map(level => (
          <label key={level} className={`radio-label ${zoom === level ? 'active' : ''}`}>
            <input
              type="radio"
              checked={zoom === level}
              onChange={() => onZoomChange(level)}
              value={level}
            />
            {level}
          </label>
        ))}
      </div>
      
      <div className="toolbar-group">
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
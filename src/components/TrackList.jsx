import React from 'react';

export default function TrackList({ tracks, selectedTrack, onTrackSelect }) {
  const runs = tracks.filter(t => t.type === 'run');
  const lifts = tracks.filter(t => t.type === 'lift');

  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(2)} km`;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const formatSpeed = (mps) => {
    return `${(mps * 3.6).toFixed(1)} km/h`;
  };

  return (
    <div className="track-list">
      {runs.length > 0 && (
        <div className="track-section">
          <h3>🏂 Ski Runs ({runs.length})</h3>
          <div className="track-grid">
            {runs.map(track => (
              <div 
                key={track.id}
                className={`track-card ${selectedTrack?.id === track.id ? 'selected' : ''}`}
                onClick={() => onTrackSelect(track)}
              >
                <div className="track-header">
                  <span className="track-name">{track.name}</span>
                  <span className="track-type">Run</span>
                </div>
                {track.statistics && (
                  <div className="track-stats">
                    <div className="stat">
                      <span className="stat-value">{formatDistance(track.statistics.distance)}</span>
                      <span className="stat-label">Distance</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{formatDuration(track.statistics.duration)}</span>
                      <span className="stat-label">Duration</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{formatSpeed(track.statistics.avgSpeed)}</span>
                      <span className="stat-label">Avg Speed</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {lifts.length > 0 && (
        <div className="track-section">
          <h3>🚡 Lifts ({lifts.length})</h3>
          <div className="track-grid">
            {lifts.map(track => (
              <div 
                key={track.id}
                className={`track-card lift ${selectedTrack?.id === track.id ? 'selected' : ''}`}
                onClick={() => onTrackSelect(track)}
              >
                <div className="track-header">
                  <span className="track-name">{track.name}</span>
                  <span className="track-type">Lift</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
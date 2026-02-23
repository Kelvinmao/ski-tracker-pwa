import React from 'react';

export default function TrackStats({ track }) {
  if (!track.statistics) {
    return (
      <div className="no-stats">
        <h3>📊 Statistics</h3>
        <p>No statistics available for {track.type === 'lift' ? 'lifts' : 'this track'}.</p>
      </div>
    );
  }

  const { statistics } = track;

  const formatDistance = (meters) => {
    return `${meters < 1000 ? Math.round(meters) : (meters / 1000).toFixed(2)} ${meters < 1000 ? 'm' : 'km'}`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatSpeed = (mps) => {
    return `${(mps * 3.6).toFixed(1)} km/h`;
  };

  return (
    <div className="track-stats">
      <div className="stats-header">
        <h3>📊 Statistics</h3>
        <p className="track-name">{track.name}</p>
        <span className="track-type">
          {track.type === 'run' ? '🏂 Ski Run' : '🚡 Lift'}
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📏</div>
          <div className="stat-content">
            <div className="stat-value">{formatDistance(statistics.distance)}</div>
            <div className="stat-label">Total Distance</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{formatDuration(statistics.duration)}</div>
            <div className="stat-label">Duration</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{formatSpeed(statistics.avgSpeed)}</div>
            <div className="stat-label">Average Speed</div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <div className="stat-value">{formatSpeed(statistics.maxSpeed)}</div>
            <div className="stat-label">Max Speed</div>
          </div>
        </div>
      </div>

      <div className="stats-details">
        <h4>Details</h4>
        <div className="detail-row">
          <span>Total Distance</span>
          <span>{Math.round(statistics.distance)} meters</span>
        </div>
        <div className="detail-row">
          <span>Total Duration</span>
          <span>{Math.floor(statistics.duration / 60)}:{(statistics.duration % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="detail-row">
          <span>Average Speed</span>
          <span>{statistics.avgSpeed.toFixed(1)} m/s</span>
        </div>
        <div className="detail-row">
          <span>Maximum Speed</span>
          <span>{statistics.maxSpeed.toFixed(1)} m/s</span>
        </div>
        <div className="detail-row">
          <span>Data Points</span>
          <span>{statistics.dataPoints}</span>
        </div>
      </div>
    </div>
  );
}